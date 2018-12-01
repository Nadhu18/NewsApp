using server.Data.Models;
using System.Collections.Generic;

namespace server.Services
{
    public interface IFavoriteService
    {
        //will return the list of articles from repo
        List<Article> GetAllArticles();

        //will return a particular a particular article from repo
        Article GetArticle(int id);

        //checks if the particular article is in repo
        bool ArticleExists(int id);

        //will add the article to the repo
        void AddArticle(Article article);

        //will edit the article present in the repo
        void EditArticle(Article article);

        //will delete the article from the repo
        void DeleteArticle(int id);
    }
}
