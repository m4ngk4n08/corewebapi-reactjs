using Data.IRepository;
using Core.Services.IServices;
using System;
using System.Collections.Generic;
using System.Text;
using Data.Entity;

namespace Core.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeServices(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public IEnumerable<Employee> Get()
        {
            return _employeeRepository.Get();
        }

        public bool Delete(int id)
        {
            return _employeeRepository.Delete(id);
        }

        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepository.Get();
        }

        public Employee Insert(Employee model)
        {
            return _employeeRepository.Insert(model);
        }

        public Employee Update(Employee model)
        {
            return _employeeRepository.Update(model);
        }
    }
}
