using TasksApi.Model;

namespace TasksApi.Core;

public interface ITasksStatusService
{
    void AddTask(TaskDto task);
    void RemoveTask(int id);
    Task ExecuteTask(TaskDto task);
    IReadOnlyCollection<TaskDto> GetTasks();
}