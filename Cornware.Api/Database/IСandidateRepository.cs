using System.Threading.Tasks;

namespace Cornware.Api.Database
{
    public interface IСandidateRepository
    {
        Task Add(string name, string email, string phone, string message, string cvPath, string cvFileName);
    }
}
