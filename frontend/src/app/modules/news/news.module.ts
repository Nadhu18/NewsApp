import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NewsRouterModule } from './news-router.module';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { NewsService } from './news.service';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './components/home/home.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { TopnewsComponent } from './components/topnews/topnews.component';
import { CategorywiseComponent } from './components/categorywise/categorywise.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NewsRouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  declarations: [SearchlistComponent, ThumbnailComponent, ContainerComponent, HomeComponent, WatchlistComponent, TopnewsComponent, CategorywiseComponent, LoginComponent],
  exports: [
    FormsModule,
    NewsRouterModule
  ],
  providers: [NewsService]
})
export class NewsModule { }
