import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShortService } from './short.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OverrideDialogComponent } from '../override-dialog-component/override-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
})
export class ShortComponent implements OnInit, OnDestroy {
  @Input()
  public url: string;
  @Input()
  public shortUrl: string;

  public editingShortUrl: boolean;
  public result: string;

  constructor(
    private shortService: ShortService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  shortenUrl() {
    if (this.shortUrl && this.shortUrl !== '') {
      this.shortService.linkExists(this.shortUrl).subscribe((res) => {
        if (res.exists) {
          this.dialog
            .open(OverrideDialogComponent, { data: res })
            .afterClosed()
            .pipe(filter((res) => res === 'true'))
            .subscribe(this._doShorten.bind(this));
        } else {
          this._doShorten();
        }
      });
    } else {
      this._doShorten();
    }
  }

  private _doShorten() {
    this.shortService
      .shortenUrl({
        long: this.url,
        short: this.shortUrl,
      })
      .subscribe((res) => {
        this.url = '';
        this.shortUrl = '';

        return (this.result = `https://peg.nu/${res.link.short}`);
      });
  }

  onCopied() {
    this.snackBar.open('Link copied!', null, { duration: 2000 });
  }
}
