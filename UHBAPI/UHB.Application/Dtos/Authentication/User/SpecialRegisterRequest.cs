namespace UHB.Application.Dtos.Authentication.User;

public class SpecialRegisterRequest
{
    public RegisterRequest User { get; set; }
    public string? Role { get; set; }
}
