using Microsoft.AspNetCore.SignalR;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksStatusService : ITasksStatusService
{
    private readonly ITaskStorage _taskStorage;
    private readonly IHubContext<TasksHub, ITasksStatusClient> _tasksStatusHubContext;

    public TasksStatusService(ITaskStorage taskStorage, IHubContext<TasksHub, ITasksStatusClient> tasksStatusHubContext)
    {
        _taskStorage = taskStorage ?? throw new ArgumentNullException(nameof(taskStorage));
        _tasksStatusHubContext = tasksStatusHubContext ?? throw new ArgumentNullException(nameof(tasksStatusHubContext));
    }

    public void AddTask(TaskDto task)
    {
        ArgumentNullException.ThrowIfNull(task);
        _taskStorage.Add(task);
        _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }

    public void UpdateTask(TaskDto task)
    {
        ArgumentNullException.ThrowIfNull(task);
        _taskStorage.Update(task);
        _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }

    public void RemoveTask(int id)
    {
        _taskStorage.Delete(id);
        _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }
    
    public IReadOnlyCollection<TaskDto> GetTasks()
    {
        return _taskStorage.GetAll();
    }

    public async Task ExecuteTask(TaskDto task)
    {
        ArgumentNullException.ThrowIfNull(task);

        if (_taskStorage.TryGetById(task.Id, out var taskToExecute) == false)
            return;
        
        if (taskToExecute == null)
            return;
        
        // TODO: Execute fake task
        // await...
    }
}