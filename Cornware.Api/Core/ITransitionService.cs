using System.Threading.Tasks;

namespace Cornware.Api.Core
{
    public interface ITransitionService
    {
        Task Add(string url, string ip);
    }
}
