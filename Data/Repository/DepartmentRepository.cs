using Dapper;
using Data.Entity;
using Data.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Data.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly IDbConnection _dbConnection;

        public DepartmentRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public bool Delete(int id)
        {
            var sql = @"delete dbo.department where DepartmentId = @Id";

            var returnValue = _dbConnection.Execute(sql, new { Id = id });

            return (returnValue > 0) ? true : false;
        }

        public IEnumerable<Department> GetAll()
        {
            var sql = @"select * from [dbo].[department]";

            var returnValue = _dbConnection.Query<Department>(sql);

            return returnValue ?? null;
        }

        public Department Insert(Department model)
        {
            var sql = @"insert into dbo.department
                            (DepartmentName) 
                            values 
                            (@departmentName)";
            var parameters = new DynamicParameters();
            parameters.AddDynamicParams(model);
            parameters.Output(model, j => j.DepartmentId);

            _dbConnection.Execute(sql, parameters);

            return model ?? null;
        }

        public Department Update(Department model)
        {
            var sql = @"update dbo.department 
                                    set 
                                    DepartmentName = @DepartmentName 
                                    where 
                                    DepartmentId = @DepartmentId";
            var parameters = new DynamicParameters();
            parameters.AddDynamicParams(model);
            parameters.Output(model, j => j.DepartmentId);
            var rowsAffected = _dbConnection.Execute(sql, parameters);

            return (rowsAffected > 0) ? model : null;
        }
    }
}
