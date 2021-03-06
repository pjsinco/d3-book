(function() {
  console.log('ch-6');

  var getRandomArbitrary = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  //var dataset = [5, 10, 15, 20, 25];
  //var dataset = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
    //14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];
  var dataset = [
	[5, 20],
    [480, 90], 
    [250, 50],
    [100, 33],
    [330, 95],
	[410, 12], 
    [475, 44], 
    [25, 67], 
    [85, 21], 
    [220, 88]
  ];

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

//  svg.selectAll('rect')
//    .data(rand)
//    .enter().append('rect')
//      .attr('x', function (d, i) {
//        return i * (w / rand.length);
//      })
//      .attr('y', function(d) {
//        return h - (d * 4);
//      })
//      .attr('height', function (d) {
//        return d * 4;
//      })
//      .attr('width', (w / rand.length) - barPadding)
//      .attr('fill', function(d) {
//        return 'rgba(0, 0, ' + (255 - (d * 10)) + ', 1.0)';
//      });
  

//  svg.selectAll('text')
//    .data(rand)
//    .enter().append('text')
//      .text(function(d) {
//        return d;
//      })
//      .attr('fill', '#cccccc')
//      .attr('font-family', 'sans-serif')
//      .attr('font-size', 11)
//      .attr('text-anchor', 'middle')
//      .attr('x', function(d, i) {
//        return i * (w / rand.length) 
//          + ((w / rand.length - barPadding) / 2);
//      })
//      .attr('y', function (d) {
//        return h - (d * 4) + 14;
//      });

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

  svg.selectAll('circle')
    .data(dataset)
    .enter().append('circle')
      .attr('fill', 'black')
      .attr('cx', function(d) {
        return d[0];
      })
      .attr('cy', function(d) {
        return d[1];
      })
      .attr('r', function(d) {
        return Math.sqrt(h - d[1]);
      });
  
  svg.selectAll('text')
    .data(dataset)
    .enter().append('text')
      .attr('x', function(d) {
        return d[0];
      })
      .attr('y', function(d) {
        return d[1];
      })
      .text(function(d) {
        return d[0] + ', ' + d[1];
      })
      .attr('fill', 'red');
    

})();
