using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Linq;
using Xunit;
using server.Data.Models;
using server.Services;
using server.Controllers;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net;
using System.Threading.Tasks;
using Moq.Protected;
using System.Threading;

namespace test
{
    public class NewsControllerTest
    {
        //Test to get all the articles from the repository
        [Fact]
        public void GetMethodWithoutParameter_ShouldReturnListOfMovie()
        {
            //Arrange
            var mockService = new Mock<IFavoriteService>();
            mockService.Setup(service => service.GetAllArticles()).Returns(this.GetArticles());

            var mockHttp = new Mock<HttpClient>();//check later
            var controller = new NewsController(mockService.Object, mockHttp.Object);

            //Act
            var result = controller.Get();

            //Assert
            var actionresult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Article>>(actionresult.Value);

        }

        //Test to get a particular article from the repository
        [Fact]
        public void GetMethodWithParameter_ShouldReturnAArticle()
        {
            var mockService = new Mock<IFavoriteService>();
            mockService.Setup(service => service.GetArticle(1)).Returns(this.GetArticles().Single(m => m.Id == 1));

            var mockHttp = new Mock<HttpClient>();//check later
            var controller = new NewsController(mockService.Object, mockHttp.Object);

            var result = controller.GetArticle(1);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsAssignableFrom<Article>(actionResult.Value);
            Assert.Equal("title1", ((Article)actionResult.Value).Title);
        }

