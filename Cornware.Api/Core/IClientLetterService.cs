using System.Threading.Tasks;

namespace Cornware.Api.Core
{
    public interface IClientLetterService
    {
        Task Add(string name, string email, string phone, string message);
    }
}
