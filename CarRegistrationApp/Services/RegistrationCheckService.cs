using CarRegistrationApp.Data;
using CarRegistrationApp.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace CarRegistrationApp.Services
{
    // Background Service
    public class RegistrationCheckService : BackgroundService
    {
        private readonly IHubContext<RegistrationHub> _hubContext;
        private readonly IServiceScopeFactory _scopeFactory;

        public RegistrationCheckService(IHubContext<RegistrationHub> hubContext, IServiceScopeFactory scopeFactory)
        {
            _hubContext = hubContext;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<CarContext>();
                var cars = context.Cars.ToList();

                foreach (var car in cars)
                {
                    var status = car.RegistrationExpiry < DateTime.Now ? "Expired" : "Valid";
                    await _hubContext.Clients.All.SendAsync("ReceiveRegistrationStatus", car.Id, status, cancellationToken: stoppingToken);
                }

                //await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
                await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken);
            }
        }
    }
}
