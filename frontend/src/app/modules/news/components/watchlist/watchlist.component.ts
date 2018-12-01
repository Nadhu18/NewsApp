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
      this.articles && this.articles.forEach(a => { a.isWatchlisted = true;});
    }, error => {
      console.error("An Error has occured in Watchlist component while getting articles.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  isWatchListEmpty() {
    return this.articles && this.articles.length > 0;
  }

}
