using Dapper.FluentMap.Mapping;
using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Map
{
    public class DepartmentMap : EntityMappingBuilder<Employee>
    {
        public DepartmentMap()
        {

        }
    }
}
