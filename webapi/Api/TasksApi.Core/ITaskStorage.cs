using TasksApi.Model;

namespace TasksApi.Core;

public interface ITaskStorage
{
    TaskDto Add(TaskDto task);
    void Delete(int id);
    TaskDto Update(TaskDto task);
    IReadOnlyCollection<TaskDto> GetAll();
    bool TryGetById(int id, out TaskDto? task);
}