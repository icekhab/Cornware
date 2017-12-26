using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Cornware.Api.Database
{
    public class TransitionRepository : BaseRepository, ITransitionRepository
    {
        public TransitionRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task Add(string url, string ip)
        {
            var query = $@"insert into Transition(ip, url)
                                values('{ip}', '{url}');";

            using (var conn = new NpgsqlConnection(ConnectionString))
            {
                conn.Open();
                await conn.ExecuteAsync(query);
            }
        }
    }
}
