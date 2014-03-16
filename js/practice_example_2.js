//http://bost.ocks.org/mike/map/

// d3 margin convention
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
}

var width = 960 - margin.left - margin.right;
var height = 1160 - margin.top - margin.bottom;

var projection = d3.geo.albers()
  .center([0, 55.4])
  .translate([width / 2, height / 2])
  .rotate([4.4, 0])
  .scale(6000)
  .parallels([50,60])
  
var path = d3.geo.path()
  .projection(projection)

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')')

//svg
  //.append('rect')
  //.attr('class', 'background')
  //.attr('width', width)
  //.attr('height', height)
  //.on('click', clicked);
  
d3.json('/js/data/uk.json', function(uk) {

  svg
    .append('path')
    .datum(topojson.feature(uk, uk.objects.subunits))
      .attr('d', path)

  svg
    .selectAll('.subunit')
    .data(topojson.feature(uk, uk.objects.subunits).features)
    .enter()
      .append('path')
      .attr('class', function(d) {
        return 'subunit ' + d.id;
      })
      .attr('d', path)
      


});
