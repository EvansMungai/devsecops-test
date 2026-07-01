using System.Linq.Expressions;

namespace UHB.Application.Interface;

public interface IRepository<TEntity, TKey> where TEntity : class
{
    Task<List<TReturnDto>> GetAllAsync<TReturnDto>();
    Task<List<TReturnDto>> GetFilteredAsync<TReturnDto>(Expression<Func<TEntity, bool>> predicate);
    Task<TReturnDto?> GetSingleAsync<TReturnDto>(Expression<Func<TEntity, bool>> predicate);
    Task<TReturnDto> CreateAsync<TReturnDto, TCreateDto>(TCreateDto dto);
    Task UpdateAsync<TUpdateDto>(TUpdateDto update, Expression<Func<TEntity, bool>> predicate);
    Task RemoveAsync(Expression<Func<TEntity, bool>> predicate);
}
