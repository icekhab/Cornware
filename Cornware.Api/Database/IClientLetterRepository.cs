using System.Threading.Tasks;

namespace Cornware.Api.Database
{
    public interface IClientLetterRepository
    {
        Task Add(string name, string email, string phone, string message);
    }
}
