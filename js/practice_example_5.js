// the wimbledon example - bar chart
// http://wimbledon.prcweb.co.uk/top32.html

var margin = {
  top    : 30,
  right  : 30,
  bottom : 30,
  left   : 30
}
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.linear()
  .range([0, width]);

var yScale = d3.scale.ordinal()
  .rangeBands(height, 0.15);


var parameter = 'OBP';
var barHeight = 20;
var dataset = [];

var menu = [
  { id: 'OBP', name: 'OBP' },
  { id: 'OPS', name: 'OPS' },
  { id: 'OPS+', name: 'OPS+' },
  { id: 'R/G', name: 'R/G' }
];

d3.json('/js/data/mlb-hitting.json', function(error, data) {
  //console.log(data);

  dataset = data.map(function(d) {
    return {
      'team': d.Tm,
      'OBP': parseFloat(d.OBP),
      'OPS': parseFloat(d.OPS),
      'OPS+': parseInt(d['OPS+']),
      'R/G': parseInt(d['R/G'])
    }
  });

  yScale
    .domain(d3.range(0, dataset.length));

  xScale
    .domain([0, d3.max(dataset.map(function(d) {
      return d[parameter];
    }))]);

  var teams = d3.select('#chart')
    .selectAll('rect')
    .data(dataset)
    .enter()
      .append('rect')
      
      //.attr('

  console.log(dataset);
}); // end d3.json()


/*
 * Helper functions
 */
function px(s) {
  return s + 'px';
}

/*
 *UI functions
 */
function menuClick(d) {
  // if the menu item is already selected, don't do anything
  if (parameter === d.id) {
    return;
  }

  // turn of any 'selected' classes
  d3.select('#menu')
    .selectAll('div')
    .classed('selected', false);

  d3.select(this)
    .classed('selected', true);

  parameter = d.id;

  updateChart();
  
} // end menuClick

function updateScale() {
  yScale
    //.domain([0, d3.max(

}
