console.log('tuts-plus');

var dataset = [8, 48, 14, 31, 23];

svg = d3.select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 400);

svg
  .selectAll('rect')
  .data(dataset)
  .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return i * 20;
    })
    .attr('y', function(d) {
      return 200 - d;
    })
    .attr('width', 20)
    .attr('height', function(d, i) {
      return d;
    })
    .style('fill', 'steelblue')

//d3.select('body')
  //.append('p')
  //.text('hello there at 5:48')
    //.attr('x', 100)
    //.attr('x', 100)
  


