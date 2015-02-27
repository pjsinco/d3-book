var margin = { 
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};

var width = 655 - margin.left - margin.right;
var height = 437 - margin.top - margin.bottom;

var svg = d3.select('.viz').append('svg')
  //.attr('width', width + margin.left + margin.right)
  //.attr('height', width + margin.top + margin.bottom)
  .attr('viewBox', '0 0 ' + width + ' ' + height)

var g = svg.append('g')
  //.attr('transform', 'translate(' +
    //margin.left + ',' + margin.top + ')'
  //);

var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .scale([800])
  //.translate([width, height])

var path = d3.geo.path()
  .projection(projection);

var color = d3.scale.quantize()
  .range(['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)',
    'rgb(49,130,189)','rgb(8,81,156)']);

d3.csv('/js/data/us-ag-productivity-2004.csv', function(csv) {

  console.log(csv);
  var min = d3.min(csv, function(d) {
    return d['value'];
  });

  var max = d3.max(csv, function(d) {
    return d['value'];
  });

  color
    .domain([min, max]);


  d3.json('/js/data/us-states.json', function(error, json) {
  
    //console.log(json);
    //console.log(json['features'].length);
    //console.log(json['features'][33]['id']);

    var csvLen = csv.length;

    for (var i = 0; i < csvLen; i++) {
      //console.log(json['features'][i]['properties']['name']);
      var csvState = csv[i]['state'];
      var csvValue = csv[i]['value'];

      var jsonLen = json['features'].length;
      for (var j = 0; j < jsonLen; j++) {
        var jsonState = json['features'][j]['properties']['name'];
        if (csvState == jsonState) {
          json['features'][j]['properties']['value'] = +csvValue;
        
          break;
        }
      }
    }

    console.log(json);
    
    g.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', function(d) {
        var val = d['properties']['value'];
        if (val) {
          return color(val);
        } else {
          return '#ccc';
        }
      });
  
  });
}); // d3.csv
