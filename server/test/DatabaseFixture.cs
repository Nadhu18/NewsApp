using Microsoft.EntityFrameworkCore;
using server.Data.Models;
using server.Data.Persistence;
using System;
using System.Collections.Generic;

namespace test
{
    public class DatabaseFixture : IDisposable
    {
        private IEnumerable<Article> Articles { get; set; }

        public INewsDbContext dbcontext;

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<NewsDbContext>()
                .UseInMemoryDatabase(databaseName: "NewsDB")
                .Options;
            dbcontext = new NewsDbContext(options);

            dbcontext.Articles.Add(new Article { Id = 1, Author = "author1", Comments = "comments1", Content = "content1", Description = "description1", PublishedAt = "11-11-2011", Title = "title1", Url = "url1", UrlToImage = "UrlToImage1" });
            dbcontext.Articles.Add(new Article { Id = 2, Author = "author2", Comments = "comments2", Content = "content2", Description = "description2", PublishedAt = "11-11-2011", Title = "title2", Url = "url2", UrlToImage = "UrlToImage2" });
            dbcontext.Articles.Add(new Article { Id = 3, Author = "author3", Comments = "comments3", Content = "content3", Description = "description3", PublishedAt = "11-11-2011", Title = "title13", Url = "url3", UrlToImage = "UrlToImage3" });

            dbcontext.SaveChanges();
        }

        public void Dispose()
        {
            Articles = null;
            dbcontext = null;
        }
    }
}
