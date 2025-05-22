using Microsoft.AspNetCore.Mvc;

namespace TasksApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet("ping")]
    public IActionResult Get()
    {
        return Ok();
    }
}