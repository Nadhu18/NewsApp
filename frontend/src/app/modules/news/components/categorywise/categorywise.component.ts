import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import { NewsApiModel } from '../../newsApiModel';

@Component({
  selector: 'news-categorywise',
  templateUrl: './categorywise.component.html',
  styleUrls: ['./categorywise.component.css']
})
export class CategorywiseComponent implements OnInit {
  model: NewsApiModel;
  pageSize: number;
  page: number;
  categories: string[] = [
    "General",
    "Technology",
    "Science",
    "Business",
    "Sports",
    "Health",
    "Entertainment"
  ];
  selectedCategory: string;

  constructor(private service: NewsService) { 
    this.page = 0;
    this.pageSize = 5;
    this.selectedCategory = "General";
  }

  ngOnInit() {
    this.getCategoryNews();
  }

  getCategoryNews() {
    this.service.getCategoryWiseNews(this.selectedCategory, this.page, this.pageSize).subscribe(m => {
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
        console.error("An Error has occured in category component while getting favorites.", error);
        alert("some error occurred. PLease try after some time");
      });
    }, error => {
      console.error("An Error has occured in category component while getting the article.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  onPagerChange(e) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getCategoryNews();
  }

  onCategorySelect(category) {
    this.selectedCategory = category;
    this.getCategoryNews();
  }
}
