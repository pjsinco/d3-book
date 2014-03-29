// warmup 2014-03-29

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
}

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.right + ')');


var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .scale(900)

var path = d3.geo.path()
  .projection(projection);

d3.json('/js/data/us-counties.json', function(error, data) {
  //console.log(data.features.length);
  
  svg
    .selectAll('path')
    .data(data.features)
    .enter()
      .append('path')
      .attr('d', path)
      .on('mouseover', function(d, i) {
        d3.select(this)
        .transition()
        .duration(300)
        .style('opacity', 0.5)
      })
      .on('mouseout', function(d) {
        d3.select(this)
        .transition()
        .duration(300)
        .style('opacity', 1.0)
      })
      
    
  

}); // end d3.json()
