FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# Build Image
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["UHB/UHB.csproj", "UHB/"]
COPY ["UHB.Application/UHB.Application.csproj", "UHB.Application/"]
COPY ["UHB.Domain/UHB.Domain.csproj", "UHB.Domain/"]
COPY ["UHB.Infrastructure/UHB.Infrastructure.csproj", "UHB.Infrastructure/"]

RUN dotnet restore "UHB/UHB.csproj"

COPY UHB/ ./UHB/
COPY UHB.Application/ ./UHB.Application/
COPY UHB.Domain/ ./UHB.Domain/
COPY UHB.Infrastructure/ ./UHB.Infrastructure/


WORKDIR "/src/UHB"
RUN dotnet build "UHB.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "UHB.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
USER app
ENTRYPOINT ["dotnet", "UHB.dll"]