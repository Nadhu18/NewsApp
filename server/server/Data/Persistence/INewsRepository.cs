using server.Data.Models;
using System.Collections.Generic;

namespace server.Data.Persistence
{
    public interface INewsRepository
    {
        //should return list of articles from db
        List<Article> GetAllArticles();

        //should return a article from db
        Article GetArticle(int id);

        //will return true if the article exists in db
        bool ArticleExists(int id, string userId);

        //should add the article into db
        void AddArticle(Article article);

        //will edit the article in db
        void EditArticle(Article article);

        //deleting the article from db
        void DeleteArticle(int id);
    }
}
