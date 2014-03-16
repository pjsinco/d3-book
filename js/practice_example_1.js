// d3 margin convention
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
}

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var projection = d3.geo.albers()
  .translate([width / 2, height / 2])
  
var path = d3.geo.path()
  .projection(projection)

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')')

svg
  .append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)
  .on('click', clicked);
  
var g = svg.append('g');


d3.json('/js/data/us-states.json', function(json) {

  g
    .append('g')
      .attr('id', 'states')
    .selectAll('path')
    .data(json.features)
    .enter()
      .append('path')
      .attr('d', path)
      .on('click', clicked)
  
  g
    .append('g')

}); // end d3.json() -- trans


function clicked(d) {
  d3.select(this)
    .style('fill', 'orange')
}
