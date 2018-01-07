using System.Net;
using System.Threading.Tasks;
using Cornware.Api.Database;
using Cornware.Api.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Cornware.Api.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("MyPolicy")]
	public class CandidateLetterController : Controller
	{
		private readonly IСandidateRepository _candidateRepository;
		public CandidateLetterController(IСandidateRepository candidateRepository)
		{
			_candidateRepository = candidateRepository;
		}

		// POST api/candidateLetter
		[HttpPost]
		[Route("")]
		public async Task<IActionResult> Post(CandidateLetterCard candidateLetter)
		{
			await _candidateRepository.Add(candidateLetter.Name, candidateLetter.Email, candidateLetter.Phone, candidateLetter.Message, candidateLetter.CvPath, candidateLetter.CvFileName);
			return Ok();
		}
	}
}
