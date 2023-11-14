import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';
import { NewsFeedComponent } from './news/news-feed/news-feed.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    NewsComponent,
    NewsItemComponent,
    NewsFeedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
