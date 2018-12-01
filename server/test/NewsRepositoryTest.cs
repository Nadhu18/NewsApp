using server.Data.Models;
using server.Data.Persistence;
using System.Collections.Generic;
using Xunit;

namespace test
{
    public class NewsRepositoryTest : IClassFixture<DatabaseFixture>
    {
        private readonly INewsRepository _repo;

        DatabaseFixture _fixture;

        public NewsRepositoryTest(DatabaseFixture fixture)
        {
            _fixture = fixture;
            _repo = new NewsRepository(_fixture.dbcontext);
        }

        //should return list of articles from dbcontext
        [Fact]
        public void GetAllArticles_ShouldReturnListOfArticle()
        {
            //Act
            var actual = _repo.GetAllArticles();

            //Assert
            Assert.IsAssignableFrom<List<Article>>(actual);
            Assert.True(actual.Count < 4);
        }

        //should return a article from dbcontext
        [Fact]
        public void GetArticle_ShouldReturnAArticle()
        {
            var actual = _repo.GetArticle(2);

            Assert.IsAssignableFrom<Article>(actual);
            Assert.Equal("title2", actual.Title);
        }

        //should add the article into dbcontext
        [Fact]
        public void AddArticle_ArticleIsAdded()
        {
            var article = new Article { Id = 5, Author = "author5", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };

            _repo.AddArticle(article);
            var savedArticle = _repo.GetArticle(5);

            Assert.Equal("title5", savedArticle.Title);
        }

        //editing the article in dbcontext
        [Fact]
        public void EditArticle_ArticleIsEdited()
        {
            var article = new Article { Id = 6, Author = "author5", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title6", Url = "url5", UrlToImage = "UrlToImage5" };

            _repo.AddArticle(article);
            article.Title = "Article Test Edited";

            _repo.EditArticle(article);
            var savedArticle = _repo.GetArticle(article.Id);

            Assert.Equal("Article Test Edited", savedArticle.Title);
        }

        //deleting the article from db
        [Fact]
        public void DeleteArticle_ArticleIsDeleted()
        {
            _repo.DeleteArticle(1);

            Assert.Null(_repo.GetArticle(1));
        }

    }
}
