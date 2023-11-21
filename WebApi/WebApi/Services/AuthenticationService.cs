using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthenticationService(AppDbContext context, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }
    #region Login/Register

    public async Task<string> Register(RegisterRequest request)
    {
        var existingUser = await _context.Users
            .AnyAsync(u => u.Email == request.Email || u.UserName == request.Username);

        if (existingUser)
        {
            throw new ArgumentException($"User with email {request.Email} or username {request.Username} already exists.");
        }

        User user = new User
        {
            Email = request.Email,
            UserName = request.Username,
            PhoneNumber = request.PhoneNumber,
            // Assuming PasswordHash is the field to store hashed passwords
            PasswordHash = HashPassword(request.Password)
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return await Login(new LoginRequest { Username = request.Email, Password = request.Password });
    }

    public async Task<string> Login(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == request.Username || u.Email == request.Username);

        if (user is null || !VerifyPasswordHash(request.Password, user.PasswordHash))
        {
            throw new ArgumentException($"Unable to authenticate user {request.Username}");
        }

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = GetToken(authClaims);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return token;
    }

    private string HashPassword(string password)
    {
        if (password == null) throw new ArgumentNullException(nameof(password));

        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] salt = new byte[16];
            rng.GetBytes(salt);

            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
            {
                byte[] hash = pbkdf2.GetBytes(20);

                byte[] hashBytes = new byte[36];
                Array.Copy(salt, 0, hashBytes, 0, 16);
                Array.Copy(hash, 0, hashBytes, 16, 20);

                string savedPasswordHash = Convert.ToBase64String(hashBytes);
                return savedPasswordHash;
            }
        }
    }


    private bool VerifyPasswordHash(string password, string storedHash)
    {
        if (password == null) throw new ArgumentNullException(nameof(password));
        if (storedHash == null) throw new ArgumentNullException(nameof(storedHash));

        byte[] hashBytes = Convert.FromBase64String(storedHash);
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
        {
            byte[] hash = pbkdf2.GetBytes(20);

            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }
            }
        }

        return true;
    }
    #endregion

    public async Task<JobRequest> CreateJobRequest(JobRequestDto jobRequestDto)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext?.User.Identity.IsAuthenticated != true)
        {
            throw new UnauthorizedAccessException("User must be logged in to create a job request.");
        }

        var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
        if (string.IsNullOrWhiteSpace(userEmail))
        {
            throw new InvalidOperationException("User's email not found in the token.");
        }

        var jobRequest = new JobRequest
        {
            Id = jobRequestDto.Id,
            CustomerName = userEmail, // set from currently loggedin user
            JobTitle = jobRequestDto.JobTitle,
            JobDescription = jobRequestDto.JobDescription,
            JobAddress = jobRequestDto.JobAddress,
            JobCity = jobRequestDto.JobCity,
            JobZip = jobRequestDto.JobZip,
            ContactEmail = userEmail, // set from currently loggedin user
            IsCompany = jobRequestDto.IsCompany
        };

        _context.jobRequests.Add(jobRequest);
        await _context.SaveChangesAsync();

        return jobRequest;
    }

}

