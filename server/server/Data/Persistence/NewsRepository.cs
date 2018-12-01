using Microsoft.EntityFrameworkCore;
using server.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Data.Persistence
{
    public class NewsRepository : INewsRepository
    {
        private readonly INewsDbContext _context;

        public NewsRepository(INewsDbContext context)
        {
            _context = context;
        }

        //should return list of articles from db
        public List<Article> GetAllArticles() {
            return _context.Articles.ToList();
        }

        //should return a article from db
        public Article GetArticle(int id) {
            return _context.Articles.SingleOrDefault(x => x.Id == id);
        }

        //will return true if the article exists in db
        public bool ArticleExists(int id) {
            return _context.Articles.Any(x => x.Id == id);
        }

        //should add the article into db
        public void AddArticle(Article article) {
            _context.Articles.Add(article);
            _context.SaveChanges();
        }

        //will edit the article in db
        public void EditArticle(Article article) {
            _context.Entry(article).State = EntityState.Modified;
            _context.SaveChanges();
        }

        //deleting the article from db
        public void DeleteArticle(int id) {
            var article = GetArticle(id);
            _context.Articles.Remove(article);
            _context.SaveChanges();
        }
    }
}
