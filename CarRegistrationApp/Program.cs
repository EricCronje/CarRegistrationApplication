using Microsoft.EntityFrameworkCore;
using CarRegistrationApp.Data;
using CarRegistrationApp.Services;
using CarRegistrationApp.Hubs;
using CarRegistrationApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<CarContext>(options => options.UseInMemoryDatabase("CarDB"));
builder.Services.AddSignalR();
builder.Services.AddHostedService<RegistrationCheckService>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CarContext>();
    SeedData.Initialize(context);
}

// Configure endpoints
app.UseRouting();
app.UseCors();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<RegistrationHub>("/registrationHub");
});

app.Run();
