using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Data.Models;
using server.Services;

namespace server.Controllers
{
    [Produces("application/json")]
    [Route("api/News")]
    public class NewsController : Controller
    {
        private readonly IFavoriteService _favService;

        private HttpClient _httpClient;

        public NewsController(IFavoriteService favService, HttpClient httpClient)
        {
            _favService = favService;
            _httpClient = httpClient;
        }

        // Method to get all the articles from the repository -- fav
        // GET: api/News
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = _favService.GetAllArticles();

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("There is an Error");
            }
        }

        //Method to get a particular article from the repository -- fav
        // GET: api/News/123
        [HttpGet("{id}")]
        public IActionResult GetArticle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = _favService.GetArticle(id);

            if (article == null)
            {
                return NotFound("Didn't find article with id " + id);
            }
            return Ok(article);
        }


        //Method to save a article to the repository -- fav
        [HttpPost]
        public ActionResult PostArticle([FromBody] Article article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (_favService.ArticleExists(article.Id))
                {
                    return new StatusCodeResult(Microsoft.AspNetCore.Http.StatusCodes.Status409Conflict);
                }
                else
                {
                    _favService.AddArticle(article);
                }
            }
            catch (Exception)
            {
                return BadRequest("Please check the article details that you have entered.");
            }

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }


        //Method to edit the already existing article in the repository -- fav
        // PUT: api/News/5
        [HttpPut("{id}")]
        public IActionResult PutArticle([FromRoute] int id, [FromBody] Article article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != article.Id)
            {
                return BadRequest();
            }

            try
            {
                _favService.EditArticle(article);
                return Ok(article);

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_favService.ArticleExists(id))
                {
                    return NotFound("Article does not exist, please check your input");
                }
                else
                {
                    return new StatusCodeResult(Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError);
                }
            }
        }


        //Method to delete a article from repository -- fav
        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public IActionResult DeleteArticle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = _favService.GetArticle(id);

            if (article == null)
            {
                return NotFound("Article doesn't exist");
            }

            _favService.DeleteArticle(id);
            return Ok(article);
        }

        //Method to get top news from external newsApi
        //GET: api/news/topNews/1/10
        [HttpGet("topNews/{page}/{pageSize}")]
        public async Task<IActionResult> GetTopNews(int page, int pageSize)
        {
            try
            {
                var url = $"https://newsapi.org/v2/top-headlines?country=in&apiKey=25cdd44a5f5c4ebf87f6b20024e10edb&page={page}&pagesize={pageSize}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<NewsApiModel>(await response.Content.ReadAsStringAsync());
                    return Ok(result);
                }

                return NotFound("No Articles found");
            }
            catch
            {
                return BadRequest("Some Error occoured");
            }
        }

        //Method to get the news based on category
        //GET: api/news/category/general/1/10
        [HttpGet("category/{category}/{page}/{pageSize}")]
        public async Task<IActionResult> GetCategoryRelatedNews(string category, int page, int pageSize)
        {
            try
            {
                var apiKey = "apiKey=25cdd44a5f5c4ebf87f6b20024e10edb";
                var url = $"https://newsapi.org/v2/top-headlines?country=in&category={category}&{apiKey}&page={page}&pagesize={pageSize}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<NewsApiModel>(await response.Content.ReadAsStringAsync());
                    return Ok(result);
                }

                return NotFound("No Articles were found");
            }
            catch
            {
                return BadRequest("Some Error occured");
            }
        }

        //Method to get the news based on the search term
        //GET: api/search/term/1/10
        [HttpGet("search/{searchTerm}/{page}/{pageSize}")]
        public async Task<IActionResult> GetNewsRelatedtoSearchTerm(string searchTerm, int page, int pageSize)
        {
            try
            {
                var apiKey = "apiKey=25cdd44a5f5c4ebf87f6b20024e10edb";
                var url = $"https://newsapi.org/v2/everything?q={searchTerm}&{apiKey}&page={page}&pagesize={pageSize}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<NewsApiModel>(await response.Content.ReadAsStringAsync());
                    return Ok(result);
                }

                return NotFound("No Articles were found");
            }
            catch
            {
                return BadRequest("Some Error occured");
            }
        }

    }
}