import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';

import { Route } from '@angular/router';

export default [
  { path: '', component: HomeComponent,
  children: [
    { path: 'news', component: NewsComponent },
  ]
},
] satisfies Route[];
