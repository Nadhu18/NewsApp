import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../article';
import { NewsService } from '../../news.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'news-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input()
  article: Article;

  constructor(private service: NewsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addArticleToWatchlist() {
    this.service.addArticleTowatchlist(this.article).subscribe((art) => {
      this.article.id = art.id;
      this.article.isWatchlisted = true;
      this.snackBar.open('Article Added To Favorites', '', {
        duration: 1000
      });
    }, error => {
      console.error("An Error has occured in thumbnail component while adding the article.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  removeArticleFromWatchlist() {
    this.service.deleteArticleFromWatchlist(this.article.id).subscribe(() => {
      this.article.isWatchlisted = false;
      this.snackBar.open('Article removed from Favorites', '', {
        duration: 1000
      });
      let url =window.location.href;
      let arr = url.split('/');
      if(arr.some(x => x=="favorites")) {
        location.reload();
      }
    }, error => {
      console.error("An Error has occured in thumbnail component while removing article.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  navigateToNewsPage() {
    window.open(this.article.url, '_blank');
  }

}
