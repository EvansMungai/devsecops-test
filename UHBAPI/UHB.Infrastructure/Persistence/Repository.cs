using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using UHB.Application.Interface;
using UHB.Domain.Interfaces;

namespace UHB.Infrastructure.Persistence;

public class Repository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : class, IBaseEntity
{
    private readonly UhbContext _context;
    private readonly IMapper _mapper;

    public Repository(UhbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TReturnDto> CreateAsync<TReturnDto, TCreateDto>(TCreateDto dto)
    {
        TEntity entity = _mapper.Map<TEntity>(dto);
        await _context.Set<TEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<TReturnDto>(entity);
    }

    public async Task<List<TReturnDto>> GetAllAsync<TReturnDto>()
    {
        return await _context.Set<TEntity>().AsNoTracking()
            .ProjectTo<TReturnDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<List<TReturnDto>> GetFilteredAsync<TReturnDto>(Expression<Func<TEntity, bool>> predicate)
    {
        return await _context.Set<TEntity>().AsNoTracking()
            .Where(predicate).ProjectTo<TReturnDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<TReturnDto?> GetSingleAsync<TReturnDto>(Expression<Func<TEntity, bool>> predicate)
    {
        return await _context.Set<TEntity>().AsNoTracking()
            .Where(predicate).ProjectTo<TReturnDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task RemoveAsync(Expression<Func<TEntity, bool>> predicate)
    {
        TEntity? entity = await _context.Set<TEntity>().Where(predicate).SingleOrDefaultAsync();
        if (entity is null)
            throw new ArgumentException("Entity not found");

        _context.Set<TEntity>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync<TUpdateDto>(TUpdateDto update, Expression<Func<TEntity, bool>> predicate)
    {
        TEntity? entity = await _context.Set<TEntity>().Where(predicate).SingleOrDefaultAsync();
        if (entity is null)
            throw new ArgumentException("Entity not found");

        _mapper.Map(update, entity);
        await _context.SaveChangesAsync();
    }
}
