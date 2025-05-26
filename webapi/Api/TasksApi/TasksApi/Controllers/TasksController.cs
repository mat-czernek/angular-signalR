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
    public async Task<IActionResult> CreateTask([FromBody] TaskDto task)
    {
        await _tasksStatusService.AddTask(task);
        
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        await _tasksStatusService.RemoveTask(id);

        return Ok();
    }

    [HttpPost("executeWithResponseForAll")]
    public async Task<IActionResult> ExecuteTaskWithResponseForAll([FromBody] TaskDto task)
    {
        await Task.Run(() => _tasksStatusService.ExecuteTask(task));
        
        return Ok();
    }
    
    [HttpPost("executeWithResponseForCaller/{connectionId}")]
    public async Task<IActionResult> ExecuteTaskWithResponseForCaller([FromBody] TaskDto task, [FromRoute] string connectionId)
    {
        await Task.Run(() => _tasksStatusService.ExecuteTask(task, connectionId));
        
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateTask([FromBody] TaskDto task)
    {
        await _tasksStatusService.UpdateTask(task);
        
        return Ok();
    }
}