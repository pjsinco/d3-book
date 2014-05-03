//$(document).ready(function() {

  var margin = {
    top: 30,
    right: 10,
    bottom: 10,
    left: 10
  }
  var width = 960 - margin.right - margin.left;
  var height = 500 - margin.top - margin.bottom;

  var xScale = d3.scale.ordinal()
    .rangePoints([0, width], 0.5)
    
  var yScale = {};

  var line = d3.svg.line();
    
  var yAxis = d3.svg.axis()
    .orient('left');
  
  var background, foreground;
  var dataset;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ','
      + margin.top + ')')

  d3.csv('/js/data/season-totals-by-team.csv', function(error, data) {

    dataset = data.map(function(d) {
      return {
        '2pp': +d['2Pp'],
        '3pp': +d['3Pp'],
        'ast': +d['AST'],
        'trb': +d['TRB'],
        'tov': +d['TOV'],
        'stl': +d['STL'],
        'ppg': +d['PTSg']
      }
    });

    console.log(dataset);
  }); // end d3.csv()
    


//}); // end .ready()
