import { SessionService } from './../../service/session.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-resources',
  styleUrls: ['./resources.component.scss'],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Date', 'URL'];
  dataSource: MatTableDataSource<any>;
  table_array:any[]=[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sessionServie:SessionService) {}

  ngOnInit() {
    this.sessionServie.getSession().subscribe(res=>{
      let count:number=0;
      res.forEach(data=>{
        data.forEach(element=>{
          count++;
         this.table_array.push({position:count, name: element.filename, Date:element.sessionDate, URL:element.fileUrl})
         console.log(this.table_array);
        })

      })

      this.dataSource = new MatTableDataSource(this.table_array);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


