import { Component, OnInit } from '@angular/core';
import { NewsApiModel } from '../../newsApiModel';
import { NewsService } from '../../news.service';

@Component({
  selector: 'news-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css']
})
export class TopnewsComponent implements OnInit {
  model: NewsApiModel;
  pageSize: number;
  page: number;

  constructor(private service: NewsService) {
    this.page = 0;
    this.pageSize = 5;
  }

  ngOnInit() {
    this.getTopNews();
  }

  getTopNews() {
    this.service.getTopNews(this.page, this.pageSize).subscribe(m => {
      this.model = m;
      this.service.getWatchListedArticles().subscribe(mw => {
        this.model.articles && this.model.articles.forEach(a => {
          if (mw.some(x => x.url == a.url)) {
            a.isWatchlisted = true;
          }
          else {
            a.isWatchlisted = false;
          }
        });
      }, error => {
        console.error("An Error has occured in Top News component while getting articles.", error);
        alert("some error occurred. PLease try after some time");
      });
    }, error => {
      console.error("An Error has occured in Top News component while getting articles.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  onPagerChange(e) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getTopNews();
  }

}
