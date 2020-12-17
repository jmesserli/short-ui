import { Component, OnInit } from '@angular/core';
import { ShortService } from '../short/short.service';
import { Link } from '../model/link.model';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-links',
  templateUrl: './user-links.component.html',
  styleUrls: ['./user-links.component.scss'],
})
export class UserLinksComponent implements OnInit {
  tableData: DataSource<Link>;
  displayedColumns = ['short', 'long', 'actions'];

  private userLinks: Link[];

  constructor(private shortService: ShortService) {}

  ngOnInit(): void {
    this.shortService
      .getUserLinks()
      .pipe(map((ulr) => ulr.links))
      .subscribe((links) => {
        this.userLinks = links;

        this.tableData = new MatTableDataSource(links);
      });
  }
}
