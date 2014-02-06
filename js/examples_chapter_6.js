(function() {
  console.log('ch-6');

  var getRandomArbitrary = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  //var dataset = [5, 10, 15, 20, 25];
  var dataset = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
    14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];

  var w = 500;
  var h = 100;
  var barPadding = 1;

  var rand = [];

  for (var i = 0; i < 25; i ++) {
    rand.push(getRandomArbitrary(1, 25));    
  }
  

  var svg = d3.select('body').append('svg')
    .attr('height', h)
    .attr('width', w);

//  svg.selectAll('circle')
//    .data(dataset)
//    .enter().append('circle')
//      .attr('cx', function(d, i) {
//        return (i * 50) + 25;
//      })
//      .attr('cy', h / 4)
//      .attr('r', function (d) {
//        return d;
//      });

  svg.selectAll('rect')
    .data(dataset)
    .enter().append('rect')
      .attr('x', function (d, i) {
        return i * (w / dataset.length);
      })
      .attr('y', function(d) {
        return h - d;
      })
      .attr('height', function (d) {
        return d * 4;
      })
      .attr('width', (w / dataset.length) - barPadding);
  
      

//  d3.select('body')
//    .selectAll('div')
//    .data(rand)
//    .enter().append('div') 
//      .attr('class', 'bar')
//      .style('height', function(d) {
//      var barHeight = d * 5;
//      return barHeight + 'px';
//      });
      //.text(function(d) {
        //return d;
      //});

//  svg = d3.select('body').append('svg');
//  svg.attr('width', w);
//  svg.attr('height', h);
//
//  var circles = svg.selectAll('circle')
//    .data([5, 10, 15, 20, 25])
//    .enter().append('circle');
//
//  circles
//    .attr('cx', function(d, i) {
//      return (i * 50) + 25;
//    })
//    .attr('cy', h / 2)
//    .attr('r', function(d) {
//      return d;
//    })
//    .attr('fill', 'darkorange')
//    .attr('stroke', 'yellow')
//    .attr('stroke-width', function(d) {
//      return d / 2;
//    });
      
    
    

})();
