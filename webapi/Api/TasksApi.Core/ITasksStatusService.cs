using TasksApi.Model;

namespace TasksApi.Core;

public interface ITasksStatusService
{
    Task AddTask(TaskDto task);
    Task RemoveTask(int id);
    Task UpdateTask(TaskDto task);
    Task ExecuteTask(TaskDto task);
    IReadOnlyCollection<TaskDto> GetTasks();
}