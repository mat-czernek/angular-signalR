using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TasksApi.Core;
using TasksApi.Model;

namespace TasksApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITasksStatusService _tasksStatusService;

    public TasksController(ITasksStatusService tasksStatusService)
    {
        _tasksStatusService = tasksStatusService ?? throw new ArgumentNullException(nameof(tasksStatusService));
    }
    
    [HttpGet("ping")]
    public IActionResult Get()
    {
        return Ok();
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = _tasksStatusService.GetTasks();
        
        return Ok(tasks);
    }

    [HttpPost]
    public IActionResult CreateTask([FromBody] TaskDto task)
    {
        _tasksStatusService.AddTask(task);
        
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        _tasksStatusService.RemoveTask(id);

        return Ok();
    }
}