using System;
using System.Threading.Tasks;
using Cornware.Api.Core;
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

		public async Task Add(string name, string email, string phone, string message, string cvPath, string cvFileName)
		{
			var query = $@"insert into public.""Candidate""(name, email, phone, message, cvPath, cvFileName)
                           values(@name, @email, @phone, @message, @cvPath, @cvFileName);";

			using (var conn = new NpgsqlConnection(ConnectionString))
			{
				conn.Open();
				try
				{
					await conn.ExecuteAsync(query, new
					{
						name,
						email,
						phone,
						message,
						cvPath,
						cvFileName
					});
				}
				catch(Exception ex)
				{

				}
			}
		}
	}
}