        //Test to add a article to repository
        [Fact]
        public void PostArticle_ArticleIsAdded()
        {
            var mockService = new Mock<IFavoriteService>();
            var article = new Article { Id = 5, Author = "Article Test", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            List<Article> addedArticles = new List<Article>();

            mockService.Setup(service => service.AddArticle(article)).Callback<Article>((m) => addedArticles.Add(m));

            var mockHttp = new Mock<HttpClient>();//check later
            var controller = new NewsController(mockService.Object, mockHttp.Object);

            var result = controller.PostArticle(article);

            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal("Article Test", ((Article)actionResult.Value).Author);
            Assert.True(1 == addedArticles.Count);
            Assert.NotNull(addedArticles.SingleOrDefault(m => m.Author == "Article Test"));
        }

        //Test to edit a existing article in repository
        [Fact]
        public void PutArticle_ArticleIsEdited()
        {
            var mockService = new Mock<IFavoriteService>();
            var article = new Article { Id = 5, Author = "Article Test", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            var editedArticle = new Article { Id = 5, Author = "Article Test Edited", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };

            mockService.Setup(service => service.EditArticle(editedArticle)).Callback<Article>((m) => article = m);

            var mockHttp = new Mock<HttpClient>();//check later
            var controller = new NewsController(mockService.Object, mockHttp.Object);
            var result = controller.PutArticle(article.Id, editedArticle);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Article Test Edited", ((Article)actionResult.Value).Author);
        }

        //Negative test case for put
        [Fact]
        public void PutMovie_EditedMovieDoesNotExist()
        {
            var article = new Article { Id = 5, Author = "Article Test", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            var editedArticle = new Article { Id = 51, Author = "Article Test Edited", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };

            var mockService = new Mock<IFavoriteService>();
            mockService.Setup(service => service.ArticleExists(editedArticle.Id)).Returns(false);

            var mockHttp = new Mock<HttpClient>();//check later
            var mockController = new NewsController(mockService.Object, mockHttp.Object);
            var result = mockController.PutArticle(article.Id, editedArticle);

            var actionResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal<int>(400, actionResult.StatusCode);
        }

        //Test to remove a record from the repository
        [Fact]
        public void DeleteArticle_ArticleIsDeleted()
        {
            var mockService = new Mock<IFavoriteService>();
            var article = new Article { Id = 5, Author = "Article Test", Comments = "comments5", Content = "content5", Description = "description5", PublishedAt = "11-11-2011", Title = "title5", Url = "url5", UrlToImage = "UrlToImage5" };
            List<Article> addedArticle = new List<Article> { article };

            mockService.Setup(service => service.GetArticle(article.Id)).Returns(article);
            mockService.Setup(service => service.DeleteArticle(article.Id)).Callback<int>((id) => addedArticle.Remove(addedArticle.Single(m => m.Id == id)));

            var mockHttp = new Mock<HttpClient>();//check later
            var controller = new NewsController(mockService.Object, mockHttp.Object);

            var result = controller.DeleteArticle(article.Id);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.True(0 == addedArticle.Count);
        }

        //negative test case for delete
        [Fact]
        public void DeleteArticle_ArticleDoesNotExists()
        {
            var article = new Article { Id = 1, Author = "author1", Comments = "comments1", Content = "content1", Description = "description1", PublishedAt = "11-11-2011", Title = "title1", Url = "url1", UrlToImage = "UrlToImage1" };
            Article deletedArticle = null;

            var mockService = new Mock<IFavoriteService>();
            mockService.Setup(service => service.GetArticle(article.Id)).Returns(deletedArticle);

            var mockHttp = new Mock<HttpClient>();//check later
            var mockController = new NewsController(mockService.Object, mockHttp.Object);
            var result = mockController.DeleteArticle(article.Id);

            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal<int>(404, actionResult.StatusCode.Value);
        }

        //Returns the list of articles
        private List<Article> GetArticles()
        {
            var articles = new List<Article>();

            articles.Add(new Article { Id = 1, Author = "author1", Comments = "comments1", Content = "content1", Description = "description1", PublishedAt = "11-11-2011", Title = "title1", Url = "url1", UrlToImage = "UrlToImage1" });
            articles.Add(new Article { Id = 2, Author = "author2", Comments = "comments2", Content = "content2", Description = "description2", PublishedAt = "11-11-2011", Title = "title2", Url = "url2", UrlToImage = "UrlToImage2" });
            articles.Add(new Article { Id = 3, Author = "author3", Comments = "comments3", Content = "content3", Description = "description3", PublishedAt = "11-11-2011", Title = "title13", Url = "url3", UrlToImage = "UrlToImage3" });

            return articles;
        }

        //returns the NewsApiModel
        private static NewsApiModel GetApiModel()
        {
            var articles = new List<Article>();

            articles.Add(new Article { Id = 1, Author = "author1", Comments = "comments1", Content = "content1", Description = "description1", PublishedAt = "11-11-2011", Title = "title1", Url = "url1", UrlToImage = "UrlToImage1" });
            articles.Add(new Article { Id = 2, Author = "author2", Comments = "comments2", Content = "content2", Description = "description2", PublishedAt = "11-11-2011", Title = "title2", Url = "url2", UrlToImage = "UrlToImage2" });
            articles.Add(new Article { Id = 3, Author = "author3", Comments = "comments3", Content = "content3", Description = "description3", PublishedAt = "11-11-2011", Title = "title13", Url = "url3", UrlToImage = "UrlToImage3" });

            return new NewsApiModel { Articles = articles, TotalResults = 3 };
        }

        //Returns the httpclient object required for the controller dependency
        private static HttpClient GetHttpClient(HttpStatusCode status)
        {
            string newsModel = JsonConvert.SerializeObject(GetApiModel());
            var httpMessageHandler = new Mock<HttpMessageHandler>();
            httpMessageHandler.Protected().Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                    .Returns(Task.FromResult(new HttpResponseMessage
                    {
                        StatusCode = status,
                        Content = new StringContent(newsModel, Encoding.UTF8, "application/json")
                    }));

            var httpClient = new HttpClient(httpMessageHandler.Object);
            return httpClient;
        }

        //to test the topnews method which returns news
        [Fact]
        public async Task GetTopNews_ShouldReturnArticles()
        {
            var status = HttpStatusCode.OK;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetTopNews(1, 3);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            var model = actionResult.Value as NewsApiModel;
            Assert.Equal(3, model.TotalResults);
            Assert.Equal(3, model.Articles.Count);
        }

        //to test the category wise method which returns news
        [Fact]
        public async Task GetCategoryRelatedNews_ShouldReturnArticles()
        {
            var status = HttpStatusCode.OK;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetCategoryRelatedNews("general", 1, 3);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            var model = actionResult.Value as NewsApiModel;
            Assert.Equal(3, model.TotalResults);
            Assert.Equal(3, model.Articles.Count);
        }

        //to test the based on search term method which returns news
        [Fact]
        public async Task GetNewsRelatedtoSearchTerm_ShouldReturnArticles()
        {
            var status = HttpStatusCode.OK;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetNewsRelatedtoSearchTerm("bitcoin", 1, 3);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            var model = actionResult.Value as NewsApiModel;
            Assert.Equal(3, model.TotalResults);
            Assert.Equal(3, model.Articles.Count);
        }

        //negative test case for the topnews method
        [Fact]
        public async Task GetTopNews_ShouldReturnNotFound()
        {
            var status = HttpStatusCode.NotFound;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetTopNews(1, 3);

            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, actionResult.StatusCode);
        }

        //negative test case for the category wise method
        [Fact]
        public async Task GetCategoryRelatedNews_ShouldReturnNotFound()
        {
            var status = HttpStatusCode.NotFound;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetCategoryRelatedNews("general", 1, 3);

            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, actionResult.StatusCode);
        }

        //negative test case for the search term based method
        [Fact]
        public async Task GetNewsRelatedtoSearchTerm_ShouldReturnNotFound()
        {
            var status = HttpStatusCode.NotFound;

            var mockService = new Mock<IFavoriteService>();
            var mockHttp = GetHttpClient(status);

            var controller = new NewsController(mockService.Object, mockHttp);

            var result = await controller.GetNewsRelatedtoSearchTerm("bitcoin", 1, 3);

            var actionResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, actionResult.StatusCode);
        }

    }
}
