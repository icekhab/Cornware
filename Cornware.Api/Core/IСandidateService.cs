using System.Threading.Tasks;

namespace Cornware.Api.Core
{
    public interface IСandidateService
    {
        Task Add(string name, string email, string phone, string message, string cvPath, string cvFileName);
    }
}
