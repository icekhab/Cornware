using System.Collections.Generic;
using System.Threading.Tasks;
using Cornware.Api.Core;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Cornware.Api.Database
{
	public class TelegramClientRepository : BaseRepository, ITelegramClientRepository
	{
		public TelegramClientRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<bool> Exists(long clientId)
		{
			var query = $@"Select * from public.""TelegramClient"" where id = @clientId;";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();

				return await conn.QuerySingleOrDefaultAsync(query, new
				{
					clientId
				}) != null;

			}
		}

		public async Task Add(long clientId)
		{
			var query = $@"insert into public.""TelegramClient""(id)
                                values(@clientId);";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();

				await conn.ExecuteAsync(query, new
				{
					clientId
				});
			}
		}

		public async Task Delete(long clientId)
		{
			var query = $@"delete from public.""TelegramClient"" where id = @clientId;";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();

				await conn.ExecuteAsync(query, new
				{
					clientId
				});
			}
		}

		public async Task<List<long>> Get()
		{
			var query = $@"select id from public.""TelegramClient"";";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();

				return (await conn.QueryAsync<long>(query)).AsList();
			}
		}
	}
}
