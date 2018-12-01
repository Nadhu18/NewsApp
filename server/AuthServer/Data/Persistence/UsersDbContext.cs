using AuthSever.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthSever.Data.Persistence
{
    public class UsersDbContext : DbContext, IUsersDbContext
    {
        public UsersDbContext() { }

        public UsersDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}