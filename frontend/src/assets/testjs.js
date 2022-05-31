function test() {
  console.log('sdlvknslvnslfjv')
}


function getImg() {
  console.log('sdlvknslvnslfjv')
  // const blob2base64 = (blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onerror = reject;
  //   reader.onload = () => resolve(reader.result);
  //   reader.readAsDataURL(blob);
  // });
  // var app = angular.module('ExportUtilityComponent',[]);
  // console.log('works')
  // // Prepare POST data
  // const body = new FormData();
  // body.append('infile', document.getElementById('infile').value);
  // body.append('width', 550);

  // // Post it to the export server
  // const blob = await fetch('https://export.highcharts.com/', {
  //     body,
  //     method: 'post'
  // }).then(result => result.blob());

  // // Create the image
  // const img = new Image();
  // img.src = await blob2base64(blob);
  // document.getElementById('container4').appendChild(img);
  };


// function simpleChart() {
//   var options = {
//     chart: {},
//     xAxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//       ]
//     },
//     series: [{
//       data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//       type: 'column'
//     }]
//   }

//   var chart = Highcharts.chart('container3', options);

//   var data = {
//       options: JSON.stringify(options),
//       filename: 'test.png',
//       type: 'image/png',

//   };
// }


// function extractChart() {
//   var exportUrl = 'http://export.highcharts.com/';
//   $.post(exportUrl, data, function(data) {
//       var url = exportUrl + data;
//       window.open(url);
//   });
// }


// function exportHTML(){
//   var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
//         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
//         "xmlns='http://www.w3.org/TR/REC-html40'>"+
//         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
//   var footer = "</body></html>";
//   var sourceHTML = header+document.getElementById("exportContent").innerHTML+footer;

//   var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
//   var fileDownload = document.createElement("a");
//   document.body.appendChild(fileDownload);
//   fileDownload.href = source;
//   fileDownload.download = 'document.doc';
//   fileDownload.click();
//   document.body.removeChild(fileDownload);
// }

// function Export2Word(element, filename = ''){
//   var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
//   var postHtml = "</body></html>";
//   var html = preHtml+document.getElementById(element).innerHTML+postHtml;

//   var blob = new Blob(['\ufeff', html], {
//       type: 'application/msword'
//   });

//   // Specify link url
//   var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

//   // Specify file name
//   filename = filename?filename+'.doc':'document.doc';

//   // Create download link element
//   var downloadLink = document.createElement("a");

//   document.body.appendChild(downloadLink);

//   if(navigator.msSaveOrOpenBlob ){
//       navigator.msSaveOrOpenBlob(blob, filename);
//   }else{
//       // Create a link to the file
//       downloadLink.href = url;

//       // Setting the file name
//       downloadLink.download = filename;

//       //triggering the function
//       downloadLink.click();
//   }

//   document.body.removeChild(downloadLink);
// }
