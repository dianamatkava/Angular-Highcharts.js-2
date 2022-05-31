import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
  title='Highcharts'
  values!: any[]


  // METHODS
  private generateSeries(len=10): any {
    this.values = this.getRandomList(30, 100, len)
    var color: string = '#74c26e'
    var data = []
    var num: number = 0

    for (let value of this.values) {
      if (value < 40) {
        color = '#f2ce72'
      } else if (75 > value && value > 40) {
        color = '#b7e08b'
      } else {
        color = '#74c26e'
      }
      data.push({
        // x: this.values.indexOf(value),
        x: num,
        y: value,
        color: color,
        name: "Colaboration & Teamwork"
      })
      num += 1
    }
    return data
  }

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

  private createChartGauge1(): void {
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: 'chart2_02',
        type: 'column',
        width: 300
      },
      title: {
        text: 'Stacked column chart'
      },
      xAxis: {
        categories: ['pre', 'post','pre', 'post','pre', 'post',]
      },
      yAxis: {
        min: 1,
        max: 5,
        tickInterval: 1,
        title: {
          text: 'Total fruit consumption'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },

      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          pointPadding: 0.2,
          dataLabels: {
            enabled: true
          }
        }
      },

    series: [
      {
      name: 'Name1',
      data: [{
        x: 0,
        y: 1,

      }, {
        x: 1,
        y: 2,
        name: 'custom name',

      },{
        x: 2,
        y: 1
      }, {
        x: 3,
        y: 1
      }]

    }, {
      name: 'Name2',
      data: [{
        x: 0,
        y: 3,
        color: 'grey',
      }, {
        x: 1,
        y: 3,
        color: 'green'
      },{
        x: 2,
        y: 3
      }, {
        x: 3,
        y: 3,
        color: 'green',
      }]
    },
  ]


  }as any)}


  private createChartGauge2(): void {
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
private getNegativeStackBar(): void {
    var categories = [
      'Question+X', 'Question+X', 'Question+X', 'Question+X', 'Question+X',
      'Question+X', 'Question+X', 'Question+X', 'Question+X', 'Question+X',
      'Question+X', 'Question+X', 'Question+X', 'Question+X', 'Question+X',
      'Question+X', 'Question+X', 'Question4', 'Question3', 'Question2',
      'Question+X is very very long and takes even two lines',
    ];

    var chart = new Highcharts.Chart({
      chart: {
        renderTo: 'negative-stack',
        type: 'bar',
        marginLeft: 450,
      },

      title: {
        text: 'getNegativeStackBar'
      },

      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
        }
      },
      xAxis: [{
        categories: categories,
        // alternateGridColor: '#fff2e8',
        reversed: false,
        labels: {
          step: 1
        },
        accessibility: {
          description: 'Age (male)'
        }
      }, { // mirror axis on right side
        opposite: false,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 6
        },
        accessibility: {
          description: 'Age (female)'
        }
      }],

      yAxis: {
        min: 0,
        max: 5,
        title: {
          text: null
        },
        labels: {
          distance: -225
        }
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [
      //   {
      //   name: 'Question',
      //   // color: 'white',
      //   data: [
      //     'text', 'text', 'text', 'text',
      //     'text', 'text', 'text', 'text',
      //     'text', 'text', 'text', 'text',
      //     'text', 'text', 'text', 'text',
      //     'text', 'text', 'text', 'text',
      //     // -3.0,
      //   ]
      // },
       {
        name: 'Value',
        data: [
          2.1, 2.0, 2.1, 2.3, 2.6,
          2.9, 3.2, 3.1, 2.9, 3.4,
          4.3, 4.0, 3.5, 2.9, 2.5,
          2.7, 2.2, 1.1, 1.6, 1.2,
          2.7, 2.2, 1.1, 1.6, 2.2,
        ]
      }
    ]
    }as any)
  }

