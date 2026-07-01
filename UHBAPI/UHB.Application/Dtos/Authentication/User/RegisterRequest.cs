namespace UHB.Application.Dtos.Authentication.User;

public class RegisterRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? UserName { get; set; }
    public required string Password { get; set; }
    public string? RegNo { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
}
