using UHB.Extensions;



var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();
DotNetEnv.Env.Load();

builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

app.ConfigureMiddleware();


app.Run();
