using Microsoft.AspNetCore.SignalR;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksHub : Hub<ITasksStatusClient>
{
    private readonly ITasksStatusService _taskStatusService;

    public TasksHub(ITasksStatusService taskStatusService)
    {
        _taskStatusService = taskStatusService ?? throw new ArgumentNullException(nameof(taskStatusService));
    }
    
    public async Task<int> RunningTasksCount()
    {
        return await Task.FromResult(_taskStatusService.RunningTasksCount);
    }
}

public interface ITasksStatusClient
{
    Task TasksStatuses(IReadOnlyCollection<TaskDto> tasks);

    Task<int> RunningTasksCount(int tasksCount);
}