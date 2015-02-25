console.log('georgetown');

var dataset = 
  [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
  ];

var margin = {
  top: 20,
  right: 10,
  bottom: 20, 
  left: 10
};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('.viz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', width + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' +
    margin.top + ')'
  );

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .attr('r', 5)

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .attr('x', function(d) {
    return d[0];
  })
  .attr('y', function(d) {
    return d[1];
  })
  .text(function(d) {
    return d[0] + ', ' + d[1];
  })
