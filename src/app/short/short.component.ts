import {Component, OnInit, Input} from '@angular/core';
import {ShortService} from './short.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
})
export class ShortComponent implements OnInit {
  @Input()
  url: string;
  @Input()
  shortUrl: string;

  editing: boolean;
  result: string;

  constructor(private shortService: ShortService,
              private snackbBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  shortenUrl() {
    this.shortService.shortenUrl({
      long: this.url,
      short: this.shortUrl
    }).subscribe(res => {
      this.url = '';

      return (this.result = `https://peg.nu/${res.link.short}`);
    });
  }

  onCopied() {
    this.snackbBar.open('Link copied!', null, {duration: 2000});
  }
}
