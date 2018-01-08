using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cornware.Api.Core
{
    public interface ITelegramClientRepository
	{
		Task<bool> Exists(long clientId);
		Task Add(long clientId);
		Task Delete(long clientId);
		Task<List<long>> Get();
	}
}
