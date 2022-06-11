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
  htmlToAddEx: any

  faCaretDown = faCaretDown;


  constructor(private personalReportDataService: PersonalReportDataService) { }

  private blob2base64 = (blob: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
});

// private options: any = {
//   chart: {},
//   xAxis: {
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ]
//   },
//   series: [{
//     data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//     type: 'column'
//   }]
// }
// private data = {
//   options: JSON.stringify(this.options),
//   filename: 'test.png',
//   type: 'image/png',

// };

private async convertChartToImg(chart: any) {

  var data = {
    options: JSON.stringify(chart),
    filename: 'test.png',
    type: 'image/png',
    callback: 'C:\Users\diana\Documents\Hardskills-V2.14.2.5\Hardskills Admin Utility V2.14.2.5\Personal Report Data\resources\grouped-categories.js'

  };

    // Prepare POST data
    const body: any = new FormData();
    body.append('infile', data.options);
    // body.append('width', 550);


    // Post it to the export server
    const blob = await fetch('https://export.highcharts.com/', {
        body,
        method: 'post'
    }).then(result => result.blob());


    // Create the image
    const img: any = new Image();
    img.src = await this.blob2base64(blob);
    this.htmlToAdd = img.src;
    console.log(data.options)
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
    var chart = Highcharts.chart('bullet-graph1', {
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
    // this.convertChartToImg(chart.options)
    // console.log(chart.options)
  }

  isEven:any = (Math.ceil(30 / 3)) % 2 == 0;

  private getNegativeStackBar2(): void {
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
    this.convertChartToImg(chart.options)
    console.log(chart.options)
  }



  ngOnInit(): void {
    this.getBulletGraph()
    this.getNegativeStackBar2()
    this.personalChart2()
    this.getPersonalScore3()



    this.personalReportDataService.getTasks().subscribe((learner) => this.learner = learner)

  }
}
