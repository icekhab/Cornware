using Cornware.Api.Core;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace Cornware.Api.Common
{
	public class TelegramBot
	{
		private TelegramBotClient bot;
		private readonly ITelegramClientRepository _telegramClientRepository;

		public TelegramBot(ITelegramClientRepository telegramClientRepository)
		{
			_telegramClientRepository = telegramClientRepository;
			bot = new TelegramBotClient("541665787:AAHFS6KwZrheP7frlCS5SGkuq3AFrBBCiuY");
			Task.Run(async () => await Run());
		}

		private async Task Run()
		{
			var offset = 0;

			while (true)
			{
				try
				{
					var updates = await bot.GetUpdatesAsync(offset);

					foreach (var update in updates)
					{
						await ParseCommand(update.Message.Text, update.Message.Chat.Id);
						offset = update.Id + 1;
					}

					Task.Delay(500).Wait();
				}
				catch
				{

				}
			}
		}

		public async Task SendMessage(string message, long clientId)
		{
			await bot.SendTextMessageAsync(clientId, message);
		}

		public async Task SendFile(string fileName, string filePath, long clientId)
		{
			var file = new FileToSend
			{
				Content = System.IO.File.OpenRead(filePath),
				Filename = fileName
			};

			await bot.SendDocumentAsync(clientId, file);
		}

		public async Task ParseCommand(string message, long clientId)
		{
			long chatId = clientId;

			if (message == "/subscribeToCornware")
			{
				if (!await _telegramClientRepository.Exists(chatId))
				{
					await _telegramClientRepository.Add(chatId);
					await bot.SendTextMessageAsync(chatId, "Вы подписались на уведомления");
				}
				else
				{
					await bot.SendTextMessageAsync(chatId, "Вы уже подписаны на уведомления");
				}
			}
			else if (message == "/unsubscribeFromCornware")
			{
				if (await _telegramClientRepository.Exists(chatId))
				{
					await _telegramClientRepository.Delete(chatId);
					await bot.SendTextMessageAsync(chatId, "Вы отписались от уведомлений");
				}
				else
				{
					await bot.SendTextMessageAsync(chatId, "Вы не подписаны на уведомления");
				}
			}
			else
			{
				if (await _telegramClientRepository.Exists(chatId))
				{
					await bot.SendTextMessageAsync(chatId, "Доступные команды:\n/unsubscribeFromCornware");
				}
				else
				{
					await bot.SendTextMessageAsync(chatId, "Доступные команды:\n/subscribeToCornware");
				}
			}
		}
	}
}
