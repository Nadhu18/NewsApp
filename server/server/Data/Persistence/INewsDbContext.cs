using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using server.Data.Models;

namespace server.Data.Persistence
{
    public interface INewsDbContext
    {
        DbSet<Article> Articles { get; set; }

        EntityEntry Entry(object entity);

        int SaveChanges();
    }
}
