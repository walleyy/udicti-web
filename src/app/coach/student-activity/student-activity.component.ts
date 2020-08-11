import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map } from 'rxjs/operators'


/** Constants used to fill up our data base. */

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-student-activity',
  templateUrl: './student-activity.component.html',
  styleUrls: ['./student-activity.component.scss']
})
export class StudentActivityComponent implements OnInit {
  displayedColumns: string[] = ['number', 'projectName', 'name'];
  dataSource: MatTableDataSource<any>;
  private incubatee='/incubatee-coach';
  private incubatee_array:any[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private db:AngularFireDatabase,
              private router:Router) {



    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit() {

    this.db.list(`${this.incubatee}/`).snapshotChanges().pipe(map(arr=>{
      return arr.map(res=>Object.assign(res.payload.val(), {key:res.key}))
    })).subscribe(snap=>{
            var count:number=0;
            this.incubatee_array=[];
          snap.forEach(data=>{
            count++;
            this.incubatee_array.push({number:count, projectName: data['projectName'], name:data['name'], userID:data['userID']})
            console.log('data', this.incubatee_array)
          })

          this.dataSource = new MatTableDataSource(this.incubatee_array);
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

  navigate(row:any){
    this.router.navigate(['/student-activity', 'incubateeTimeline'], {
      queryParams:{
        search:row.userID,
        name: row.name
      }
    })
    console.log(row);

  }
}

