import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../article';
import { NewsService } from '../../news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'news-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input()
  article: Article;

  constructor(private service: NewsService, private snackBar: MatSnackBar, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {return false;}
    router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
        router.navigated = false;
      }
     });
  }

  ngOnInit() {
  }

  addArticleToWatchlist() {
    this.service.addArticleTowatchlist(this.article).subscribe((art) => {
      this.article.id = art.id;
      this.article.isWatchlisted = true;
      this.snackBar.open('Article Added To Favorites', '', {
        duration: 1000
      });
      this.refreshCards();
    }, error => {
      // console.error("An Error has occured in thumbnail component while adding the article.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  removeArticleFromWatchlist() {
    this.service.deleteArticleFromWatchlist(this.article.id).subscribe(() => {
      this.article.isWatchlisted = false;
      this.snackBar.open('Article removed from Favorites', '', {
        duration: 1000
      });
      this.refreshCards();
    }, error => {
      // console.error("An Error has occured in thumbnail component while removing article.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  navigateToNewsPage() {
    window.open(this.article.url, '_blank');
  }

  refreshCards() {
    let url =window.location.href;
      let arr = url.split('/');
      if(arr.some(x => x=="favorites")) {
        this.router.navigate(['/news/favorites']);
      }
      else if(arr.some(x => x == "home")) {
        this.router.navigate(['/news/home']);
      }
  }

}
