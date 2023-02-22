import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShortService } from '../../services/short.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OverrideDialogComponent } from '../../components/override-dialog-component/override-dialog.component';
import { filter } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';

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

  private baseUrl: string;

  constructor(
    private shortService: ShortService,
    config: ConfigService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.baseUrl = config.config.shortlinkConfig.baseUrl;
  }

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

        return (this.result = `${this.baseUrl}/${res.link.short}`);
      });
  }

  onCopied() {
    this.snackBar.open('Link copied!', null, { duration: 2000 });
  }
}
