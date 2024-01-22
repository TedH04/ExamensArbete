using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    //private readonly UserManager<IdentityUser> _userManager;

    public UserController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;

    }

    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authenticationService.Login(request);

        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var response = await _authenticationService.Register(request);

        return Ok(response);
    }
    [HttpGet("GetAllUsers")]
    //[Authorize(Roles = "Admin,Employee")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _authenticationService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpPost("AssignRole")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> AssignRole(string userId, string roleName)
    {
        var result = await _authenticationService.AssignRoleToUser(userId, roleName);

        if (!result)
        {
            return BadRequest("Failed to assign role");
        }

        return Ok("Role assigned successfully");
    }

}

