var margin = {
  top: 40,
  bottom: 10,
  left: 20,
  right: 20
};

var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', width + margin.top + margin.bottom)

var g = svg.append('g')
  .attr('transform', 'translate(' +
    margin.left + ',' + margin.top + ')'
  );

var dataset;

var xScale = d3.scale.linear()
  //.domain([10, 200])
  .range([0, width])

var yScale = d3.scale.ordinal()
  //.domain(d3.range(dataset.length))
  .rangeBands([0, height])

var color = d3.scale.ordinal()
  //.domain([10, 200])
  .range(['red', 'green'])

d3.json('/js/data/weather.json', function(error, json) {

  dataset = json;
  console.log(dataset);

  xScale.domain(d3.extent(dataset, function(d) {
    return d.temperature;
  }))

  yScale.domain(d3.range(dataset.length));

  var rect = g.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('height', function(d, i) {
      return yScale.rangeBand()
    })
    .attr('x', 50)
    .attr('y', function(d, i) {
      return yScale(i);
    })
    .attr('fill', function(d) {
      return color(d);
    })

  rect
    .transition()
    .duration(1000)
    .attr('width', function(d) {
      return width - xScale(d.temperature);
    });

  rect
    .append('title')
    .text(function(d) {
      return d['location']['city'];
    });

  d3.select('#filter-us-only')
    .on('change', function() {
      if (d3.select(this).property('checked') == true) {
        var filteredData = dataset.filter(function (d) {
          return d['location']['country'] == 'US';
        })
        update(filteredData);
      } else {
        update(dataset);
      }
    });

  function update(newData) {

    var bars = g.selectAll('rect')
      .data(newData)

    // Update
    bars
      .transition()
      .duration(500)
      .attr('width', function(d) {
        return width - xScale(d.temperature);
      });

    // Enter
    bars
      .enter()
      .append('rect')
      .attr('height', function(d, i) {
        return yScale.rangeBand()
      })
      .attr('width', function(d) {
        return width - xScale(d.temperature);
      })
      .attr('x', 50)
      .attr('y', function(d, i) {
        return yScale(i);
      })
      .attr('fill', function(d) {
        return color(d);
      })

    // Exit
    bars
      .exit()
      .remove()

    

  } // update
    

});
