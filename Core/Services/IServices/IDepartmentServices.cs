using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Services.IServices
{
    public interface IDepartmentServices
    {
        IEnumerable<Department> GetAll();

        Department Insert(Department model);

        Department Update(Department model);

        bool Delete(int id);
    }
}
