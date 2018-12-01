import { Component, OnInit } from '@angular/core';
import { Article } from '../../article';
import { NewsService } from '../../news.service';

@Component({
  selector: 'news-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  articles: Array<Article>;

  constructor(private service: NewsService) { 
    this.articles = [];
  }

  ngOnInit() {
    this.service.getWatchListedArticles().subscribe(m => {
      this.articles.push(...m);
      this.service.getWatchListedArticles().subscribe(mw => {
        this.articles && this.articles.forEach(a => {
          if (mw.some(x => x.url == a.url)) {
            a.isWatchlisted = true;
          }
          else {
            a.isWatchlisted = false;
          }
        });
      });
    });
  }

  isWatchListEmpty() {
    this.articles && this.articles.length>0;
  }

}
