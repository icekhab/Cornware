using System;
using System.Linq;
using System.Threading.Tasks;
using Cornware.Api.Core;
using Cornware.Api.Model;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Cornware.Api.Database
{
    public class СandidateRepository : BaseRepository, IСandidateService
    {
        public СandidateRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<Guid> Add(string name, string email, string phone, string message, string cvPath, string cvFileName)
        {
            var query = @"insert into public.""Candidate""(name, email, phone, message, cvPath, cvFileName)
                           values(@name, @email, @phone, @message, @cvPath, @cvFileName) RETURNING ""Id"";";

            using (var conn = new NpgsqlConnection(ConnectionString))
            {
                conn.Open();

                return (await conn.QueryAsync<Guid>(query, new
                {
                    name,
                    email,
                    phone,
                    message,
                    cvPath,
                    cvFileName
                })).Single();
            }
        }

        public async Task<CandidateLetterCard> Get(Guid id)
        {
            var query = @"select * from public.""Candidate"" where id = @id";

            using (var conn = new NpgsqlConnection(ConnectionString))
            {
                conn.Open();

                return (await conn.QueryAsync<CandidateLetterCard>(query, new { id })).Single();
            }
        }
    }
}
