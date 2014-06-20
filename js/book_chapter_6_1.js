var w = 800;
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
  console.log(data);

  svg
    .selectAll('rect')
    .data(data)
    .enter()
      .append('rect')
      //.attr('width', function(d) {
        //return (w / data.length) - 1;
      //})
      .attr('x', function(d, i) {
        return positionX(data, i);
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
      });

  svg
    .selectAll('text')
    .data(data)
    .enter()
      .append('text')
      .text(function(d) {
        return d.lob;
      })
        .attr('x', function(d, i) {
          return positionX(data, i);
        })
        .attr('y', function(d) {
          return positionY(d.lob);
        })
        .attr('fill', '#fff')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')

  svg
    .selectAll('team')
    .data(data)
    .enter()
      .append('text')
      .attr('class', 'team')
      .text(function(d) {
        return d.team;       
      })
        .attr('x', function(d, i) {
          return positionX(data, i);
        })
        .attr('y', function(d) {
          return h;
        })
        .attr('fill', '#fff')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')
        

}

/*
 * Helper functions
 *
 */
function positionX(dataset, index) {
  return index * (w / dataset.length) + 
    (w / dataset.length - barPadding) / 2;
}

function positionY(datum) {
  return h - (datum / 2) + 14;
}
