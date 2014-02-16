(function() {
  var w = 500;
  var h = 300;
  var padding = 30;
  
//  var dataset = [
//  	[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//  	[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
//  	[600, 150]
//  ];
  var dataset = [];
  var numDataPoints = 50;

  var getRandomDataSet = function(maxValue) {
    var randData = []
    var xRange = Math.random() * maxValue;
    var yRange = Math.random() * maxValue;
    for (var i = 0; i < numDataPoints; i++) {
      var newNumber1 = Math.floor(Math.random() * xRange);
      var newNumber2 = Math.floor(Math.random() * yRange);
      randData.push([newNumber1, newNumber2]);
      //console.log(newNumber1, newNumber2);
    }

    //for (var i = 0; i < randData.length; i++) {
      //console.log(randData[i]);
    //}

    return randData;
  };

  dataset = getRandomDataSet(1000);
  
//  var xRange = Math.random() * 1000;
//  var yRange = Math.random() * 1000;
//  for (var i = 0; i < numDataPoints; i++) {
//    var newNumber1 = Math.floor(Math.random() * xRange);
//    var newNumber2 = Math.floor(Math.random() * yRange);
//    dataset.push([newNumber1, newNumber2]);
//  };

  //Create scale functions
  var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding * 2]);
  
  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);
  
  var rScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);
  
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(5);

  //var formatAsPercentage = d3.format('.1%');
  //xAxis.tickFormat(formatAsPercentage);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks(5);

  d3.select('body')
    .append('p')
    .text('Click on this text to update the chart with new data values'
      + ' as many times as you like');
  
  //Create SVG element
  var svg = d3.select("body")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (h - padding) + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + padding + ', 0)')
    .call(yAxis);
    
  svg.selectAll("circle")
    .data(dataset)
    .enter()
      .append("circle")
      .attr("cx", function(d) {
      		return xScale(d[0]);
      })
      .attr("cy", function(d) {
      		return yScale(d[1]);
      })
      .attr("r", function(d) {
      		return rScale(d[1]);
      });

  /*
   * Listen for clicks on <p>
   */
  d3.select('p')
    .on('click', function(d, i) {
      // 1. Modify values in dataset
      dataset = [];
      dataset = getRandomDataSet(1000);

      // 2. Recaliabrate scale inputs
      xScale
        .domain([0, d3.max(dataset, function(d) {
          return d[0];
        })]);

      yScale
        .domain([0, d3.max(dataset, function(d) {
          return d[1];
        })]);

      svg.select('.x.axis')
        .transition()
        .duration(1000)
          .call(xAxis);

      svg.select('.y.axis')
        .transition()
        .duration(1000)
          .call(yAxis);

      svg.selectAll('circle')
        // 2. Rebind new values to existing elements
        .data(dataset)
        // 3. Transition elements to new positions
        .transition()
        .duration(1000)
          .each('start', function() {
            // change colors during transition only
            d3.select(this)
              .attr('fill', 'red')
              .attr('r', 3)
          })
          .attr('cx', function(d) {
            return xScale(d[0]);
          })
          .attr('cy', function(d) {
            return yScale(d[1]);
          })
          //.attr('r', function(d) {
            //return rScale(d[1]);
          //})
          .each('end', function() {
            d3.select(this)
              .transition()
              .duration(1000)
                .attr('fill', 'black')
                .attr('r', 2);
          })

      
  
    });
  
//  svg.selectAll("text")
//    .data(dataset)
//    .enter()
//      .append("text")
//      .text(function(d) {
//      		return d[0] + "," + d[1];
//      })
//      .attr("x", function(d) {
//      		return xScale(d[0]);
//      })
//      .attr("y", function(d) {
//      		return yScale(d[1]);
//      })
//      .attr("font-family", "sans-serif")
//      .attr("font-size", "11px")
//      .attr("fill", "red");
})();
