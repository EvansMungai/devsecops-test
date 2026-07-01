namespace UHB.Extensions.RouteHandlers;

public class RouteHelper
{
    private readonly IEnumerable<IRouteRegistrar> _routeRegistrars;
    public RouteHelper(IEnumerable<IRouteRegistrar> routeRegistrars)
    {
        _routeRegistrars = routeRegistrars;
    }
    public void RegisterRoutes(WebApplication app)
    {
        foreach (var registrar in _routeRegistrars)
        {
            registrar.RegisterRoutes(app);
        }
    }
}