private getPersonalScore(): void {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: 'box',
      type: 'column'
  },
  title: {
      text: 'getPersonalScore'
  },
  xAxis: {
    labels: {
      style: {
        fontSize: '8px',
        color: 'grey'
      }
    },

    categories: [
      "Self-Awareness",
      "sa",
      "cmm",
      "tm",
      "hts",
      "Ho to Say NO",
      "em",
      "cs",
      "pa",
      "pr",
      "Colaboration & Teamwork"
    ],
    crosshair: true
  },

  yAxis: {
      min: 0,
      max: 100,
      title: {
          text: 'Rainfall (mm)'
      },
      tickInterval: 10

  },

  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  scrollbar: {
  enabled: true
  },
  series: [ {
      color: '#54964d',
      name: 'Above 75%',
      data: this.generateSeries()
    },]
    }as any)
}



private getPersonalScore2(): void {
  var chart = Highcharts.chart('box2', {
    chart: {
      type: 'column'
  },
  title: {
      text: 'getPersonalScore2'
  },
  xAxis: {
    labels: {
      style: {
        fontSize: '8px',
        color: 'grey'
      }
    },

    categories: [
      "Self-Awareness",
      "sa",
      "cmm",
      "tm",
      "hts",
      "Ho to Say NO",
      "em",
      "cs",
      "pa",
      "pr",
      "Colaboration & Teamwork"
    ],
    crosshair: true
  },

  yAxis: {
      min: 0,
      max: 100,
      title: {
          text: 'Rainfall (mm)'
      },
      tickInterval: 10

  },

  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.0,
          borderWidth: 0
      }
  },
  scrollbar: {
  enabled: true
  },

  series: [ {
    color: '#54964d',
    name: 'Above 75%',
    data: [{
      x: 0,
      y: 80
    }, {
      x: 2,
      y: 95
    },{
      x: 3,
      y: 93
    }, {
      x: 4,
      y: 95
    }]
  },
  {
    color: '#f50',
    name: '65%',
    data: [{
      x: 1,
      y: 90
    }, {
      x: 5,
      y: 95
    },{
      x: 6,
      y: 93
    }]
  },
]
    }as any)}


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


  //NOT WIRKING
  private getPersonalScore1(): void {
    var chart = Highcharts.chart('bullet', {

      chart: {
        type: 'bullet',
        width: 1200
      },

      series: [{
            type : 'bullet',
            data : [{
                y : 20,     // The value of a point
                target: 50  // The target value of a point
            }],
            targetOptions: { // Options related with look and position of targets
                width: '140%',        // The width of the target
                height: 3,            // The height of the target
                borderWidth: 0,       // The border width of the target
                borderColor: 'black', // The border color of the target
                color: 'black'        // The color of the target
            }
        }]
      } as any);
  }

  ngOnInit(): void {
    this.createLineChart();
    this.createColumnChart();
    this.createBubbleChart();
    this.createChartGauge2();
    this.createChartPie();
    this.createSolidgauge(),
    this.createChartGauge1(),
    this.getPersonalScore1(),
    this.getPersonalScore2(),
    this.getPersonalScore(),
    this.getNegativeStackBar()
  }
}



  // private apiUrl = 'http://127.0.0.1:8000'
  // private headers = {
  //   headers:
  //     new HttpHeaders(
  //       {
  //         'X-Requested-With': 'XMLHttpRequest',
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Content-Type',
  //         'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //       }
  //     )
  // }


  // constructor(private http: HttpClient) {
  //   this.http.get(this.apiUrl, this.headers).subscribe(
  //     data => {console.log(data)}
  //   )
  // }

  // tasks?: any[]

  // ngOnInit(): void {
  // }



// }



// highchart example
//https://www.highcharts.com/demo/bullet-graph

// private getPersonalScore(): void {
//   const chart = new Highcharts.Chart({
//     chart: {
//       renderTo: 'personal-score',
//       inverted: true,
//       marginLeft: 135,
//       type: 'bullet',

//     },

//     // title: {
//     //   text: null
//     // },

//     legend: {
//         enabled: false
//     },
//     yAxis: {
//         gridLineWidth: 0
//     },
//     plotOptions: {
//       type: 'bullet',
//         series: {
//             pointPadding: 1,
//             borderWidth: 0,
//             color: '#000',
//             targetOptions: {
//                 width: '200%'
//             }
//           }
//         },

//     credits: {
//         enabled: false
//     },
//     exporting: {
//         enabled: false
//     }
//   })}
