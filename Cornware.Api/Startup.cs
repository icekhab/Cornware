using Cornware.Api.Common;
using Cornware.Api.Core;
using Cornware.Api.Database;
using Cornware.Api.Telegram;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cornware.Api
{
	public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

			// services.AddSingleton(new TelegramSettings(Configuration.GetValue<string>("TelegramBotInfo:Url"), Configuration.GetValue<string>("TelegramBotInfo:Name"), Configuration.GetValue<string>("TelegramBotInfo:Key")));

			services.AddScoped<TransitionRepository>();
            services.AddScoped<ClientLetterRepository>(); 
			services.AddScoped< СandidateRepository>();
			services.AddSingleton(new TelegramBot(new TelegramClientRepository(Configuration)));
			services.AddScoped<ITelegramClientRepository, TelegramClientRepository>();

			services.AddScoped<ITelegramService, TelegramService>();

			services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
					.AllowCredentials();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.UseCors(builder => builder.WithOrigins("http://127.0.0.1:5500"));
            app.UseCors("MyPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
