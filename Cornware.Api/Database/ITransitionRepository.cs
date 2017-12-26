using System.Threading.Tasks;

namespace Cornware.Api.Database
{
    public interface ITransitionRepository
    {
        Task Add(string url, string ip);
    }
}
