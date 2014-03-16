// d3 margin convention
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
}

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')')

var projection = d3.geo.albers()
  .translate([width / 2, height / 2])
  
var path = d3.geo.path()
  .projection(projection)

d3.json('/js/data/us-counties.json', function(json) {
  //json.features.forEach(function(d) {
    //console.log(d.properties.NAME);
  //})
  
  svg
    .selectAll('path')
    .data(json.features)
    .enter()
      .append('path')
      .attr('d', path)
      .style('fill', 'cadetblue')
      

}); // end d3.json() -- counties
  
