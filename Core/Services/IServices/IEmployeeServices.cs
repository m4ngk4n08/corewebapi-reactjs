using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Services.IServices
{
    public interface IEmployeeServices
    {
        IEnumerable<Employee> Get();
        Employee Insert(Employee model);

        Employee Update(Employee model);

        bool Delete(int id);
    }
}
