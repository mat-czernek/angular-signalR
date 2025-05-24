using TasksApi.Model;

namespace TasksApi.Core;

public interface ITasksStatusService
{
    void AddTask(TaskDto task);
    void RemoveTask(TaskDto task);
    Task ExecuteTask(TaskDto task);
    IReadOnlyCollection<TaskDto> GetTasks();
}