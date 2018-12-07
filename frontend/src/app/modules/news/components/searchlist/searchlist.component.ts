import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material';

import { NewsApiModel } from '../../newsApiModel';
import { NewsService } from '../../news.service';


@Component({
  selector: 'news-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {
  model: NewsApiModel;
  searchTerm: string;
  pageSize: number;
  page: number;

  constructor(private service: NewsService, private route: ActivatedRoute, private router: Router) { 
    this.page = 0;
    this.pageSize = 5;

    //Getting movieName from the URL
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    });

    //used to reload the page when we are on the same component
    this.router.routeReuseStrategy.shouldReuseRoute = function() {return false;}
  }

  ngOnInit() {
    this.getSearchResults();
  }

  getSearchResults() {
    this.service.getSearchedNews(this.searchTerm, this.page, this.pageSize).subscribe(m => {
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
        // console.error("An Error has occured in searchlist component while getting favorites.", error);
        alert("some error occurred. PLease try after some time");
      });
    }, error => {
      // console.error("An Error has occured in searchlist component while getting articles.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  onPagerChange(e) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getSearchResults();
  }

}
