using Core.Services.IServices;
using Data.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentServices _departmentServices;

        public DepartmentController(IDepartmentServices departmentServices)
        {
            _departmentServices = departmentServices;
        }

        [HttpGet]
        public JsonResult Index()
        {
            return new JsonResult(_departmentServices.GetAll());
        }

        [Route("GetAllDepartment")]
        public JsonResult GetAllDepartment()
        {
            var response = new List<object>();
            var responseList = _departmentServices.GetAll().ToList().Select(j => j.DepartmentName);
            foreach (var item in responseList)
            {
                var newObj = new
                {
                    DepartmentName = item
                };

                response.Add(newObj);
            }
            return new JsonResult(response);
        }

        [HttpPost]
        public JsonResult Insert(Department model)
        {
            _departmentServices.Insert(model);
            return new JsonResult("Added Successfuly");
        }

        [HttpPut]
        public JsonResult Update(Department model)
        {
            _departmentServices.Update(model);

            return new JsonResult("Update Successfuly");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _departmentServices.Delete(id);
            return new JsonResult("Deleted Successfuly");
        }
    }
}
