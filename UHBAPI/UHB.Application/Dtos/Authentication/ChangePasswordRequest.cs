using System.ComponentModel.DataAnnotations;

namespace UHB.Application.Dtos.Authentication;

public class ChangePasswordRequest
{
    [Required]
    public string CurrentPassword { get; set; }
    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string NewPassword { get; set; }
    [Required]
    [Compare("NewPassword", ErrorMessage = "Password do not match")]
    public string ConfirmPassword { get; set; }
}
