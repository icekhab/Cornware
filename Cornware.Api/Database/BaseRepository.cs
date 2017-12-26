using Microsoft.Extensions.Configuration;

namespace Cornware.Api.Database
{
    public class BaseRepository
    {
        protected string ConnectionString;

        public BaseRepository(IConfiguration configuration)
        {
            ConnectionString = configuration.GetValue<string>("DBInfo:ConnectionString");
        }
    }
}