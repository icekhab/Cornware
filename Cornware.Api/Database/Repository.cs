using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

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