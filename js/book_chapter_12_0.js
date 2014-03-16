// d3 margin convention
var margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 10
}

var width = 500 - margin.right - margin.left;
var height = 300 - margin.top - margin.bottom;

// set up main svg
var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', 'translate(' + margin.left + ',' 
    + margin.right + ')')

// define map projection
var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .scale(500)

// define path generator
var path = d3.geo.path()
  .projection(projection)

var color = d3.scale.quantize()
  .range(['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)',
    'rgb(49,163,84)','rgb(0,109,44)']);

// load agricultural data
d3.csv('/js/data/us-ag-productivity-2004.csv', function(data) {

  color.domain(d3.extent(data, function(d) {
    return d.value;
  }));

  d3.json('/js/data/us-states.json', function(json) {
    
    // get rid of Puerto Rico
    json.features = json.features.filter(function(f) {
      return f.properties.name !== 'Puerto Rico';
    });

    // merge ag data and geojson
    // loop through once for each ag data value
    for (var i = 0; i < data.length; i++) {

      // grab state name
      var dataState = data[i].state; 

      // grab data value convert string to float
      var dataValue = parseFloat(data[i].value);

      // find the corresponding state inside the geojson
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;
        if (jsonState === dataState) {
          // copty the data value into the json
          json.features[j].properties.value = dataValue; 
          break;
        }
      }
    }

    // bind the data and create one path per geojson feature
    svg
      .selectAll('path')
      .data(json.features)
      .enter()
        .append('path')
        .attr('d', path)
        .style('fill', function(d) {
          var value = d.properties.value;
          if (d.properties.value) {
            return color(d.properties.value);
          } else {
            return '#ccc';
          }
        })

  }); // end d3.json()

}) // end d3.csv()

// load geojson data
