import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { HomeComponent } from './components/home/home.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { AuthGuardService } from './auth-gaurd.service';
import { LoginComponent } from './components/login/login.component';

//defines all the routes for the application
const newsRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'news',
        children: [
            {
                path: '',
                redirectTo: '/news/home',
                pathMatch: 'full',
                canActivate: [AuthGuardService] //restricts from navigating without login
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuardService] //restricts from navigating without login
            },
            {
                path: 'search/:searchTerm',
                component: SearchlistComponent,
                canActivate: [AuthGuardService] //restricts from navigating without login
            },
            {
                path: 'favorites',
                component: WatchlistComponent,
                canActivate: [AuthGuardService] //restricts from navigating without login
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
    providers: [AuthGuardService]
})

export class NewsRouterModule {}