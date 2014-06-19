var w = 500;
var h = 50;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

var dataset = [5, 10, 15, 20, 25];

svg
  .selectAll('circle')
  .data(dataset)
  .enter()
    .append('circle')
    .attr('cx', function(d, i) {
      return (i * 50) + 25;
    }) 
    .attr('cy', function(d) {
      return h / 2;
    }) 
    .attr('r', function(d) {
      return d;
    });

