import { Component, OnInit, ViewChild } from '@angular/core';
import { ShortService } from '../short/short.service';
import { Link } from '../model/link.model';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteLinkDialog } from '../confirm-dialog/confirm-delete-link-dialog.component';

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.component.html',
  styleUrls: ['./user-links.component.scss'],
})
export class UserLinksComponent implements OnInit {
  tableData: MatTableDataSource<Link> = new MatTableDataSource<Link>();
  displayedColumns = ['short', 'long', 'actions'];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private shortService: ShortService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateLinks();

    this.paginator.pageSize = 12;
    this.paginator.pageSizeOptions = [12, 50, 100, 200];

    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  removeLink(link: Link) {
    this.dialog
      .open(ConfirmDeleteLinkDialog, { data: link })
      .afterClosed()
      .pipe(
        filter((res) => res === 'true'),
        switchMap(() => this.shortService.deleteLink(link.short))
      )
      .subscribe(() => this.updateLinks());
  }

  private updateLinks() {
    this.shortService
      .getUserLinks()
      .pipe(map((res) => res.links))
      .subscribe((links) => {
        this.tableData.data = links;
      });
  }
}
