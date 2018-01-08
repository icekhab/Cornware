using System.Threading.Tasks;
using Cornware.Api.Core;
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

		public async Task Add(string name, string email, string phone, string message)
		{
			var query = $@"insert into public.""ClientLetter""(name, email, phone, message)
                                values(@name, @email, @phone, @message);";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();

				await conn.ExecuteAsync(query, new
				{
					name,
					email,
					phone,
					message
				});
			}
		}
	}
}
