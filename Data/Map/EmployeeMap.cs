using Dapper.FluentMap.Mapping;
using Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Map
{
    public class EmployeeMap : EntityMappingBuilder<Employee>
    {
        public EmployeeMap()
        {
            Map(j => j.EmployeeId)
                .ToColumn("EmployeeId");

            Map(j => j.EmployeeName)
                .ToColumn("EmployeeName");

            Map(j => j.DateOfJoining)
                .ToColumn("DateOfJoining");

            Map(j => j.Department)
                .ToColumn("Department");

            Map(j => j.PhotoFileName)
                .ToColumn("PhotoFileName");
        }
    }
}
