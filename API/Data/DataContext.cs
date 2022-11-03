using API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext() : base("dbcon")
        {
        }

        public DbSet<Register> Register { get; set; }
        public DbSet<Project> Project { get; set; }
    }
}