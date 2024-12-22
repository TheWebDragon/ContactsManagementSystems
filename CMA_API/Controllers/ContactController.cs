using CMA_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactDetailService _contactDetailService;

        public ContactController(ContactDetailService contactDetailService)
        {
            _contactDetailService = contactDetailService;
        }

        // GET: api/ContactDetails
        [HttpGet]
        public ActionResult<List<ContactDetails>> GetAllContactDetails()
        {
            return Ok(_contactDetailService.GetAllData());
        }

        // POST: api/ContactDetails
        [HttpPost]
        public IActionResult CreateContactDetails([FromBody] ContactDetails newContactDetails)
        {
            var Response = _contactDetailService.CreateData(newContactDetails);            
            return Ok(new { message = Response });
        }

        // DELETE: api/ContactDetails/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteContactDetails(int id)
        {
            var Response = _contactDetailService.DeleteData(id);
            return Ok(new { message = Response });
        }
    }
}
