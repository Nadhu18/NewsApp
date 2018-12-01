import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { HomeComponent } from './components/home/home.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

//defines all the routes for the application
const newsRoutes: Routes = [
    {
        path: 'news',
        children: [
            {
                path: '',
                redirectTo: '/news/home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'search/:searchTerm',
                component: SearchlistComponent
            },
            {
                path: 'favorites',
                component: WatchlistComponent
            }
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(newsRoutes),
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class NewsRouterModule {}