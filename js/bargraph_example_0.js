var margin = { top: 40,
  bottom: 10,
  left: 20,
  right: 20
};

var width = 800 - margin.left - margin.right;
var height = 250 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', width + margin.top + margin.bottom)

var g = svg.append('g')
  .attr('transform', 'translate(' +
    margin.left + ',' + margin.top + ')'
  );

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, width], 0.05)

var yScale = d3.scale.linear()
  .domain(d3.extent(dataset))
  .range([0, height - margin.top - margin.bottom])

var rect = g.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return xScale(i);
  })
  .attr('y', function(d, i) {
    return height - yScale(d);
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function(d) {
    return yScale(d);
  })

rect
  .transition()
  .duration(500)
  .attr('fill', function(d) {
    return "rgb(0,0," + (d * 10) + ")";
  })

// create labels
var labels = g.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .attr('x', function(d, i) {
    return xScale(i) + (xScale.rangeBand() / 2);
  })
  .attr('y', function(d, i) {
    return height - yScale(d) + 20;
  })
  .text(function(d) {
    return d;
  })
  .attr('text-anchor', 'middle')
  .attr('fill', 'white')
  .attr('font-family', 'sans-serif')
  .attr('font-weight', '200')

d3.select('#click-too')
  .on('click', function() {

  console.log('click-too');

  var maxValue = 25;
  var newNumber = Math.floor(Math.random() * maxValue);
  dataset.push(newNumber);

  // update our scales
  yScale.domain(d3.extent(dataset));
  xScale.domain(d3.range(dataset.length))

  var bars = g.selectAll('rect')
    .data(dataset)
  
  // Enter 
  bars
    .enter()
    .append('rect')
    .attr('x', width)
    .attr('y', function(d, i) {
      return height - yScale(d);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('fill', function(d) {
      return "rgb(0,0," + (d * 10) + ")";
    })

  // Update
  bars
    .transition()
    .duration(500)
    .attr('x', function(d, i) {
      return xScale(i);
    })
    .attr('y', function(d, i) {
      return height - yScale(d);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    })


  labels
    .data(dataset)
    .enter()
    .append('text')
    .attr('x', function(d, i) {
      return xScale(i) + (xScale.rangeBand() / 2);
    })
    .attr('y', function(d, i) {
      return height - yScale(d) + 20;
    })
    .text(function(d) {
      return d;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-family', 'sans-serif')
    .attr('font-weight', '200')
  
  

});

d3.select('#click')
  .on('click', function() {

    console.log('clicked');

    // new values for the dataset
    var numValues = dataset.length;
    dataset = [];
    maxValue = 25;
    for (var i = 0; i < numValues; i++) {
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);
    }
    console.log(dataset);

    yScale
      .domain(d3.extent(dataset));

    // update all the rects
    //g.selectAll('rect')
    rect
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return (i / dataset.length) * 1000;
      })
      .duration(500)
      .attr('y', function(d, i) {
        return height - yScale(d);
      })
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('fill', function(d) {
        return "rgb(0,0," + (d * 10) + ")";
      })
      
    labels
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return (i / dataset.length) * 1000;
      })
      .duration(500)
      .attr('y', function(d, i) {
        return height - yScale(d) + 20;
      })
      .text(function(d) {
        return d;
      })

  });
  

