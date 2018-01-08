using Cornware.Api.Model;
using System.Threading.Tasks;

namespace Cornware.Api.Core
{
	public interface ITelegramService
	{
		Task SendClientLetter(ClientLetterCard clientLetter);
		Task SendCandiadateLetter(CandidateLetterCard candidateLetter);
	}
}
