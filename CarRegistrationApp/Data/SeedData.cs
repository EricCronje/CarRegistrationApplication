using CarRegistrationApp.Models;

namespace CarRegistrationApp.Data
{
    public static class SeedData
    {
        public static void Initialize(CarContext context)
        {
            if (!context.Cars.Any())
            {
                context.Cars.AddRange(new List<Car>
            {
                new Car { Make = "Toyota", Model = "Camry", RegistrationExpiry = DateTime.Now.AddMonths(6) },
                new Car { Make = "Ford", Model = "Mustang", RegistrationExpiry = DateTime.Now.AddMonths(-2) },
                new Car { Make = "Tesla", Model = "Model S", RegistrationExpiry = DateTime.Now.AddYears(1) }
            });
                context.SaveChanges();
            }
        }
    }
}
