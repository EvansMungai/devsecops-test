using UHB.Application.Dtos.Authentication.User;
using UHB.Domain.Entities;
using UHB.Domain.Mappings;

namespace UHB.Extensions.ServiceHandlers.Extensions;

public class SpecialRegisterProfile : MappingProfile<UserDomain, SpecialRegisterRequest>
{
    public SpecialRegisterProfile() : base()
    {
        CreateMap<SpecialRegisterRequest, UserDomain>()
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.UserName));
    }
}
