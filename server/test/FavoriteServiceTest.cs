using Moq;
using server.Data.Models;
using server.Data.Persistence;
using server.Services;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace test
{
    public class FavoriteServiceTest
    {

        //should return the list of articles from repo
        [Fact]
        public void GetAllArticles_ShouldReturnListOfArticle()
        {
            //Arrange
            var mockRepo = new Mock<INewsRepository>();
            mockRepo.Setup(repo => repo.GetAllArticles()).Returns(this.GetArticles());
            var service = new FavoriteService(mockRepo.Object);

            //Act
            var actual = service.GetAllArticles();

            //Assert
            Assert.IsAssignableFrom<List<Article>>(actual);
            Assert.NotNull(actual);
            Assert.Equal(3, actual.Count);
        }

        //should return a particular a particular article from repo
        [Fact]
        public void GetArticle_ShouldReturnAArticle()
        {
            //Arrange
            var newsRepo = new Mock<INewsRepository>();
            newsRepo.Setup(repo => repo.GetArticle(1)).Returns(this.GetArticles().Single(m => m.Id == 1));
            var service = GetArticleService(newsRepo.Object);

            var actual = service.GetArticle(1);

            Assert.IsAssignableFrom<Article>(actual);
            Assert.Equal("title1", actual.Title);
        }

        //should add the article to the repo
        [Fact]
        public void AddArticle_ArticleIsAdded()
        {
            var newsRepo = new Mock<INewsRepository>();
            List<Article> addedArticles = new List<Article>();

            var article = new Article { Id = 5, Author = "author5", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            newsRepo.Setup(repo => repo.AddArticle(article)).Callback<Article>((m) => addedArticles.Add(m));
            var service = GetArticleService(newsRepo.Object);
            service.AddArticle(article);

            Assert.True(1 == addedArticles.Count);
            Assert.NotNull(addedArticles.SingleOrDefault(m => m.Author == "author5"));
        }

        //editing the article present in the repo
        [Fact]
        public void EditArticle_ArticleIsEdited()
        {
            var newsRepo = new Mock<INewsRepository>();

            var article = new Article { Id = 5, Author = "author5", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            var editedArticle = new Article { Id = 5, Author = "Article Test Edited", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };

            newsRepo.Setup(repo => repo.EditArticle(editedArticle)).Callback<Article>((m) => article = m);
            var service = GetArticleService(newsRepo.Object);
            service.EditArticle(editedArticle);

            Assert.Equal("Article Test Edited", article.Author);
        }

        //deleting the article from the repo
        [Fact]
        public void DeleteArticle_ArticleIsDeleted()
        {
            var newsRepo = new Mock<INewsRepository>();
            var article = new Article { Id = 5, Author = "author5", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            List<Article> addedArticles = new List<Article> { article };

            newsRepo.Setup(repo => repo.DeleteArticle(article.Id)).Callback<int>((id) => addedArticles.Remove(addedArticles.Single(m => m.Id == id)));
            var service = GetArticleService(newsRepo.Object);
            service.DeleteArticle(article.Id);

            Assert.True(0 == addedArticles.Count);
        }

        //injecting the dependency and returning the service
        private IFavoriteService GetArticleService(INewsRepository newsRepository)
        {
            var service = new FavoriteService(newsRepository);
            return service;
        }

        //return the list of articles
        private List<Article> GetArticles()
        {
            var articles = new List<Article>();

            articles.Add(new Article { Id = 1, Author = "author1", Comments = "comments1", Content = "content1", Description = "description1", PublishedAt = "11-11-2011", Title = "title1", Url = "url1", UrlToImage = "UrlToImage1" });
            articles.Add(new Article { Id = 2, Author = "author2", Comments = "comments2", Content = "content2", Description = "description2", PublishedAt = "11-11-2011", Title = "title2", Url = "url2", UrlToImage = "UrlToImage2" });
            articles.Add(new Article { Id = 3, Author = "author3", Comments = "comments3", Content = "content3", Description = "description3", PublishedAt = "11-11-2011", Title = "title13", Url = "url3", UrlToImage = "UrlToImage3" });

            return articles;
        }
    }
}
