using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Services;

public interface IAuthenticationService
{
    Task<string> Register(RegisterRequest request);
    Task<string> Login(LoginRequest request);
    Task<JobRequest> CreateJobRequest(JobRequestDto jobRequestDto);
}

