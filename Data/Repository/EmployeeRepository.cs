using Dapper;
using Data.Entity;
using Data.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Data.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IDbConnection _dbConnection;

        public EmployeeRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        public IEnumerable<Employee> Get()
        {
            var sql = @"select * from [dbo].[employee]";
            var returnVal = _dbConnection.Query<Employee>(sql);

            return returnVal ?? null;
        }

        public bool Delete(int id)
        {
            var sql = @"delete dbo.employee where EmployeeId = @Id";

            var returnValue = _dbConnection.Execute(sql, new { Id = id });

            return (returnValue > 0) ? true : false;
        }
            
        public Employee Insert(Employee model)
        {
            var sql = @"insert into dbo.employee
                            values 
                            (@EmployeeName,
                             @Department,
                             @DateOfJoining,
                             @PhotoFileName)";
            var parameters = new DynamicParameters();
            parameters.AddDynamicParams(model);
            parameters.Output(model, j => j.EmployeeId);

            _dbConnection.Execute(sql, parameters);

            return model ?? null;
        }

        public Employee Update(Employee model)
        {
            var sql = @"update dbo.employee 
                                    set 
                                    EmployeeName = @EmployeeName,
                                    Department = @Department,
                                    PhotoFileName = @PhotoFileName,
                                    DateOfJoining = @DateOfJoining
                                    where 
                                    EmployeeId = @EmployeeId";
            var parameters = new DynamicParameters();
            parameters.AddDynamicParams(model);
            parameters.Output(model, j => j.EmployeeId);
            var rowsAffected = _dbConnection.Execute(sql, parameters);

            return (rowsAffected > 0) ? model : null;
        }
    }
}
