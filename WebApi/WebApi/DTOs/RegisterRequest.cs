using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos;

public class RegisterRequest
{
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    public string? PhoneNumber { get; set; }
}
