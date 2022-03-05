using Core.Services.IServices;
using Data.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace EmployeeApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _employeeServices;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeeController(IEmployeeServices employeeServices,
            IWebHostEnvironment webHostEnvironment)
        {
            _employeeServices = employeeServices;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_employeeServices.Get());
        }

        [HttpPost]
        public JsonResult Insert(Employee model)
        {
            _employeeServices.Insert(model);
            return new JsonResult("Added Successfuly");
        }

        [HttpPut]
        public JsonResult Update(Employee model)
        {
            _employeeServices.Update(model);

            return new JsonResult("Update Successfuly");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _employeeServices.Delete(id);
            return new JsonResult("Deleted Successfuly");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception e)
            {
                return new JsonResult("anonymous.jpeg");
                throw e;
            }
        }
    }
}
