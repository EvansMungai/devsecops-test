using AutoMapper;
using System.Reflection;
using UHB.Application.Dtos.Application;
using UHB.Application.Dtos.Authentication.User;
using UHB.Application.Dtos.Hostel;
using UHB.Application.Dtos.Room;
using UHB.Application.Dtos.Student;
using UHB.Domain.Entities;
using UHB.Domain.Mappings;
using UHB.Extensions.ServiceHandlers.Extensions;

namespace UHB.Extensions.ServiceHandlers;

public static class MappingServiceRegistration
{
    public static void ConfigureMappingProfiles(this IServiceCollection services, params Assembly[] assemblies)
    {
        if (assemblies is null || assemblies.Length == 0)
            assemblies = new[] { Assembly.GetCallingAssembly() };

        services.AddSingleton<IMapper>(sp =>
        {
            ILoggerFactory loggerFactory = sp.GetRequiredService<ILoggerFactory>();

            MapperConfigurationExpression configExpr = new MapperConfigurationExpression();

            var profileTypes = assemblies
                .SelectMany(a => a.GetTypes())
                .Where(t => typeof(Profile).IsAssignableFrom(t) && !t.IsAbstract && t.IsClass)
                .ToList();

            foreach (var profileType in profileTypes)
            {
                Profile? profileInstance = (Profile)Activator.CreateInstance(profileType)!;
                configExpr.AddProfile(profileInstance);
            }

            #region Applications
            configExpr.AddProfile(new MappingProfile<ApplicationDomain, ApplicationDto>());
            configExpr.AddProfile(new MappingProfile<ApplicationCreateDto, ApplicationDomain>());
            configExpr.AddProfile(new MappingProfile<ApplicationUpdateRoomDto, ApplicationDomain>());
            configExpr.AddProfile(new MappingProfile<ApplicationUpdateStatusDto, ApplicationDomain>());
            #endregion

            #region Hostel
            configExpr.AddProfile(new MappingProfile<HostelDomain, HostelDto>());
            configExpr.AddProfile(new MappingProfile<HostelCreateDto, HostelDomain>());
            #endregion

            #region Room
            configExpr.AddProfile(new MappingProfile<RoomDomain, RoomDto>());
            configExpr.AddProfile(new MappingProfile<RoomCreateDto, RoomDomain>());
            #endregion

            #region Hostel
            configExpr.AddProfile(new MappingProfile<StudentDomain, StudentDto>());
            configExpr.AddProfile(new MappingProfile<StudentCreateDto, StudentDomain>());
            #endregion

            #region Authentication
            configExpr.AddProfile(new MappingProfile<LoginRequest, UserDomain>());
            configExpr.AddProfile(new RegisterProfile());
            configExpr.AddProfile(new SpecialRegisterProfile());
            #endregion

            MapperConfiguration config = new MapperConfiguration(configExpr, loggerFactory);
            return config.CreateMapper();
        });
    }
}
