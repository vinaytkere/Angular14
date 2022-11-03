using API.Data;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProjectController : ApiController
    {
        [Route("projects")]
        [HttpPost]
        public IHttpActionResult AddProject(Project project)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");
            using (var context = new DataContext())
            {
                var proj = context.Project.Where(x => x.ProjectName == project.ProjectName).FirstOrDefault();
                if (proj == null)
                {
                    context.Project.Add(new Project()
                    {
                        ProjectName = project.ProjectName
                    });
                    context.SaveChanges();
                    return Ok("Project added successfully");
                }
                else
                {
                    return Ok("Project already added");
                }

            }
        }

        [Route("GetProject")]
        [HttpGet]
        public IHttpActionResult GetProjectList()
        {
            using (var context = new DataContext())
            {
                return Ok(context.Project.Select(x => x).ToList());
            }
        }
        [Route("Delete")]
        [HttpDelete]
        public IHttpActionResult DeleteById(int id)
        {
            using (var context = new DataContext())
            {
                var item = context.Project.SingleOrDefault(x => x.Id == id);
                if (item != null)
                {
                    context.Project.Remove(item);
                    context.SaveChanges();
                }
                return Ok("Deleted Successfully");
            }
        }
    }
}
