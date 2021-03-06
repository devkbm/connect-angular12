import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  @Input()
  article: Article;

  constructor() { }

  ngOnInit() {
  }

}
