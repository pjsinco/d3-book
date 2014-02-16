(function() {

  var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  var w = 600;
  var h = 250;

  var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length)) // # of data elements
    .rangeRoundBands([0, w], 0.05); 
      // 5% of each band's w will be padding between bars

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);
  
  var svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

  svg.selectAll('rect')
    .data(dataset)
    .enter()
      .append('rect')
      .attr('x', function(d, i) {
        //console.log(i * xScale(i));
        return xScale(i);
      })
      .attr('y', function(d) {
        //console.log(yScale(d));
        return h - yScale(d);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + (d * 10) + ')';
      })

  svg.selectAll('text')
    .data(dataset)
    .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr('y', function(d) {
        return h - yScale(d) + 20;
      })
      .text(function(d) {
        return d;
      })
      .attr('fill', '#ffffff')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px');



})();
