using Microsoft.EntityFrameworkCore;
using server.Data.Models;

namespace server.Data.Persistence
{
    public class NewsDbContext : DbContext, INewsDbContext
    {
        public NewsDbContext() { }

        public NewsDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
    }
}
