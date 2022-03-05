using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.IRepository
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAll();

        Department Insert(Department model);

        Department Update(Department model);

        bool Delete(int id);
    }
}
