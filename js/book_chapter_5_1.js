
var dataset = [5, 10, 15, 20, 25];

d3.select('body')
  .selectAll('p')
  .data(dataset)
  .enter()
  .append('p')
  .text(function(d) {
    return "I can count up to " + d;
  })
  .style(
    'color', function(d, i) {
      return colorRows(i, 'crimson', 'cadetblue');
    }
  );

function colorRows (rowNum, evenColor, oddColor) {
  if (rowNum % 2 == 0) {
    return evenColor;
  } else {
    return oddColor;
  }
};


d3.select('body')
  .selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .style(
    'display', 'inline-block'
  )
  .style(
    'height', function(d) {
      return (d * 2) + 'px';
    }
  )
  .style(
    'width', '20px'
  )
  .style(
    'background-color', 'cadetblue'
  )
  .style(
    'margin-left', '5px'
  )

var svg = d3.select('body')
  .append('svg');
var w = 500, h = 50, barPadding = 3;

svg
  .attr('height', h)
  .attr('width', w);

//var circles = svg.selectAll('circle')
//  .data(dataset)
//  .enter()
//  .append('circle')
//
//circles
//  .attr('cx', function(d, i) {
//    return (i * 50) + 25;
//  })
//  .attr('cy', h / 2)
//  .attr('r', function(d) {
//    return d; 
//  })

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
    .style({
      'display': 'inline-block',
    })
    .attr('width', (w / dataset.length - barPadding))
    .attr('height', function(d) {
      return d * 2;
    })
    .attr('x', function(d, i) {
      return i * (w / dataset.length);
    })
    .attr('y', function(d) {
      return h - (d * 2);
    })
    .attr('fill', function(d) {
      return 'rgb(0,0,' + d * 10 + ')';
    })

svg.selectAll('text')
  .data(dataset)
  .enter()
    .append('text')
    .attr('x', function(d, i) {
      return i * (w / dataset.length) + 
        ((w / dataset.length - barPadding) / 2);
    })
    .attr('y', function(d) {
      return h - (d * 2) + 15;
    })
    .text(function(d) { return d; })
    .style('font-family', 'sans-serif')
    .attr('fill', '#fff')

