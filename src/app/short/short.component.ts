import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
})
export class ShortComponent implements OnInit {
  @Input()
  url: string;

  constructor() {}

  ngOnInit() {}

  shortenUrl() {}
}
