using Cornware.Api.Common;
using Cornware.Api.Core;
using Cornware.Api.Model;
using System.Threading.Tasks;

namespace Cornware.Api.Telegram
{
	public class TelegramService : ITelegramService
	{
		private readonly TelegramBot _bot;
		private readonly ITelegramClientRepository _telegramClientRepository;

		public TelegramService(TelegramBot bot, ITelegramClientRepository telegramClientRepository)
		{
			_bot = bot;
			_telegramClientRepository = telegramClientRepository;
		}

		public async Task SendCandiadateLetter(CandidateLetterCard candidateLetter)
		{
			var message = $"Candiadate claim\nName: {candidateLetter.Name}\nEmail: {candidateLetter.Email}\nPhone: {candidateLetter.Phone}\nMessage: {candidateLetter.Message}";
			var clients = await _telegramClientRepository.Get();
			foreach (var client in clients)
			{
				await _bot.SendMessage(message, client);
				await _bot.SendFile(candidateLetter.CvFileName, candidateLetter.CvPath, client);
			}
		}

		public async Task SendClientLetter(ClientLetterCard clientLetter)
		{
			var message = $"Client claim\nName: {clientLetter.Name}\nEmail: {clientLetter.Email}\nPhone: {clientLetter.Phone}\nMessage: {clientLetter.Message}";
			var clients = await _telegramClientRepository.Get();
			foreach (var client in clients)
			{
				await _bot.SendMessage(message, client);
			}
		}
	}
}
