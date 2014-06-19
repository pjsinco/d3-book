var w = 500;
var h = 200;
var barPadding = 1;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);
  
var dataset;

d3.csv('/js/data/mlb-hitting.csv', function(error, data) {
  var otherDataset = data.map(function(d) {
    return {
      team: d.Tm,
      lob: +d.LOB
    };
  });

  generateVis(otherDataset);

});

function generateVis(data) {

  svg
    .selectAll('rect')
    .data(data)
    .enter()
      .append('rect')
      //.attr('width', function(d) {
        //return (w / data.length) - 1;
      //})
      .attr('x', function(d, i) {
        return i * (w / data.length);
      })
      .attr('y', function(d) {
        return h - (d.lob / 2);
      })
      .attr('width', w / data.length - barPadding)
      .attr('height', function(d) {
        return d.lob / 2;
      })
      .style('fill', function(d) {
        return 'rgb(0, 0, ' + d.lob + ')';
      })
  

}
