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
    public class ClientLetterController : Controller
    {
        private readonly ClientLetterRepository _clientLetterRepository;
		private readonly ITelegramService _telegramService;


		public ClientLetterController(ClientLetterRepository clientLetterRepository, ITelegramService telegramService)
        {
            _clientLetterRepository = clientLetterRepository;
			_telegramService = telegramService;
		}

		// POST api/clientLetter
		[HttpPost]
        [Route("")]
        public async  Task<IActionResult> Post(ClientLetterCard clientLetter)
        {
            await _clientLetterRepository.Add(clientLetter.Name, clientLetter.Email, clientLetter.Phone, clientLetter.Message);
			await _telegramService.SendClientLetter(clientLetter);
			return Ok();
        }
    }
}
