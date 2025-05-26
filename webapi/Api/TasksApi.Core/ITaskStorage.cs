using TasksApi.Model;

namespace TasksApi.Core;

public interface ITaskStorage
{
    void Add(TaskDto task);
    void Delete(int id);
    void Update(TaskDto task);
    IReadOnlyCollection<TaskDto> GetAll();
    bool TryGetById(int id, out TaskDto? task);
}