using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cornware.Api.Database;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cornware.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class TransitionController : Controller
    {
        private ITransitionRepository _transitionRepository;
        public TransitionController(ITransitionRepository transitionRepository)
        {
            _transitionRepository = transitionRepository;
        }

        // POST api/values
        [HttpPost]
        [Route("")]
        public async  Task<IActionResult> Post(string transitionUrl)
        {
            await _transitionRepository.Add(transitionUrl, HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString());
            return Ok();
        }
    }
}
