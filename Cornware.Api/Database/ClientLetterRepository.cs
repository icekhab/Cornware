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
	public class ClientLetterRepository : BaseRepository, IClientLetterService
	{
		public ClientLetterRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<Guid> Add(string name, string email, string phone, string message)
		{
			var query = @"insert into public.""ClientLetter""(name, email, phone, message)
                                values(@name, @email, @phone, @message) RETURNING id;";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();


                return (await conn.QueryAsync<Guid>(query, new
				{
					name,
					email,
					phone,
					message
				})).Single();
			}
		}

        public async Task<ClientLetterCard> Get(Guid id)
        {
            var query = @"select * from public.""ClientLetter"" where id = @id";

            using (var conn = new NpgsqlConnection(ConnectionString))
            {
                conn.Open();

                return (await conn.QueryAsync<ClientLetterCard>(query, new { id })).Single();
            }
        }
    }
}
