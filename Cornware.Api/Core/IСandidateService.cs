using System;
using System.Threading.Tasks;
using Cornware.Api.Model;

namespace Cornware.Api.Core
{
    public interface IСandidateService
    {
        Task<Guid> Add(string name, string email, string phone, string message, string cvPath, string cvFileName);
        Task<CandidateLetterCard> Get(Guid id);
    }
}
