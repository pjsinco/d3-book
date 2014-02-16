(function() {
  
  console.log('looloo');
  var data = []

  var w = 600;
  var h = 400;
  var padding = 20;

  var svg = d3.select('#vis')
    .append('svg')
    .attr({
      'width': w,
      'height': h,
    });

  var textField = d3.select('body')
    .append('div')
    .text('value');

  d3.select('body')
    .append('button')
    .text('shuffle')
    .on('click', function() {
      return updateData();
    });

  d3.select('body')
    .append('button')
    .text('change scale')
    .on('click', function() {
      return changeScale();
    })

  d3.select('body')
    .append('button')
    .text('swap')
    .on('click', function() {
      return swapX();
    });


  var updateData = function() {
    console.log('updateData called');
    var dataSize = Math.random() * 50 + 50;

    for (var i = 0; i < dataSize; i++) {
      data.push(data[i] = {
        pos: i,
        value: Math.random() * 9999 + 1
      })
    }
  }
  
  updateData();

  var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.value;
    })])
    .range([h, 0]);

  var xScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.pos
    })])
    .range([0, w]);

  var dataPoints = svg.selectAll('circle')
    .data(data)
    .enter()
      .append('circle')
      .attr('class', 'datapoints')
      .attr('r', 5)
      .attr('cx', function(d) {
        return xScale(d.pos); 
      })
      .attr('cy', function(d) {
        return yScale(d.value); 
      })
      .on('mouseover', function(d) {
        return textField.text(d.value)
      })
      .on('mouseout', function(d) {
        return textField.text('---'); 
      })
  
})();
