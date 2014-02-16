(function() {

  var h = 300;
  var w = 300;
  
  var outerRadius = w / 2;
  //var innerRadius = w / 3;
  var innerRadius = 0;
  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
  
  var dataset = [5, 10, 20, 45, 6, 25];
  
  var pie = d3.layout.pie();
  
  var color = d3.scale.category10();

  var svg = d3.select('body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)

  var arcs = svg.selectAll('g.arc')
    .data(pie(dataset))
    .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', 'translate(' + outerRadius
        + ', ' + outerRadius + ')');

  arcs
    .append('path')
    .attr('fill', function(d, i) {
      return color(i);
    })
    .attr('d', arc);

  arcs.append('text')
    .attr('transform', function(d) {
      console.log(d);
      console.log(arc.centroid(d));
      return 'translate(' + arc.centroid(d) + ')';
    })
    .text(function(d) {
      return d.value;
    })
    .attr('font-family', 'sans-serif')
    .attr('fill', '#ffffff')
    .attr('text-anchor', 'middle')

      
  


})();
