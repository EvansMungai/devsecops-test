using AutoMapper;

namespace UHB.Domain.Interfaces;

public interface IMapFrom<TEntity>
{
    void Mapping(Profile profile) => profile.CreateMap(typeof(TEntity), GetType()).ReverseMap();
}
