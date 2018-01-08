using System.Threading.Tasks;
using Cornware.Api.Core;
using Cornware.Api.Database;
using Cornware.Api.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cornware.Api.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("MyPolicy")]
	public class CandidateLetterController : Controller
	{
		private readonly СandidateRepository _candidateRepository;
		private readonly ITelegramService _telegramService;

		public CandidateLetterController(СandidateRepository candidateRepository, ITelegramService telegramService)
		{
			_candidateRepository = candidateRepository;
			_telegramService = telegramService;
		}

		// POST api/candidateLetter
		[HttpPost]
		[Route("")]
		public async Task<IActionResult> Post(CandidateLetterCard candidateLetter)
		{
			await _candidateRepository.Add(candidateLetter.Name, candidateLetter.Email, candidateLetter.Phone, candidateLetter.Message, candidateLetter.CvPath, candidateLetter.CvFileName);
			await _telegramService.SendCandiadateLetter(candidateLetter);
			return Ok();
		}
	}
}
