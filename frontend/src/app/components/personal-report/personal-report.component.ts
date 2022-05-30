import { Component, OnInit } from '@angular/core';
import { PersonalReportDataService } from '../../servises/personal-report-data.service'
import * as Highcharts from 'highcharts';
// import * as Bullet from 'highcharts/modules/bullet';
import Highchartsbullet from 'highcharts/modules/bullet';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-personal-report',
  templateUrl: './personal-report.component.html',
  styleUrls: ['./personal-report.component.sass']
})

export class PersonalReportComponent implements OnInit {
  learner?: any
  values!: any[]
  name?: string
  htmlToAdd: any

  faCaretDown = faCaretDown;


  constructor(private personalReportDataService: PersonalReportDataService) { }

  private blob2base64 = (blob: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
});

   data = {
  "title": {
    "text": "Chart image"
  },
  "xAxis": {
    "categories": ["Jan", "Feb", "Mar"]
  },
  "series": [{
    "data": [29.9, 71.5, 106.4]
  }]
}

  private convertChartToImg(chart: any): void {
    console.log(this.data)
    // Prepare POST data
    const body: any = new FormData();
    body.append('infile', this.data);
    body.append('width', 550);


    // Post it to the export server
    const blob = fetch('https://export.highcharts.com/', {
        body,
        method: 'post'
    }).then(result => result.blob());
    console.log(blob)


    // Create the image
    const img: any = new Image();
    img.src = this.blob2base64(blob);
    this.htmlToAdd = img;
    console.log(this.blob2base64(blob))
    // document.getElementById('container4').appendChild(img);
  }

  private getRandomList(min: number, max: number, length:number): any[] {
    const data: any[] = []
    for (let i = 0; i < length; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return data
  }

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

  y: number = Math.floor(Math.random()*100)
  target: number = Math.floor(Math.random()*100)


  private personalChart2(): void {

    var chart = Highcharts.chart('chart2', {
      chart: {
        type: 'column',
        // width: 800,
        height: 550,
      },

      title: {
        text: 'chart2'
      },
      xAxis:
        [
          {
           categories: [
             'Self-Awareness', 'Communication', 'Effective Meetings',
             'Self-Awareness', 'How to Say No', 'Effective Meetings',
             'Self-Awareness', 'Collaboration & Teamwork', 'Effective Meetings','Effective Meetings',
          ],
          alternateGridColor: '#fff2e8',
           labels: {
             y: 42,
             style: {
               fontSize: 11,
               color: 'grey',
               width: '80px'
             },
             overflow: "allow"
           },
           offset: 0,
         },
         {
          categories: [
            'Pre | Post', 'Pre | Post', 'Pre  Post',
            'Pre  Post', 'Pre  Post', 'Pre  Post',
            'Pre  Post', 'Pre  Post', 'Pre  Post', 'Pre  Post'
          ],
          linkedTo: 0,
          opposite: false,
          labels: {
            style: {
              fontSize: 11,
              color: 'grey'
            }
          },
          offset: 0
           },
         ],

      yAxis: {

        // allowDecimals: false,
        min: 0,
        max: 5,
        title: {
          text: ''
        },
        tickInterval: 1,
      },

      legend:{ enabled:false },

      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          pointPadding: 0.2,
        }
      },

      series: [
        {
        name: 'Gap to goal',
        data: this.getRandomList(1, 1, 10),
        stack: 'male',
        color: '#e3bc49'
      }, {
        name: 'Current Rating',
        data: this.getRandomList(2, 4, 10),
        stack: 'male',
        color: '#bab9b6'
      },
      {
        name: 'Gap to goal',
        data: this.getRandomList(1, 2, 10),
        stack: 'female',
        color: '#e3bc49'
      },
      {
        name: 'Increase in Rating',
        data: this.getRandomList(2, 4, 10),
        stack: 'female',
        color: '#7cba73'
      },
    ],
    }as any)
    this.convertChartToImg(chart)
  }

  private getBulletGraph(): void {
    Highchartsbullet(Highcharts)
    Highcharts.chart('bullet-graph1', {
      chart: {
        height: 93,
        width: 410,
        inverted: true,
        marginLeft: 135,
        type: 'bullet',
        marginTop: 40,
        innerHeight: 10
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['']
      },

      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 0,
        gridLineWidth: 0,
        plotBands: [{
          from: 0,
          to: 40,
          color: '#f09b46'
        }, {
          from: 40,
          to: 75,
          color: '#b7e08b'
        }, {
          from: 75,
          to: 100,
          color: '#74c26e'
        }],
        title: null,
        labels: {
          format: "{value}%",
          overflow: 'justify'
        },
      },
      legend:{ enabled:false },

      plotOptions: {
            series: {
              pointPadding: 0.25,
              borderWidth: 0,
              color: '#000',
              targetOptions: {
                width: '200%'
              }
            }
          },

          credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },

      series: [{
        data: [{
          y: this.y,
          target: this.target
        }],


      }],
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})'
      }
    }as any);
    console.log('y:', this.y, 'Target:', this.target)
  }

  isEven:any = (Math.ceil(30 / 3)) % 2 == 0;

  private getNegativeStackBar2(): void {
    console.log(this.getRandomList(65, 80, 31))
    var sub_categories = [
      'TEST','What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
      'What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
      'What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
      'What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
      'What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
      'What is communication, why its important', 'What is professionalism and how does it connect to high performance', 'How to communicate', 'What is professionalism and how does it connect to high performance', 'Why is self-awareness critical for every professional',
    ];

    var categories = [0, 1, 2,
    'test', '', '', 'How to Sell', '', '', 'Effective Meetings', '', '', 'Professionalism', '', '', 'Question+X', '', '', 'How to Sell', '',
     '', 'How to Sell', '', '', 'Effective Meetings', '', '', 'Professionalism',  '', '', 'How to Sell', '', '', 'Question+X', '', '',
    ]


    var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'negative-stack2',
          height: 1200,
          style: {
            fontFamily: 'Arial'
          },
          plotBackgroundColor: this.isEven ? '#EAEAEA' : 'white',
          zoomType: "xy",
          marginLeft: 450,
          type: "column",
          inverted: true,
          marginTop: -40
        },

        title: {
          text: null
        },

        xAxis: [

           {
            categories: sub_categories,
            labels: {
              align: "right",
              x: -20,
              padding: 80,
              y: 3,       //!VERY IMPORTANT
              style: {
                fontSize: 13,
                color: 'grey'
              }
            },
            // offset: 150,
          },
          {
              categories: categories,
              tickInterval: 3,
              alternateGridColor: this.isEven ? 'white' : '#EAEAEA',
              linkedTo: 0,
              opposite: false,
              labels: {
                x: -310,
                padding: 0.0,
                y: -35,
                align: 'center',
                style: {
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              },
              offset: 0
            },
          ],

        yAxis: {
          min: 0,
          max: 100,
          labels: {
            format: "{value}%",
            overflow: 'justify'
          },
        },

        plotOptions: {
          series: {
            pointWidth: 19,
            shadow: false,
            minPointLength: 14,
            borderWidth: 0
          },
          column: {
            stacking: 'normal'
          }
        },
        legend:{ enabled:false },

        credits: {
          enabled: false
        },

        series: [{
          data: this.generateSeries(30)
        },
        {
            data: this.getRandomList(65, 80, 30),
            type: 'spline',
            color: '#c9c5b7'
          },
      ],
      }as any);

    }


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


  private createChartGauge(): void {
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


  private getPersonalScore3(): void {

    var data: any[] = this.getRandomList(65, 80, 10)
    var chart = Highcharts.chart('box3', {
      chart: {
        type: 'column',
        height: 600
      },
      title: {
          text: 'getPersonalScore3'
      },
      accessibility: {
        announceNewData: {
            enabled: true
        }
    },

    xAxis:[
        {
          categories: data,
          labels: {
            format: '{value}%',
              y: -5,
              style: {
                fontSize: 12,
                fontWeight: 'bold',
                color: 'black'
              },
             overflow: "allow"
           },
           offset: 0,
         },
        {
          categories: [
            'Self-Awareness', 'Communication', 'Effective Meetings',
            'Self-Awareness', 'How to Say No', 'Effective Meetings',
            'Self-Awareness', 'Collaboration & Teamwork', 'Effective Meetings','Effective Meetings',
          ],
            linkedTo: 0,
            opposite: false,
            labels: {
              style: {
                fontSize: 11,
                color: 'grey'
              }
            },
            offset: 0
        },
      ],

    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 10,
        title: {
            text: 'Percent ( % )'
        },
    },

    legend:{ enabled:false },

    credits: {
      enabled: false
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            name: "Name",
            colorByPoint: true,
            data: this.generateSeries(),
        },

          {
            data: data,
            type: 'spline',         // !IMPORTANT
            color: '#c9c5b7',
          },

    ],
    }as any)
  }


  private getPersonalScore(): void {
    var chart = Highcharts.chart('box', {
      chart: {
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
    this.getBulletGraph()
    this.getNegativeStackBar2()
    this.getNegativeStackBar()
    this.createChartGauge()
    this.personalChart2()
    this.getPersonalScore3()
    this.getPersonalScore2()
    this.getPersonalScore()
    this.getPersonalScore1()
    this.personalReportDataService.getTasks().subscribe((learner) => this.learner = learner)

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



}



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
