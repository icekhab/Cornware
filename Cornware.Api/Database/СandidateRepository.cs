using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Cornware.Api.Database
{
    public class СandidateRepository : BaseRepository, IСandidateRepository
    {
        public СandidateRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task Add(string name, string email, string phone, string message, string cvPath)
        {
            var query = $@"insert into Сandidate(name, email, phone, message, cvPath)
                                values('{name}', '{email}', '{phone}', '{message}', '{cvPath}');";

            using (var conn = new NpgsqlConnection(ConnectionString))
            {
                conn.Open();
                await conn.ExecuteAsync(query);
            }
        }
    }
}
