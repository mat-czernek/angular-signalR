using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksStatusService : ITasksStatusService
{
    private readonly ITaskStorage _taskStorage;
    private readonly IHubContext<TasksHub, ITasksStatusClient> _tasksStatusHubContext;
    private readonly ILogger<TasksStatusService> _logger;

    public TasksStatusService(ITaskStorage taskStorage, IHubContext<TasksHub, ITasksStatusClient> tasksStatusHubContext, ILogger<TasksStatusService> logger)
    {
        _taskStorage = taskStorage ?? throw new ArgumentNullException(nameof(taskStorage));
        _tasksStatusHubContext = tasksStatusHubContext ?? throw new ArgumentNullException(nameof(tasksStatusHubContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task AddTask(TaskDto task)
    {
        ArgumentNullException.ThrowIfNull(task);
        
        _taskStorage.Add(task);
        await _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }

    public async Task UpdateTask(TaskDto task)
    {
        ArgumentNullException.ThrowIfNull(task);
        
        _taskStorage.Update(task);
        await _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }

    public async Task RemoveTask(int id)
    {
        _taskStorage.Delete(id);
        await _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
    }
    
    public IReadOnlyCollection<TaskDto> GetTasks()
    {
        return _taskStorage.GetAll();
    }

    public async Task ExecuteTask(TaskDto task)
    {
        try
        {
            if (_taskStorage.TryGetById(task.Id, out var taskToExecute) == false)
                return;
            
            if (taskToExecute == null)
                return;
            
            taskToExecute.Status = TaskStatusDto.InProgress;
            taskToExecute.TimeElapsed = 0;
            
            _taskStorage.Update(taskToExecute);
            await _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
        
            var stopwatch = Stopwatch.StartNew();
            
            await Task.Delay(_generateTaskExecutionTime());
        
            stopwatch.Stop();

            taskToExecute.TimeElapsed = stopwatch.Elapsed.TotalSeconds;
            taskToExecute.Status = TaskStatusDto.Completed;
            _taskStorage.Update(taskToExecute);
            await _tasksStatusHubContext.Clients.All.TasksStatuses(_taskStorage.GetAll());
        }
        catch (Exception e)
        {
            _logger.LogError("Task execution failed with message: {message}", e.Message);
        }
    }

    private static int _generateTaskExecutionTime()
    {
        var random = new Random();
        return random.Next(10, 30) * 1000;
    }
}