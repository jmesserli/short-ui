import { Component, OnInit, ViewChild } from '@angular/core';
import { ShortService } from '../../services/short.service';
import { Link } from '../../model/link.model';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ConfirmDeleteLinkComponent } from '../../components/confirm-delete-link-dialog/confirm-delete-link.component';

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
      .open(ConfirmDeleteLinkComponent, { data: link })
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
