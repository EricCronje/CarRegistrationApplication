using CarRegistrationApp.Data;
using CarRegistrationApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarRegistrationApp.Controllers
{
    // Controllers
    [ApiController]
    [Route("api/cars")]
    public class CarController : ControllerBase
    {
        private readonly CarContext _context;

        public CarController(CarContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Car> GetCars([FromQuery] string make = "All")
        {
            if (make == "All")
                return string.IsNullOrEmpty(make) ? _context.Cars : _context.Cars;
            else
                return string.IsNullOrEmpty(make) ? _context.Cars : _context.Cars.Where(car => car.Make == make);
        }
    }
}
