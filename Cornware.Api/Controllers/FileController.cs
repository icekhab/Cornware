using System;
using System.IO;
using System.Threading.Tasks;
using Cornware.Api.Database;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Cornware.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class FileController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public FileController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // POST api/file
        [HttpPost]
        [Route("")]
        public IActionResult Post()
        {
            try
            {
                var lol = Request.Form;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
            if (Request.Form.Files.Count == 0 || Request.Form.Files[0].Length <= 0) return BadRequest();

            var file = Request.Form.Files[0];

            var filePath = Path.Combine(Path.Combine(_hostingEnvironment.WebRootPath, "CV"), file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return Ok();
        }
    }
}
