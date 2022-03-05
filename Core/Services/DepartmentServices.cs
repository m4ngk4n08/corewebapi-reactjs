using Core.Services.IServices;
using Data.Entity;
using Data.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Services
{
    public class DepartmentServices : IDepartmentServices
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentServices(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public bool Delete(int id)
        {
            return _departmentRepository.Delete(id);
        }

        public IEnumerable<Department> GetAll()
        {
            return _departmentRepository.GetAll();
        }

        public Department Insert(Department model)
        {
            return _departmentRepository.Insert(model);
        }

        public Department Update(Department model)
        {
            return _departmentRepository.Update(model);
        }
    }
}
