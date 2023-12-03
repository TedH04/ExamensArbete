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

        public JobRequestService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

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
                CustomerName = userEmail, // set from currently loggedin user (if logged in)
                CompanyName = jobRequestDto.CompanyName,
                JobTitle = jobRequestDto.JobTitle,
                JobDescription = jobRequestDto.JobDescription,
                JobAddress = jobRequestDto.JobAddress,
                JobCity = jobRequestDto.JobCity,
                JobZip = jobRequestDto.JobZip,
                OrgNumber = jobRequestDto.OrgNumber,
                ContactEmail = userEmail, // set from currently loggedin user (if logged in)
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
