import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../article';

@Component({
  selector: 'news-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input()
  articles: Array<Article>;

  constructor() { }

  ngOnInit() {}

}
