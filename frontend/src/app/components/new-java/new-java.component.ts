import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

import xrange from "highcharts/modules/xrange";


declare var require: any;
var Highcharts_ = require('highcharts'),
    HighchartsGroupedCategories = require('highcharts-grouped-categories')(Highcharts);

Exporting(Highcharts);
xrange(Highcharts);

@Component({
  selector: 'app-new-java',
  templateUrl: './new-java.component.html',
  styleUrls: ['./new-java.component.sass']
})
export class NewJavaComponent implements OnInit {
  values!: any[];
  htmlToAdd: any;
  isEven:any = (Math.ceil(30 / 3)) % 2 == 0;

  private blob2base64 = (blob: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  private async convertChartToImg(chart: any) {

    var data = {
      options: JSON.stringify(chart),
      filename: 'test.png',
      type: 'image/png',

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


  constructor() { }

  public functionPlotBandVertical(chart: any) {
    var plotBands = chart.xAxis[0].plotLinesAndBands;
    for (var i in plotBands) {
      var d = plotBands[i].svgElem.d;
      var dArray = d.split(' ');
      var rect = {x: dArray[1], y: dArray[5], width: 100.5, height: 80};
      if (parseFloat(i) % 2 != 0) {
        console.log(i)
        chart.renderer.rect(rect.x, rect.y, rect.width, rect.height).attr({fill: '#FFF8E4'}).add();
      }
    }
  }

  public functionPlotBandHorizontal(chart: any) {
				var plotBands = chart.xAxis[0].plotLinesAndBands;
				for (var i in plotBands) {
					var d = plotBands[i].svgElem.d;
					var dArray = d.split(' ');
					var rect = {x: 25, y: dArray[5], width: 700, height: 105};
					if (parseFloat(i) % 2 != 0) {
						chart.renderer.rect(rect.x, rect.y, rect.width, rect.height).attr({fill: '#FFF8E4'}).add();
					}
        }
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



  private personalChart1(): void {

    var chart = Highcharts.chart('chart1', {

      chart: {
        type: 'column',
        width: 900,
		    height: 580,
    },
    title: {
        text: ''
    },
    xAxis: {
			categories: ["Self-<br>Awareness", "Communication", "Time<br>Management", "How to Sell", "How to Say<br>No", "Effective<br>Meetings", "Critical<br>Thinking", "Planning<br>& Agility", "Professionalism", "Collaboration<br>& Teamwork"],
    		labels: {
       		style: {
        		fontFamily: 'Arial',
          		color: '#787878',
          		fontSize: '12px',
          		textOverflow: 'none'
        	}
      	},
		tickWidth: 0,
    	lineWidth: 0
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: 'Percent (%)',
            style: {
				fontFamily: 'Arial',
				fontSize: '16px',
				color: '#787878'
			}
        },
        labels: {
          style: {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#787878'
          }
        },
		tickWidth: 0,
        gridLineColor: '#e7e6e6'
    },
    credits: false,
    plotOptions: {
		series: {
			grouping: false,
			lineWidth: 2,
			marker: {
				radius: 7,
			}
        },
        column: {
            pointPadding: 0.1,
            borderWidth: 0,
            zones: [{
                value: 40,
                color: '#f08c4a'
            },{
				value: 75,
                color: '#92d050'
            }, {
                color: '#00b050'
            }],
            dataLabels: {
                enabled: true,
                inside: true,
                verticalAlign:'bottom',
                style: {
                  fontFamily: 'Arial',
                  fontSize: '16px',
                  textOutline: false,
                  color: 'black',
                  fontWeight: 'notBold'
                },
                format: "{y}%"
            }
        }
    },
    legend: {
        symbolHeight: 14,
        symbolWidth: 14,
        itemStyle: {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#787878',
          fontWeight: 'asd'
        }
    },
    series: [{
        type: 'column',
        name: 'Above 75%',
        data: this.getRandomList(40, 100, 10),
        color: '#00b050'
      },
      {
        type: 'column',
        name: 'Above 40%',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: '#92d050'
      }, {
      	type: 'column',
      	name: 'Below 40%',
        color: '#f08c4a'
      }, {
      	type: 'spline',
        name: 'Cohort Average',
        data: this.getRandomList(40, 100, 10),
        color: '#cccccc'
      }
   ],
   exporting: {
		sourceWidth: 1430,
		sourceHeight: 880,
		scale: 1,
		enabled: false
  }

    } as any)
    this.convertChartToImg(chart.options)
  }



  private personalChart2(): void {

    var chart = Highcharts.chart('chart2', {

      chart: {
        type: 'bar',
        width: 934,
	  	  height: 1160
    },
    title: {
        text: ''
    },
    xAxis: {
        tickWidth:0,
        categories: [ {
        	name: "<b>Self-Awareness</b>",
          categories: ["Why self-awareness is critical to<br/>every professional", "How to be more self-aware", "Why a global awareness is so important"],
        }, {
        	name: "<b>Communication</b>",
          categories: ["What is communication, why it's important", "How to communicate", "Effective written communcation"]
        }, {
        	name: "<b>Time</b><br/><b>Management</b>",
          categories: ["Awareness of time management, why it's necessary", "Understanding prioritization", "How to manage interruptions"]
        }, {
        	name: "<b>How to Sell</b>",
          categories: ["What is sales and how to sell", "The sales process, and why all team<br/>members need to understand it", "How to close sales and deal with objections"]
        }, {
        	name: "<b>How to say no</b>",
          categories: ["Why it's important to be able to say no", "How to say no", "What saying no means for a professional"]
        }, {
        	name: "<b>Effective</b><br/><b>Meetings</b>",
          categories: ["Why meetings go wrong", "Rules of engagement during meetings", "How to prepare for a meeting and<br/>follow-up after one"]
        }, {
        	name: "<b>Critical Thinking</b>",
          categories: ["Why critical thinking is important", "How to apply critical thinking", "Situational awareness and applying<br/>critical thinking in real time"]
        }, {
        	name: "<b>Planning &</b><br/><b>Agility</b>",
          categories: ["Why planning and agility are important", "Understanding plans are nothing,<br/>planning is everything & how to plan", "How to implement agility in an organization"]
        }, {
        	name: "<b>Professionalism</b>",
          categories: ["What is professionalism", "Understanding and applying attention<br/>to detail and ownership", "Understanding and applying initiative"]
        }, {
        	name: "<b>Collaboration &</b><br/><b>Teamwork</b>",
          categories: ["What is collaboration and teamwork<br/>& what makes a good team player", "How to be a collaborative team member", "Understanding affinity bias and<br/>the importance of inclusion"]
        }],
        labels: {
        	rotation: 0,
          style: {
            fontFamily: 'Arial',
            fontSize: '14px',
            overflow: 'justify',
            textOverflow: 'none',
          }
        },

        plotBands:[{"color":"#ffffff","from":-1,"to":2.5},{"color":"#FFF8E4","from":2.5,"to":5.5},{"color":"#ffffff","from":5.5,"to":8.5},{"color":"#FFF8E4","from":8.5,"to":11.5},{"color":"#ffffff","from":11.5,"to":14.5},{"color":"#FFF8E4","from":14.5,"to":17.5},{"color":"#ffffff","from":17.5,"to":20.5}, {"color":"#FFF8E4","from":20.5,"to":23.5},{"color":"#ffffff","from":23.5,"to":26.5}, {"color":"#FFF8E4","from":26.5,"to":29.5}]
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: 'Percent (%)',
            style: {
			    	fontFamily: 'Arial',
          	fontSize: '14px'
          	}
        },
        labels: {
			style: {
				fontFamily: 'Arial',
          		fontSize: '14px'
			}
        }
    },
    credits: false,
    plotOptions: {
      series: {
        borderWidth: 0,
        stacking: 'normal'
        },
        bar: {
        zones: [{
          value: 40,
          color: '#f08c4a'
        },{
          value: 75,
          color: '#92d050'
        }, {
          color: '#00b050'
        }]
        }
    },
    legend: {
        symbolHeight: 16,
        symbolWidth: 16,
        itemStyle: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#787878',
          fontWeight: 'asd'
        }
    },
    series: [{
        type: 'bar',
        name: 'Above 75%',
        data: this.getRandomList(60, 100, 30),
        color: '#00b050'
      }, {
    		id: '1',
        type: 'bar',
        name: 'Above 40%',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: '#92d050'
      }, {
        type: 'column',
        idOfLinkedSeries: '1',
        name: 'Below 40%',
        color: '#f08c4a'
      }, {
        type: 'spline',
        name: 'Cohort Average',
        data: this.getRandomList(60, 100, 30),
        color: '#cccccc'
      }
   ],
   exporting: {
		sourceWidth: 934,
		sourceHeight: 1160,
		scale: 1,
		enabled: false
   }

    } as any)
    this.functionPlotBandHorizontal(chart)
  }




  private personalChart3(): void {
    var chart = Highcharts.chart('chart3', {

      chart: {
        type: 'column',
        height: 600,
    },
    title: {
        text: ''
    },
    xAxis: {
        tickWidth:0,
        categories: [ {
        	name: "Self-<br/>Awareness",
          categories: ["Pre", "Post"]
        }, {
        	name: "Communication",
          categories: ["Pre", "Post"]
        }, {
        	name: "Time<br/>Management",
          categories: ["Pre", "Post"]
        }, {
        	name: "How to Sell",
          categories: ["Pre", "Post"]
        }, {
        	name: "How to Say<br/>No",
          categories: ["Pre", "Post"]
        }, {
        	name: "Effective<br/>Meetings",
          categories: ["Pre", "Post"]
        }, {
        	name: "Critical<br/>Thinking",
          categories: ["Pre", "Post"]
        }, {
        	name: "Planning<br/>& Agility",
          categories: ["Pre", "Post"]
        }, {
        	name: "Professionalism",
          categories: ["Pre", "Post"]
        }, {
        	name: "Collaboration<br/>& Teamwork",
          categories: ["Pre", "Post"]
        }],
        labels: {
			rotation: 0,
			style: {
				fontFamily: 'Arial',
          		color: '#787878',
				fontSize: '14px',
				textOverflow: 'none'
			}
        },
    	lineWidth: 0,
        plotBands:[{"color":"#ffffff","from":-0.5,"to":1.5},{"color":"#FFF8E4","from":1.5,"to":3.5},{"color":"#ffffff","from":3.5,"to":5.5},{"color":"#FFF8E4","from":5.5,"to":7.5},{"color":"#ffffff","from":7.5,"to":9.5},{"color":"#FFF8E4","from":9.5,"to":11.5},{"color":"#ffffff","from":11.5,"to":13.5},{"color":"#FFF8E4","from":13.5,"to":15.5},{"color":"#ffffff","from":15.5,"to":17.5},{"color":"#FFF8E4","from":17.5,"to":19.5}]
    },
    yAxis: {
        min: 0,
        max: 5,
        title: {
            text: ''
        },
        labels: {
			style: {
				fontFamily: 'Arial',
				color: '#787878',
				fontSize: '14px',
				textOverflow: 'none'
			}
        },
        allowDecimals: false,
        gridLineColor: '#e7e6e6'
    },
    credits: false,
    plotOptions: {
		series: {
			stacking: 'normal',
			borderWidth: 0
        }
    },
    legend: {
        symbolHeight: 16,
        symbolWidth: 16,
		itemStyle: {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: '#787878',
			fontWeight: 'asd'
        },
		reversed: true
    },
    series: [
    	{
      	type: 'column',
      	name: 'Gap to Goal',
        data: [1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        color: '#edc17c'
      }, {
      	type: 'column',
      	name: 'Increase in Self Rating',
        data: [0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 0],
        color: '#00b050'
      }, {
      	type: 'column',
      	name: 'Drop in Self Rating',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: '#92d050'
      }, {
    		id: '1',
        type: 'column',
        name: 'Current Rating',
        data: [4, 0, 3, 0, 4, 0, 4, 0, 3, 0, 3, 0, 4, 0, 4, 0, 4, 0, 5, 5],
        color: '#cccccc'
		}
	],
	exporting: {
		sourceWidth: 1060,
		sourceHeight: 720,
		scale: 1,
		enabled: false
	}

    } as any)
    this.functionPlotBandVertical(chart)
  }



  private personalChart4(): void {
    var chart = Highcharts.chart('chart4', {

      chart: {
        type: 'xrange',
        width: 500,
        height: 150,
        marginLeft: 0,
        marginRight: 20
      },
      xAxis: {
        min: 0,
        max: 100,
        labels: {
          enabled: false,
          format: '{x}%'
        },
        tickInterval: 100,
        visible: false
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      title: {
      text:''
    },
      plotOptions: {
          xrange: {
            borderWidth: 0,
            grouping: false,
            dataLabels: {
                style: {
                    fontSize: 16,
                    fontFamily: 'Arial',
                    textOutline: false,
                    color: '#787878'
                }
            }
          }
      },
    legend: {
          y: 400
    },
    credits: false,
      series: [{
        name: 'series 1',
        borderRadius: 0,
        pointWidth: 30,
        data: [{
          x: 0,
          x2: 40,
          y: 0,
          color: '#f08c4a'
        }, {
          x: 40,
          x2: 75,
          y: 0,
          color: '#92d050',
          dataLabels: {
            enabled: false
          }
        }, {
          x: 75,
          x2: 100,
          y: 0,
          color: '#00b050',
          dataLabels: {
            enabled: true,
            y: 45,
            formatter: function() {
              return '';
            }
          }
        }]
         }, {
          name: 'series 2',
          borderRadius: 1,
          pointWidth: 12,
          data: [{
            x: 0,
            x2: 76,
            y: 0,
            color: 'black',
            dataLabels: {
              enabled: true,
              radius: 10,
               align: "right",
              y: -45,
              formatter: function() {
                return '';
              }
            }
          }]
         }],
    exporting: {
      sourceWidth: 500,
      sourceHeight: 150,
      scale: 1,
      enabled: false
     }

    } as any)
    this.functionXRange(chart)
  }

  public functionXRange(chart: any) {
		var cohortAverage = 65;
		var yourScore = 76;
        var series = chart.series[0],
                xAxis = chart.xAxis[0],
                dataLabel = series.data[2].dataLabel,
                triangle1Size,
                triangle1X,
                triangle1Y,
                triangle1,
                lineX,
                lineY,
                lineHeight,
                line,
                labelX,
                labelX2;

          triangle1Size = 12;
          triangle1X = cohortAverage * 5 - triangle1Size - cohortAverage / 5;
          triangle1Y = dataLabel.y + chart.plotTop + 1;

          lineX = triangle1X + 12;
          lineY = triangle1Y - 56;
          lineHeight = series.itemHeight + 14;


          triangle1 = chart.renderer.path([
                'M',
                triangle1X,
                triangle1Y,
                triangle1X + triangle1Size,
                triangle1Y - triangle1Size - 15,
                triangle1X + 2 * triangle1Size,
                triangle1Y,
                'z'])
          .attr({
                fill: '#787878'
          })
          .add();

          line = chart.renderer.path(['M', lineX, lineY, 'v', lineHeight]).attr({
                stroke: '#787878',
                'stroke-width': '4px'
          }).add();

          line.toFront();
          triangle1.toFront();


          labelX = series.data[1].x;
          labelX2 = series.data[1].x2;

          if (cohortAverage <= 83 && cohortAverage >= 9) {
            chart.renderer.text('Cohort Average', lineX - 104, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          } else if (cohortAverage <= 8) {
            chart.renderer.text('Cohort Average', chart.plotLeft, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          } else {
            chart.renderer.text('Cohort Average', 295, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          }



          var series2 = chart.series[1],
                xAxis2 = chart.xAxis[0],
                dataLabel2 = series2.data[0].dataLabel,
                triangle2Size,
                triangle2X,
                triangle2Y,
                triangle2;

          triangle2Size = 12;
          triangle2X = series2.data[0].x2 * 5 - triangle2Size - yourScore / 5;
          triangle2Y = dataLabel2.y + chart.plotTop + 18;


          triangle2 = chart.renderer.path([
            'M',
            triangle2X, // Define where the box starts (for x)
            triangle2Y,	// Define where the box starts (for y)
            triangle2X + triangle2Size,	// First point of shape
            triangle2Y + triangle2Size + 15,	// Second point of shape
            triangle2X + 2 * triangle2Size,	// Third point of shape
            triangle2Y,
            'z'])
            .attr({
            fill: 'black'
          }).add();
          triangle2.toFront();

          if (series2.data[0].x2 <= 89 && series2.data[0].x2 >= 9) {
            chart.renderer.text('Your Score', triangle2X - 60, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          } else if (series2.data[0].x2 <= 8) {
            chart.renderer.text('Your Score', chart.plotLeft, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          } else {
            chart.renderer.text('Your Score', 357, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          }


          var minPercentageText = chart.renderer.text('0%', chart.plotLeft, triangle2Y + 70).css({
            'font-size': '24px',
            'font-family': 'Arial',
            'color': '#787878'
          }).add();

          var maxPercentageText = chart.renderer.text('100%', 440, triangle2Y + 70).css({
            'font-size': '24px',
            'font-family': 'Arial',
            'color': '#787878'
          }).add();
  }





  // private personalChart1_7(): void {

  //   var chart = Highcharts.chart('chart1_7', {

  //       chart: {
  //           type: 'column'
  //       },
  //       title: {
  //           text: ''
  //       },
  //       xAxis: {
  //         categories: ["Self-<br>Awareness", "Communication", "Time<br>Management", "How to Sell", "How to Say<br>No", "Effective<br>Meetings", "Critical<br>Thinking"],
  //           labels: {
  //              style: {
  //               fontFamily: 'Arial',
  //                 color: '#787878',
  //                 fontSize: '24px',
  //                 textOverflow: 'none'
  //             }
  //           },
  //       tickWidth: 0,
  //         lineWidth: 0
  //       },
  //       yAxis: {
  //           min: 0,
  //           max: 100,
  //           title: {
  //               text: 'Percent (%)',
  //               style: {
  //           fontFamily: 'Arial',
  //           fontSize: '24px',
  //           color: '#787878'
  //         }
  //           },
  //           labels: {
  //         style: {
  //           fontFamily: 'Arial',
  //           fontSize: '24px',
  //           color: '#787878'
  //         }
  //           },
  //       tickWidth: 0,
  //           gridLineColor: '#e7e6e6'
  //       },
  //       credits: false,
  //       plotOptions: {
  //       series: {
  //         grouping: false,
  //         lineWidth: 4,
  //         marker: {
  //           radius: 7
  //         }
  //           },
  //           column: {
  //               zones: [{
  //                   value: 39,
  //                   color: '#f08c4a'
  //               },{
  //           value: 75,
  //                   color: '#92d050'
  //               }, {
  //                   color: '#00b050'
  //               }],
  //               dataLabels: {
  //                   enabled: true,
  //                   inside: true,
  //                   verticalAlign:'bottom',
  //                   style: {
  //             fontFamily: 'Arial',
  //             fontSize: '24px',
  //                       textOutline: false,
  //                       color: 'black',
  //                       fontWeight: 'notBold'
  //                   },
  //                   format: "{y}%",
  //                   // formatter:function(): any {
  //                   //     return "{y}%";
  //                   // }
  //               }
  //           }
  //       },
  //       legend: {
  //           symbolHeight: 24,
  //           symbolWidth: 24,
  //       itemStyle: {
  //         fontFamily: 'Arial',
  //         fontSize: '28px',
  //         color: '#787878',
  //         fontWeight: 'asd'
  //           }
  //       },
  //       series: [{
  //           type: 'column',
  //           name: 'Above 75%',
  //           data: this.getRandomList(40, 100, 7),
  //           color: '#00b050'
  //         }, {
  //           type: 'column',
  //           name: 'Above 40%',
  //           data: [0, 0, 0, 0, 0, 0, 0],
  //           color: '#92d050'
  //         }, {
  //           type: 'column',
  //           name: 'Below 40%',
  //           color: '#f08c4a'
  //         }, {
  //           type: 'spline',
  //           name: 'Cohort Average',
  //           data: this.getRandomList(40, 100, 7),
  //           color: '#cccccc'
  //         }
  //      ],
  //      exporting: {
  //       sourceWidth: 1430,
  //       sourceHeight: 880,
  //       scale: 1,
  //       enabled: false
  //      }

  //   } as any)
  // }


  // public personalChart2_7(): void {


  //   var chart = Highcharts.chart('chart2_7', {
  //     chart: {
  //       type: 'bar',
  //       // "events":{
  //       //   "load": function() {
  //       //     var plotBands = this.xAxis[0].plotLinesAndBands;
  //       //     for (var i in plotBands) {
  //       //       var d = plotBands[i].svgElem.d;
  //       //       var dArray = d.split(' ');
  //       //       var rect = {x: 25, y: dArray[5], width: 700, height: 139};
  //       //       if (i % 2 != 0) {
  //       //         this.renderer.rect(rect.x, rect.y, rect.width, rect.height).attr({fill: '#FFF8E4'}).add();
  //       //       }
  //       //     }
  //       //   }
  //       // }
  //   },
  //   title: {
  //       text: ''
  //   },
  //   xAxis: {
  //       // categories: [ {
  //       	// name: "<b>Self-Awareness</b>",
  //         // categories: ["Why self-awareness critical to every professional", "How to be more self-aware", "Why a global awareness is so important"]
  //       // }],
  //       // {
  //       // 	name: "<b>Communication</b>",
  //       //   categories: ["What is communication, why it's important", "How to communicate", "Effective written communcation"]
  //       // }, {
  //       // 	name: "<b>Time Management</b>",
  //       //   categories: ["Awareness of time management, why it's necessary", "Understanding prioritization", "How to manage interruptions"]
  //       // }, {
  //       // 	name: "<b>How to Sell</b>",
  //       //   categories: ["What is sales and how to sell", "The sales process, and why all<br/>team members need to understand it", "How to close sales and deal with objections"]
  //       // }, {
  //       // 	name: "<b>How to say no</b>",
  //       //   categories: ["Why it's important to be able to say no", "How to say no", "What saying no means for a professional"]
  //       // }, {
  //       // 	name: "<b>Effective Meetings</b>",
  //       //   categories: ["Why meetings go wrong", "Rules of engagement during meetings", "How to prepare for a meeting and<br/>follow-up after one"]
  //       // }, {
  //       // 	name: "<b>Critical Thinking</b>",
  //       //   categories: ["Why critical thinking is important", "How to apply critical thinking", "Situational awareness and<br/>applying critical thinking in real time"]
  //       // }],

  //       labels: {
  //       	rotation: 0,
	// 		style: {
	// 			fontFamily: 'Arial',
	// 			fontSize: '14px',
	// 			overflow: 'justify',
	// 			textOverflow: 'none'
	// 		}
  //       },
  //       "plotBands":[{"color":"#ffffff","from":-1,"to":2.5},{"color":"#FFF8E4","from":2.5,"to":5.5},{"color":"#ffffff","from":5.5,"to":8.5},{"color":"#FFF8E4","from":8.5,"to":11.5},{"color":"#ffffff","from":11.5,"to":14.5},{"color":"#FFF8E4","from":14.5,"to":17.5},{"color":"#ffffff","from":17.5,"to":20.5}]
  //   },

  //   yAxis: {
  //       min: 0,
  //       max: 100,
  //       title: {
  //           text: 'Percent (%)',
  //           style: {
	// 			fontFamily: 'Arial',
  //         		fontSize: '14px'
  //         	}
  //       },
  //       labels: {
	// 		style: {
	// 			fontFamily: 'Arial',
  //         		fontSize: '14px'
	// 		}
  //       }
  //   },
  //   credits: false,
  //   plotOptions: {
	// 	series: {
  //           borderWidth: 0,
	// 		stacking: 'normal'
	// 	},
  //       bar: {
	// 		zones: [{
	// 			value: 39,
	// 			color: '#f08c4a'
	// 		},{
	// 			value: 75,
	// 			color: '#92d050'
	// 		}, {
	// 			color: '#00b050'
	// 		}]
  //       }
  //   },
  //   legend: {
  //       symbolHeight: 16,
  //       symbolWidth: 16,
	// 	itemStyle: {
	// 		fontFamily: 'Arial',
	// 		fontSize: '16px',
	// 		color: '#787878',
	// 		fontWeight: 'asd'
	// 	}
  //   },
  //   series: [{
  //       type: 'bar',
  //       name: 'Above 75%',
  //       data: this.getRandomList(60, 100, 24),
  //       color: '#00b050'
  //     }, {
  //   		id: '1',
  //       type: 'bar',
  //       name: 'Above 40%',
  //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	color: '#92d050'
  //     }, {
  //     	type: 'column',
  //     	idOfLinkedSeries: '1',
  //     	name: 'Below 40%',
	// 	color: '#f08c4a'
  //     }, {
  //     	type: 'spline',
  //       name: 'Cohort Average',
  //       data: this.getRandomList(70, 100, 24),
	// 	color: '#cccccc'
  //     }
  //  ],
  //  exporting: {
	// 	sourceWidth: 934,
	// 	sourceHeight: 1080,
	// 	scale: 1,
	// 	enabled: false
  //  }

  //   } as any)
  // }


  // public personalChart3_7(): void {


  //   var chart = Highcharts.chart('chart3_7', {
  //     chart: {
  //       type: 'column',
  //       // "events":{
  //       // 	"load": function() {
  //       //     var plotBands = this.xAxis[0].plotLinesAndBands;
  //       //     for (var i in plotBands) {
  //       //       var d = plotBands[i].svgElem.d;
  //       //       var dArray = d.split(' ');
  //       //       var rect = {x: dArray[1], y: dArray[5], width: 146, height: 85};
  //       //       if (i % 2 != 0) {
  //       //         this.renderer.rect(rect.x, rect.y, rect.width, rect.height).attr({fill: '#FFF8E4'}).add();
  //       //       }
  //       //     }
  //   	  //   }
  //     	// }
  //   },
  //   title: {
  //       text: ''
  //   },
  //   xAxis: {
  //       categories: [ {
  //       	name: "Self-<br/>Awareness",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "Communication",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "Time<br/>Management",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "How to Sell",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "How to Say<br/>No",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "Effective<br/>Meetings",
  //         categories: ["Pre", "Post"]
  //       }, {
  //       	name: "Critical<br/>Thinking",
  //         categories: ["Pre", "Post"]
  //       }],
  //       labels: {
	// 		rotation: 0,
	// 		style: {
	// 			fontFamily: 'Arial',
  //         		color: '#787878',
	// 			fontSize: '16px',
	// 			textOverflow: 'none'
	// 		}
  //       },
  //   	lineWidth: 0,
  //       "plotBands":[{"color":"#ffffff","from":-0.5,"to":1.5},{"color":"#FFF8E4","from":1.5,"to":3.5},{"color":"#ffffff","from":3.5,"to":5.5},{"color":"#FFF8E4","from":5.5,"to":7.5},{"color":"#ffffff","from":7.5,"to":9.5},{"color":"#FFF8E4","from":9.5,"to":11.5},{"color":"#ffffff","from":11.5,"to":13.5}]
  //   },
  //   yAxis: {
  //       min: 0,
  //       max: 5,
  //       title: {
  //           text: ''
  //       },
  //       labels: {
	// 		style: {
	// 			fontFamily: 'Arial',
	// 			color: '#787878',
	// 			fontSize: '16px',
	// 			textOverflow: 'none'
	// 		}
  //       },
  //       allowDecimals: false,
  //       gridLineColor: '#e7e6e6'
  //   },
  //   credits: false,
  //   plotOptions: {
	// 	series: {
	// 		stacking: 'normal',
	// 		borderWidth: 0
  //       }
  //   },
  //   legend: {
  //       symbolHeight: 16,
  //       symbolWidth: 16,
	// 	itemStyle: {
	// 		fontFamily: 'Arial',
	// 		fontSize: '16px',
	// 		color: '#787878',
	// 		fontWeight: 'asd'
  //       },
	// 	reversed: true
  //   },
  //   series: [
  //   	{
  //     	type: 'column',
  //     	name: 'Gap to Goal',
  //       data: this.getRandomList(1, 1, 14),
  //       color: '#edc17c'
  //     }, {
  //     	type: 'column',
  //     	name: 'Increase in Self Rating',
  //       data: this.getRandomList(2, 3, 14),
  //       color: '#00b050'
  //     }, {
  //     	type: 'column',
  //     	name: 'Drop in Self Rating',
  //       data: this.getRandomList(1, 2, 14),
  //       color: '#92d050'
  //     }, {
  //   		id: '1',
  //       type: 'column',
  //       name: 'Current Rating',
  //       data: this.getRandomList(3, 4, 14),
  //       color: '#cccccc'
	// 	}
	// ],
	// exporting: {
  //  		sourceWidth: 1060,
	// 	sourceHeight: 720,
	// 	scale: 1,
	// 	enabled: false
	// }

  //   } as any)
  // }

  // public personalChart4_7(): void {

  //   var chart = Highcharts.chart('chart4_7', {

  //       chart: {
  //         type: 'xrange',
  //         width: 500,
  //       height: 150,
  //         marginLeft: 0,
  //         marginRight: 20
  //       },
  //       xAxis: {
  //         min: 0,
  //         max: 100,
  //         labels: {
  //           enabled: false,
  //           format: "{x%}"
  //         },
  //         tickInterval: 100,
  //         visible: false
  //       },
  //       yAxis: {
  //         title: {
  //           text: ''
  //         }
  //       },
  //       title: {
  //       text:''
  //     },
  //       plotOptions: {
  //           xrange: {
  //             borderWidth: 0,
  //             grouping: false,
  //             dataLabels: {
  //                 style: {
  //                     fontSize: 16,
  //                     fontFamily: 'Arial',
  //                     textOutline: false,
  //                     color: '#787878'
  //                 }
  //             }
  //           }
  //       },
  //     legend: {
  //           y: 400
  //     },
  //     credits: false,
  //       series: [{
  //         name: 'series 1',
  //         borderRadius: 0,
  //         pointWidth: 30,
  //         data: [{
  //           x: 0,
  //           x2: 40,
  //           y: 0,
  //           color: '#f08c4a'
  //         }, {
  //           x: 40,
  //           x2: 75,
  //           y: 0,
  //           color: '#92d050',
  //           dataLabels: {
  //             enabled: false
  //           }
  //         }, {
  //           x: 75,
  //           x2: 100,
  //           y: 0,
  //           color: '#00b050',
  //           dataLabels: {
  //             enabled: true,
  //             y: 45,
  //             formatter: function() {
  //               return '';
  //             }
  //           }
  //         }]
  //          }, {
  //           name: 'series 2',
  //           borderRadius: 1,
  //           pointWidth: 12,
  //           data: [{
  //             x: 0,
  //             x2: 75,
  //             y: 0,
  //             color: 'black',
  //             dataLabels: {
  //               enabled: true,
  //               radius: 10,
  //                align: "right",
  //               y: -45,
  //               formatter: function() {
  //                 return '';
  //               }
  //             }
  //           }]
  //          }],
  //     exporting: {
  //       sourceWidth: 500,
  //       sourceHeight: 150,
  //       scale: 1,
  //       enabled: false
  //      }

  //   } as any)
  //   this.convertChartToImg(chart.options)
  // }


  ngOnInit(): void {
    this.personalChart1();
    this.personalChart2();
    this.personalChart3();
    this.personalChart4();
    // this.personalChart1_7();
    // this.personalChart2_7();
    // this.personalChart3_7();
    // this.personalChart4_7();
  }

}
