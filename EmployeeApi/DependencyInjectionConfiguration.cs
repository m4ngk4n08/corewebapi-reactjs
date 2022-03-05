using Autofac;
using Data.IRepository;
using Core.Services;
using Core.Services.IServices;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Data.Repository;

namespace EmployeeApi
{
    public class DependencyInjectionConfiguration : Module
    {
        private readonly IConfiguration _configuration;

        public DependencyInjectionConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<EmployeeServices>().As<IEmployeeServices>();
            builder.RegisterType<EmployeeRepository>().As<IEmployeeRepository>();

            builder.RegisterType<DepartmentServices>().As<IDepartmentServices>();
            builder.RegisterType<DepartmentRepository>().As<IDepartmentRepository>();

            var connectionString = _configuration.GetSection("ConnectionString:APIConnection").Value;
            builder.Register<IDbConnection>(ctx => new SqlConnection(connectionString));
        }
    }
}
