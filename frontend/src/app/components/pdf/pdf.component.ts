import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.sass'],

})
export class PdfComponent implements OnInit {

  fourColor = [
    '#7f7f7f',
    '#595959',
    '#6dbc78',
    '#34834a',
  ]

  fy = ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', ]

  gbdDiffSchema = {

      chart: {
        renderTo: '',
        type: 'column',
        height: 450,
        width: 350,
        backgroundColor: '#000',

      },

      title: {
        text: null
      },

      xAxis: {
        categories: this.fy,
        labels: {
          style: {
            color: '#fff',
            fontSize: '12px',
          },
        },
      },

      yAxis: {
        max: 120,
        gridLineWidth:0,
        stackLabels: {
            enabled: true,
            verticalAlign: 'top'
        },
        labels: {
          enabled: false
        },
        title: {
          text: null
        }
      },

      series: [
        {
          data: [0, ]
        },
      ],


      plotOptions: {
        column: {
            colorByPoint: true,
            borderWidth: 0,
            pointWidth: 30

        },
        series: {
          dataLabels: {
            enabled: true,
            format: "{y}%",
            style: {
              color: '#fff',
              fontSize: '20px',
              fontWeight: 100
            }
          }
        }
      },


      colors: this.fourColor,
      legend:{ enabled:false },

      credits: {
        enabled: false
      },



  }

  constructor() { }

  private increaseCompletionRates(): void {
    this.gbdDiffSchema.chart.renderTo = 'increaseCompletionRates'
    this.gbdDiffSchema.series[0].data = [82, 78, 88, 92]
    var chart = new Highcharts.Chart(this.gbdDiffSchema as any)
  }

  private highCertificationRates(): void {
    this.gbdDiffSchema.chart.renderTo = 'highCertificationRates'
    this.gbdDiffSchema.series[0].data = [94, 87, 81, 80]
    var chart = new Highcharts.Chart(this.gbdDiffSchema as any)
  }

  private highSkellsGain(): void {
    this.gbdDiffSchema.chart.renderTo = 'highSkellsGain'
    this.gbdDiffSchema.series[0].data = [67, 57, 51, 48]
    var chart = new Highcharts.Chart(this.gbdDiffSchema as any)
  }

  private consistentConfidenceGain(): void {
    this.gbdDiffSchema.chart.renderTo = 'consistentConfidenceGain'
    this.gbdDiffSchema.series[0].data = [50, 58, 60, 59]
    var chart = new Highcharts.Chart(this.gbdDiffSchema as any)
  }


  ngOnInit(): void {
    this.increaseCompletionRates(),
    this.highCertificationRates(),
    this.highSkellsGain(),
    this.consistentConfidenceGain()
  }



}
