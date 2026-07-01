using AutoMapper;

namespace UHB.Domain.Mappings;

public class MappingProfile<TEntity, TDto> : Profile
{
    public MappingProfile()
    {
        CreateMap<TEntity, TDto>();
        CreateMap<TDto, TEntity>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember is not null));
    }
}
