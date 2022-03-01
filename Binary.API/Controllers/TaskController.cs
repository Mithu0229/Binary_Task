using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Threading.Tasks;

namespace Binary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("AddTask")]
        public async Task<IActionResult> AddTask([FromBody]Data.Task model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest("Missing Data");
                }
                var msg =await _taskService.AddTask(model);

                return Ok(msg);
            }
            catch (Exception ex)
            {

                return BadRequest("An Error Occured");
            }
        }
        

       [HttpGet("GetAllTask")]
        public async Task<IActionResult> GetAllTask()
        {
            try
            {
               
                var data =await _taskService.GetTasks();
                if (data !=null)
                {
                    return Ok(data);
                }
                else
                {
                    return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("An Error Occured");
            }

        }

        [HttpGet("searchTask/{name}")]
        public async Task<IActionResult> searchTask(string name)
        {
            try
            {

                var data = await _taskService.SearchTask(name);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("An Error Occured");
            }

        }



    }
}
