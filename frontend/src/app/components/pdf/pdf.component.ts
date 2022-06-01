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

  // base schema for column charts
  gbdDiffSchema = {
      chart: {
        renderTo: '',
        type: 'column',
        height: 450,
        width: 350,
        backgroundColor: '#000',

      },

      title: {
        text: "",
        align: 'center',
        verticalAlign: 'bottom',
        style: {
          color: '#fff',
          fontSize: '20px',
        }
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
            verticalAlign: 'top',
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
            stacking: '',
            colorByPoint: true,
            borderWidth: 0,
            pointWidth: 30,

        },
        series: {
          dataLabels: {
            enabled: true,
            format: "{y}%",
            style: {
              color: '#fff',
              fontSize: '20px',
              fontWeight: 100
            },
            allowOverlap: true
          }
        }
      },

      colors: this.fourColor,
      legend:{
        enabled: false,
        verticalAlign: 'top',
        itemStyle: {
          color: '#fff',
          fontSize: '13px',
          fontWeight: 100
        }
      },

      credits: {
        enabled: false
      },
  }

  // stacking chart's settings
  private stackingSettings(series: any[], renderTo:string, text: string) {
    var gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
    gbdDiffSchema.chart.renderTo = renderTo
    gbdDiffSchema.title.text = text
    gbdDiffSchema.series = series
    gbdDiffSchema.chart.width = 500
    gbdDiffSchema.plotOptions.column.stacking = 'normal'
    gbdDiffSchema.plotOptions.column.colorByPoint = false
    gbdDiffSchema.plotOptions.column.pointWidth = 40
    gbdDiffSchema.plotOptions.series.dataLabels.style.fontSize = '18px'
    gbdDiffSchema.yAxis.stackLabels.enabled = false,
    gbdDiffSchema.legend.enabled = true
    return gbdDiffSchema
  }

  constructor() { }

  private increaseCompletionRates(): void {
    var gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
    // var gbdDiffSchema = Object.assign({}, this.gbdDiffSchema)
    gbdDiffSchema.chart.renderTo = 'increaseCompletionRates'
    gbdDiffSchema.title.text = 'Increased Completion Rates'
    gbdDiffSchema.title.verticalAlign = 'top'
    gbdDiffSchema.series[0].data = [82, 78, 88, 92]
    var chart = new Highcharts.Chart(gbdDiffSchema as any)
  }


  private highCertificationRates(): void {
    var gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
    // var gbdDiffSchema = Object.assign({}, this.gbdDiffSchema)
    gbdDiffSchema.chart.renderTo = 'highCertificationRates'
    gbdDiffSchema.title.text = 'High Certification Rates'
    gbdDiffSchema.title.verticalAlign = 'top'
    gbdDiffSchema.series[0].data = [94, 87, 81, 80]
    var chart = new Highcharts.Chart(gbdDiffSchema as any)
  }


  private highSkellsGain(): void {
    var gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
    gbdDiffSchema.chart.renderTo = 'highSkellsGain'
    // gbdDiffSchema.title.text = 'High Certification Rates'
    gbdDiffSchema.series[0].data = [67, 57, 51, 48]
    var chart = new Highcharts.Chart(gbdDiffSchema as any)
  }


  private consistentConfidenceGain(): void {
    var gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
    gbdDiffSchema.chart.renderTo = 'consistentConfidenceGain'
    gbdDiffSchema.series[0].data = [50, 58, 60, 59]
    var chart = new Highcharts.Chart(gbdDiffSchema as any)
  }

  private persentageOfEnrolmentByRole(): void {
    let renderTo = 'persentageOfEnrolmentByRole'
    let text = 'Percentage of Enrolment  by Role'
    var series = [{
          name: 'Manager',
          data: [44, 36, 40, 35],
          color: '#7f7f7f',
          dataLabels: {
            style: {
              fontSize: "18px",
              color: "#000",
              fontWeight: 600
            },
          },
        }, {
            name: 'Individual Contributor',
            data: [56, 64, 60, 65],
            color: '#34834aed'
        }]
    var chart = new Highcharts.Chart(this.stackingSettings(series, renderTo, text) as any)
  }


  private persentageOfEnrolmentByExperience(): void {
    let renderTo = 'persentageOfEnrolmentByExperience'
    let text = 'Percentage of Enrolment by Experience'
    var series = [{
          name: '15 years',
          data: [3, 16, 20, 21],
          color: '#ddd64e',
          dataLabels: {
            style: {
              fontSize: "18px",
              color: "#000",
              fontWeight: 600
            },
          },
        }, {
          name: '10-15 years',
          data: [9, 24, 32, 31],
          color: '#34834aed'
        }, {
          name: '5-10 years',
          data: [24, 28, 31, 27],
          color: '#6dbc78'
        }, {
          name: '< 5 years',
          data: [64, 31, 18, 21],
          color: '#7f7f7f'
        }]
    var chart = new Highcharts.Chart(this.stackingSettings(series, renderTo, text) as any)
  }

  private worckExperiencePieChart(): void {
      let series = [{
        name: null,
        innerSize: '50%',
        data: [23, 45, 12],
      }]
      let gbdDiffSchema = JSON.parse(JSON.stringify(this.gbdDiffSchema))
      gbdDiffSchema.chart.renderTo = 'worckExperiencePieChart'
      gbdDiffSchema.chart.type = 'pie'
      gbdDiffSchema.series = series
      var chart = new Highcharts.Chart(gbdDiffSchema as any)
    }



  ngOnInit(): void {
    this.increaseCompletionRates(),
    this.highCertificationRates()
    this.highSkellsGain(),
    this.consistentConfidenceGain(),
    this.persentageOfEnrolmentByRole(),
    this.persentageOfEnrolmentByExperience(),
    this.worckExperiencePieChart()

  }
}
// fourColor = [
//   '#7f7f7f',
//   '#595959',
//   '#6dbc78',
//   '#34834a',
// ]
