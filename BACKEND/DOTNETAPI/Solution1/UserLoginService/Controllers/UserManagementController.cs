using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserLoginService.Models;

namespace UserLoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {

        private readonly ProjectdbContext _context;

        public UserManagementController(ProjectdbContext context)
        {
            _context = context;
        }

        [HttpGet("getAllUsers")]

        public List<User> GetUsers()
        {
            List<User> list = new List<User>();
            using (var db = new ProjectdbContext())
            {
                //list = db.Users.Include(o=>o.UserId).Include(o=>o.Rid).ToList();
                list = db.Users.ToList();
            }
            return list;
        }
        [HttpGet]
        public List<User> GetUsersWithBookings()
        {
            List<User> list = new List<User>();
            using (var db = new ProjectdbContext())
            {
                //list = db.Users.Include(o=>o.UserId).Include(o=>o.Rid).ToList();
                list = db.Users.Include(add => add.Bookings).ToList();
            }
            return list;
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            using (var db = new ProjectdbContext())
            {

                var user = db.Users
               .Include(u => u.Bookings)
               .Include(u => u.Events)
               .Include(u => u.Feedbacks)
               .Include(u => u.Payments)
               .Include(u => u.RidNavigation)
               .SingleOrDefault(u => u.UserId == id);
                user = db.Users.Find(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
        }








        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            bool usernameExists = await _context.Users.AnyAsync(u => u.UserName == user.UserName);
            bool emailExists = await _context.Users.AnyAsync(u => u.Email == user.Email);
            bool phoneNumberExists = await _context.Users.AnyAsync(u => u.MobileNo == user.MobileNo);
            bool aadharNoExists = await _context.Users.AnyAsync(u => u.AadharNo == user.AadharNo);

            if (usernameExists)
            {
                return Conflict("Username already exists.");
            }

            if (emailExists)
            {
                return Conflict("Email already exists.");
            }

            if (phoneNumberExists)
            {
                return Conflict("Phone number already exists.");
            }

            if (aadharNoExists)
            {
                return Conflict("Aadhar number already exists.");
            }

            // Hash the password before storing
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Set the status based on the role ID
            user.Status = user.Rid == 2 ? "PENDING" : "APPROVED";

            // Add user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }





        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Username) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginRequest.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid login,Please enter valid credentials.");
            }

            // Check if the user's status is "PENDING"
            if (user.Rid == 2 && user.Status != "APPROVED")
            {
                return Unauthorized("Admin approval is pending.");
            }

            var userRole = user.Rid;

            return Ok(new
            {
                message = "Login successful.",
                user,
                role = userRole
            });
        }
    }




}