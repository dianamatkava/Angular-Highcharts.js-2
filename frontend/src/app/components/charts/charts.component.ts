import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
  title='Highcharts'

  private getRandomList(min: number, max: number, length:number): any[] {
    const data: any[] = []
    for (let i = 0; i < length; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return data
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  private createChartGauge(): void {
    const chart = Highcharts.chart('bar-chart', {
      chart: {
        type: 'bar',

        // add styles
        backgroundColor: {
          linearGradient: [0, 0, 0, 5000],
          stops: [
              [0, 'rgb(255, 255, 255)'],
              [1, 'rgb(240, 240, 255)']
          ]
        },
        borderWidth: 0,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
        },


      title: {
        text: 'Bar Chart',
      },
      subtitle: {
        text: 'Bar Chart subtitle'
      },

      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },

      yAxis: {

        min: 0,       //min len
        max: 10,      //max len

        tickAmount: 11,   //range of ven defided by val

        labels: {
          y: 22,          // not sure, but behaives like ~ margin
        },
      },

      series: [{          // in Bar chart can take only 2 par
        name: 'Jane',
        data: this.getRandomList(1, 10, 3)
        }, {
        name: 'John',
        data: this.getRandomList(1, 10, 3)
        }]
      } as any);
  }


  private createLineChart() {
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: 'line-chart',     // wich id to follow
        },

      xAxis: {
        type: 'datetime',
        gridLineWidth: 1      // adds border-width of the inner grid
      },

      yAxis: {
        labels: {
            formatter: function() {
                return this.value + ' %';
            }
        },
      },

      title: {
        text: 'Multiline Chart'
      },

      series: [{
        data: this.getRandomList(25, 30, 8),
        type: 'line',         // !IMPORTANT
        pointStart: Date.UTC(2022, 4, 5),
        pointInterval: 24 * 3600 * 1000,
      }, {
        data: this.getRandomList(25, 30, 8),
        type: 'line',         // !IMPORTANT
        color: '#F50',
        pointStart: Date.UTC(2022, 4, 5),
        pointInterval: 24 * 3600 * 1000,
      }, {
        data: this.getRandomList(25, 30, 8),
        type: 'line',         // !IMPORTANT
        pointStart: Date.UTC(2022, 4, 5),
        pointInterval: 24 * 3600 * 1000,
      }]
  });
  }

  private createColumnChart() {
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: 'column',
        type: 'column'
      },
      title: {
        text: 'Column Chart'
    },
    xAxis: {
        title: {
            text: 'xAxis'
        },
        tickInterval: 1
    },
    yAxis: {
        title: {
            text: 'yAxis'
        },
        labels: {
          formatter: function() {
              return this.value + ' %';
          }
        },
        tickInterval: 5
    },
    series: [{
        name: 'Jane',
        type: 'column',
        data: this.getRandomList(25, 30, 8)
    }, {
        name: 'John',
        type: 'column',
        data: this.getRandomList(25, 30, 8)
    }],})
}


private createBubbleChart() {
  var chart = new Highcharts.Chart({

    chart: {
        type: 'bubble',
        renderTo: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {

      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 100,

      bubbleLegend: {
          enabled: true,
          minSize: 20,
          maxSize: 60,
          ranges: [{
              value: 14
          }, {
              value: 89
          }]
      }
  },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
            '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
            '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
            '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        type: 'bubble',
        minSize: 40,
        maxSize: 80,
        data: [
            { x: 95, y: 95, z: 13, name: 'BE'},
            { x: 86.5, y: 102.9, z: 14.7, name: 'DE'},
            { x: 80.8, y: 91.5, z: 15.8, name: 'FI' },
            { x: 80.4, y: 102.5, z: 12, name: 'NL' },
            { x: 80.3, y: 86.1, z: 11.8, name: 'SE' },
            { x: 78.4, y: 70.1, z: 16.6, name: 'ES' },
            { x: 74.2, y: 68.5, z: 14.5, name: 'FR'},
        ]
    }]

});}


  private createSolidgauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
        width: 200
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '160%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [this.getRandomNumber(0, 100)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);
  }

  private createChartPie(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 5; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Pie Chart',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        pointFormat: '<span>Amount: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);
  }

  ngOnInit(): void {
    this.createChartGauge();
    this.createLineChart();
    this.createColumnChart();
    this.createBubbleChart();
    this.createChartGauge();
    this.createChartPie();
    this.createSolidgauge()
  }

}
