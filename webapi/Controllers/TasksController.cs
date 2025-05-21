using Microsoft.AspNetCore.Mvc;

namespace tasksSignalR.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok();
    }
}