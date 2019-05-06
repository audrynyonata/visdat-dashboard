/* Source: http://blog.deontwikkelfabriek.nl/creating-a-population-pyramid-with-the-google-chart-tools/ */
function drawBarChart(year) {
   // grab the CSV
   $.get("data/ekspor.csv", function(csvStringEkspor) {
      $.get("data/impor.csv", function(csvStringImpor) {
      // transform the CSV string into a 2-dimensional array
      var arrayEkspor = $.csv.toArrays(csvStringEkspor, {onParseValue: $.csv.hooks.castToScalar});
      var arrayImpor = $.csv.toArrays(csvStringImpor, {onParseValue: $.csv.hooks.castToScalar});
      
      // transform year header from number to text      
      for(var i=1;i<=6;i++){
        arrayEkspor[0][i] = arrayEkspor[0][i].toString()
        arrayImpor[0][i] = arrayImpor[0][i].toString()
      }

      // replace all ekspor with negative value (biar di kiri sumbu Y)
      for(var j=1; j<arrayEkspor.length;j++){
        for(var i=1;i<=6;i++){
          arrayEkspor[j][i] = arrayEkspor[j][i] * -1
        }
      }

      var yr = 1;
      switch (year) {
        case 2014: yr = 2; break;
        case 2015: yr = 3; break;
        case 2016: yr = 4; break;
        case 2017: yr = 5; break;
        case 2018: yr = 6; break;
        default: yr = 1; break;
      }

      var arrayFinal = [];
      arrayFinal[0] = ['Sektor', 'Ekspor', 'Impor']
      for (var i=1;i<arrayEkspor.length;i++) {
        arrayFinal[i] = []
        arrayFinal[i].push(arrayEkspor[i][0],arrayEkspor[i][yr],arrayImpor[i][yr])
      }

      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayFinal);

      data.sort([{column: 1}])
      // this view can select a subset of the data at a time
      var view = new google.visualization.DataView(data);

      //view.setColumns([0,1,2]);

      // set chart options
      var options = {
        isStacked: true,
        hAxis: {
          format: ',###.#;,###.#'
        },
        height: 500,
        animation: {
          duration: 2000,
          easing: 'out'
        },
        tooltip: {
          isHtml: true,
          trigger: 'both'
        },
        colors: ['#8BC34A', '#F44336']
      };

      var formatter = new google.visualization.NumberFormat({
        pattern: '.#;,.#',
        suffix: ' Juta US$'
      });

      formatter.format(data, 1)
      formatter.format(data, 2)

      // create the chart object and draw it
      var chart = new google.visualization.BarChart(document.getElementById('view3'));
      chart.draw(view, options);
    });
  });
}