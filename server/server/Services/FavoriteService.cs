using server.Data.Models;
using server.Data.Persistence;
using System.Collections.Generic;

namespace server.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly INewsRepository _repo;

        public FavoriteService(INewsRepository repo) {
            _repo = repo;
        }

        //will return the list of articles from repo
        public List<Article> GetAllArticles() {
            return _repo.GetAllArticles();
        }

        //will return a particular a particular article from repo
        public Article GetArticle(int id) {
            return _repo.GetArticle(id);
        }

        //checks if the particular article is in repo
        public bool ArticleExists(int id) {
            return _repo.ArticleExists(id);
        }

        //will add the article to the repo
        public void AddArticle(Article article) {
            _repo.AddArticle(article);
        }

        //will edit the article present in the repo
        public void EditArticle(Article article) {
            _repo.EditArticle(article);
        }

        //will delete the article from the repo
        public void DeleteArticle(int id) {
            _repo.DeleteArticle(id);
        }
    }
}
