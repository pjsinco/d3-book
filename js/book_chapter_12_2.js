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

var color = d3.scale.quantize()
  .range(
    [
      "rgb(237,248,233)",
      "rgb(186,228,179)",
      "rgb(116,196,118)",
      "rgb(49,163,84)",
      "rgb(0,109,44)"
    ]
  );

d3.csv('/misc/d3-book-master/chapter_12/us-ag-productivity-2004.csv',
  function(data) {
  
  var minVal = d3.min(data, function(d) {
    return parseFloat(d.value);
  });
  var maxVal = d3.max(data, function(d) {
    return parseFloat(d.value);
  });

  color
    .domain([minVal, maxVal]);
  
  d3.json('/js/data/us-states.json', function(error, json) {

    // merge data
    for (var i = 0; i < data.length; i++) {
      // grab state name
      var dataState = data[i].state;
      var dataValue = parseFloat(data[i].value);
      for (var k = 0; i < json.features.length; k++) {
        var jsonState = json.features[k].properties.name;
        
        if (dataState == jsonState) {
          //console.log(dataState, jsonState);
          json.features[k].properties.value = dataValue;
          break;
        }
      }
    }



    svg
      .selectAll('path')
      .data(json.features)
      .enter()
        .append('path')
        .attr('d', path)
        .style('fill', function(d) {
          return color(d.properties.value);
        })
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
}); // end d3.csv()
  

