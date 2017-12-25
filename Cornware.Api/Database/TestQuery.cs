using System.Collections.Generic;
using System.Linq;
using Cornware.Api.Model;
using Dapper;
using Npgsql;

namespace Cornware.Api.Database
{
    public class TestQuery
    {
        private string connectionString = @"User ID=postgres;Password=12345678;Host=localhost;Port=5432;Database=Cornware;Pooling=true;";
        public IList<Transition> GetUsers()
        {
            List<Transition> list;
            using (var conn = new NpgsqlConnection(connectionString))
            {

                conn.Open();
                var querySQL = @"SELECT * FROM public.transition;";
                list = conn.Query<Transition>(querySQL).ToList();
            }
            return list;
        }
    }
}
