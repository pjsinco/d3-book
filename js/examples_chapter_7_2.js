(function() {
  //lab exercise
  //https://github.com/CS171/lab2

  var dataset = [
    {
      'year': 2006,
      'books': 54
    },
    {
      'year': 2007,
      'books': 43
    },
    {
      'year': 2008,
      'books': 41
    },
    {
      'year': 2009,
      'books': 44
    },
    {
      'year': 2010,
      'books': 35
    }
  ];

  var barWidth = 40;
  var width = (barWidth + 10) * dataset.length
  var height = 200;

  var xScale = d3.scale.linear();
  xScale
    .domain([0, dataset.length])
    .range([0, width]);

  var yScale = d3.scale.linear();
  yScale
    .domain([0, d3.max(dataset, function(d) {
          return d.books;
      })])
    .rangeRound([0, height]);
  
  var svg = d3.select('body').append('svg');
  svg
    .attr('width', width)
    .attr('height', height);

  svg.selectAll('rect')
    .data(dataset)
    .enter().append('rect')
      .attr('x', function(d, i) {
        return xScale(i); 
      })
      .attr('y', function(d, i) {
        return height - yScale(d.books);
      })
      .attr('height', function(d) {
        return yScale(d.books);
      })
      .attr('width', barWidth)
      .style('fill', 'cadetblue');
    
  svg.selectAll('text')
    .data(dataset)
    .enter().append('text')
      .attr('x', function(d, i) {
        return xScale(i) + barWidth;
      })
      .attr('y', function(d, i) {
        return (height - yScale(d.books));
      })
      .attr('dx', (-barWidth / 2))
      .attr('dy', '1.2em')
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.books;
      })
      .attr('fill', '#ffffff')
      .attr('font-family', 'sans-serif');
    
})();
