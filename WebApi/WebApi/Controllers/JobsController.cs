using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobRequestService _jobRequestService;

        public JobsController(IJobRequestService authenticationService)
        {
            _jobRequestService = authenticationService;
        }

        [HttpPost("CreateJobRequest")]
        public async Task<IActionResult> CreateJobRequest(JobRequestDto jobRequestDto)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User must be logged in to create a job request.");
            }

            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrWhiteSpace(userEmail))
            {
                return BadRequest("User's email not found.");
            }

            var jobRequest = await _jobRequestService.CreateJobRequest(jobRequestDto);
            return Ok(jobRequest);
        }

        [HttpGet("GetAllJobRequests")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> GetAllJobRequests()
        {
            var jobRequests = await _jobRequestService.GetAllJobRequestsAsync();
            return Ok(jobRequests);
        }

        [HttpDelete("DeleteJobRequest/{jobId}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> DeleteJobRequest(int jobId)
        {
            var result = await _jobRequestService.DeleteJobRequest(jobId);

            if (!result)
            {
                return NotFound($"Job request with ID {jobId} not found.");
            }

            return Ok($"Job request with ID {jobId} deleted successfully.");
        }
    }
}
