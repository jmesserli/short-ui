import {Component, OnInit, Input} from '@angular/core';
import {ShortService} from './short.service';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
})
export class ShortComponent implements OnInit {
  @Input()
  url: string;

  result: string;

  constructor(private shortService: ShortService) {
  }

  ngOnInit() {
  }

  shortenUrl() {
    this.shortService.shortenUrl({long: this.url, short: ''}).subscribe(res => (this.result = res.link.short));
  }
}
