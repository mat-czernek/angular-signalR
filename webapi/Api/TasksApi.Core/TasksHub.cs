using Microsoft.AspNetCore.SignalR;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksHub : Hub<ITasksStatusClient>
{
}

public interface ITasksStatusClient
{
    Task TasksStatuses(IReadOnlyCollection<TaskDto> tasks);
}