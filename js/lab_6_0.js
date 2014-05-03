var margin = {
  top: 30,
  right: 10,
  bottom: 10,
  left: 10
}

var width = 960 - margin.left - margin.right;
var height = 300 - margin.left - margin.right;

var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.05)

var yScale = d3.scale.linear()
  .range([0, height])

d3.select('#histo1')
  .append('h3')
  .text('Put-outs by Catcher')

var svg = d3.select('#histo1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')')

var dataset = [];

d3.csv('/js/data/catchers.csv', function(error, data) {
  dataset = data.map(function(d) {
    return {
      player: d.PLAYER,
      team: d.TEAM,
      po: +d.PO
    }
  }); 
  
  xScale
    .domain(d3.range(dataset.length))

  yScale
    .domain([0, d3.max(dataset.map(function(d) {
      return d.po;
    }))]);

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return height - yScale(d.po);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return yScale(d.po);
      })
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + (d.po * 3) + ')';
      })
      .on('mouseover', function(d) {
        // get this bar's x, y values, then augment for tooltip

        var xPos = parseFloat(d3.select(this).attr('x')) + 
          (xScale.rangeBand() / 2)
        var yPos = (parseFloat(d3.select(this).attr('y')) / 2) + 
          (height / 2)

        //update the tooltip pos and val
        d3.select('#histo1')
          .select('.tooltip')
          .style('left', xPos + 'px')
          .style('top', yPos + 'px')
          .select('.value')
          .text(function() {
            return d.po;
          })

        d3.select('#histo1')
          .select('.player')
          .text( function() {
            return d.player;
          })

        d3.select('#histo1')
          .select('.team')
          .text(function() {
            return d.team;
          })
          
        // show the tooltip
        d3.select('#histo1 .tooltip')
          .classed('hidden', false)
      }) // end mouseover
      .on('mouseout', function(d) {
        d3.select('#histo1 .tooltip')
          .classed('hidden', true)
      })
      .on('click', function() {
        sortBars();
      })
    
    //define sort order flag
    var sortOrder = false;    

    //define sort function
    var sortBars = function() {

      // toggle sort order
      sortOrder = !sortOrder;

      d3.selectAll('rect')
        .sort(function(a, b) {
          if (sortOrder) {
            return d3.ascending(a.po, b.po);
          } else {
            return d3.descending(a.po, b.po);
          }
        })
        .transition()
        .delay(function(d, i) {
          return i * 50;
        })
        .duration(1000)
        .attr('x', function(d, i) {
          return xScale(i);
        })
        

    } // end sortBars
  
}); // end d3.csv()
  
