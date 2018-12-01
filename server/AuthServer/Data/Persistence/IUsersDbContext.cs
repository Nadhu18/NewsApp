using AuthSever.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AuthSever.Data.Persistence
{
    public interface IUsersDbContext
    {
        DbSet<User> Users { get; set; }

        EntityEntry Entry(object entity);

        int SaveChanges();
    }
}
