import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-landingadmin',
  templateUrl: './landingadmin.component.html',
  styleUrls: ['./landingadmin.component.scss']
})
export class LandingadminComponent implements OnInit {
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

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView();
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
    this.authService.logOut();
  }
}
