using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IJobRequestService
    {
        Task<JobRequest> CreateJobRequest(JobRequestDto jobRequestDto);
        Task<IEnumerable<JobRequestDto>> GetAllJobRequestsAsync();
        Task<bool> DeleteJobRequest(int jobId);
    }
}
