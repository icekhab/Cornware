using System;
using System.Threading.Tasks;
using Cornware.Api.Model;

namespace Cornware.Api.Core
{
    public interface IClientLetterService
    {
        Task<Guid> Add(string name, string email, string phone, string message);
        Task<ClientLetterCard> Get(Guid id);
    }
}
