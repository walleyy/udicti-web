import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit , ViewChild} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-splashpg',
  templateUrl: './splashpg.component.html',
  styleUrls: ['./splashpg.component.scss']
})
export class SplashpgComponent implements OnInit {
public coachID:string;
public coachRouter:string;
private coachPath='/coaches';
public imageURL;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'applicants' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'projects' }
  ];

  constructor(private route: ActivatedRoute,
              private auth: AngularFireAuth,
              private db:AngularFireDatabase,
              private router:Router,
              private authService:AuthService) {
    //this.coachID=this.route.snapshot.paramMap.get('coachId')
    //console.log(this.route.snapshot.paramMap.get('coachId'));
    this.auth.authState.subscribe(authState=> localStorage.setItem('coachId', authState.uid))
    //localStorage.setItem('coachId', this.route.snapshot.paramMap.get('coachId'));

   }

  ngOnInit() {
    var coachId= localStorage.getItem('coachId');
    this.db.list(`${this.coachPath}/` + coachId).snapshotChanges().pipe(map(arr=>{
      return arr.map(res=>{
        return res.payload.val()
      })
    })).subscribe(snap=>{
      if(snap[0]['imageURL'] !==undefined){
        this.imageURL= snap[0]['imageURL']
      }
    })
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
  // function ya kuupdate data
  }
   

  logOut(){
    localStorage.removeItem('coachId');
    this.router.navigate(['/home']);
     this.authService.logOut();
  }
}
