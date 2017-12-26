using System.Threading.Tasks;
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
        private readonly IClientLetterRepository _clientLetterRepository;
        public ClientLetterController(IClientLetterRepository clientLetterRepository)
        {
            _clientLetterRepository = clientLetterRepository;
        }

        // POST api/values
        [HttpPost]
        [Route("")]
        public async  Task<IActionResult> Post([FromBody]ClientLetterCard clientLetter)
        {
            await _clientLetterRepository.Add(clientLetter.Name, clientLetter.Email, clientLetter.Phone, clientLetter.Message);
            return Ok();
        }
    }
}
