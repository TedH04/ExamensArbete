using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Services
{
    public class JobRequestService : IJobRequestService
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public JobRequestService(AppDbContext context, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<JobRequest> CreateJobRequest(JobRequestDto jobRequestDto)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext?.User.Identity.IsAuthenticated != true)
            {
                throw new UnauthorizedAccessException("User must be logged in to create a job request.");
            }



            //var userName = httpContext.User.FindFirst(ClaimTypes.Name)?.Value;
            //if (string.IsNullOrWhiteSpace(userName))
            //{
            //    throw new InvalidOperationException("Users email not found.");
            //}
            var userEmail = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            var customerPhoneNumber = user.PhoneNumber;
            var userName = user.UserName;
            if (string.IsNullOrWhiteSpace(customerPhoneNumber) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(userEmail))
            {
                throw new InvalidOperationException("User's cred not found in the token.");
            }

            var jobRequest = new JobRequest
            {
                Id = jobRequestDto.Id,
                CustomerName = userName, // set name from currently loggedin user (if logged in)
                CompanyName = jobRequestDto.CompanyName,
                JobTitle = jobRequestDto.JobTitle,
                JobDescription = jobRequestDto.JobDescription,
                JobAddress = jobRequestDto.JobAddress,
                JobCity = jobRequestDto.JobCity,
                JobZip = jobRequestDto.JobZip,
                CustomerPhoneNumber = customerPhoneNumber, // set from currently loggedin user (if logged in)
                OrgNumber = jobRequestDto.OrgNumber,
                ContactEmail = userEmail, // set email from currently loggedin user (if logged in)
                IsCompany = jobRequestDto.IsCompany
            };

            _context.jobRequests.Add(jobRequest);
            await _context.SaveChangesAsync();

            return jobRequest;
        }
        public async Task<IEnumerable<JobRequestDto>> GetAllJobRequestsAsync()
        {
            var jobRequests = await _context.jobRequests.ToListAsync();

            return jobRequests.Select(jr => new JobRequestDto
            {
                Id = jr.Id,
                CustomerName = jr.CustomerName,
                CompanyName = jr.CompanyName,
                JobTitle = jr.JobTitle,
                JobDescription = jr.JobDescription,
                CustomerPhoneNumber = jr.CustomerPhoneNumber,
                JobAddress = jr.JobAddress,
                JobCity = jr.JobCity,
                JobZip = jr.JobZip,
                OrgNumber = jr.OrgNumber,
                ContactEmail = jr.ContactEmail,
                IsCompany = jr.IsCompany
            }).ToList();
        }
        public async Task<bool> DeleteJobRequest(int jobId)
        {
            var jobRequest = await _context.jobRequests.FindAsync(jobId);
            if (jobRequest == null)
            {
                return false;
            }

            _context.jobRequests.Remove(jobRequest);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
