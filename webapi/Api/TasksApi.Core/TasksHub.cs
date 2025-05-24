using Microsoft.AspNetCore.SignalR;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksHub : Hub<ITasksStatusClient>
{
    private readonly ITasksStatusService _tasksStatusService;

    public TasksHub(ITasksStatusService tasksStatusService)
    {
        _tasksStatusService = tasksStatusService ?? throw new ArgumentNullException(nameof(tasksStatusService));
    }

    public async Task ExecuteTask(TaskDto dto)
    {
        await this._tasksStatusService.ExecuteTask(dto);
        await EmitTasksStatuses();
    }
    
    public async Task EmitTasksStatuses()
    {
        await Clients.All.TasksStatuses(_tasksStatusService.GetTasks());
    }
}

public interface ITasksStatusClient
{
    Task TasksStatuses(IReadOnlyCollection<TaskDto> tasks);
}