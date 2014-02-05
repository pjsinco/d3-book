(function() {
  console.log('ch-6');

  var getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  //var dataset = [5, 10, 15, 20, 25];
  var dataset = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
    14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];

  var rand = [];

  for (var i = 0; i < 25; i ++) {
    rand.push(getRandomArbitrary(10, 50));    
  }
  
  d3.select('body')
    .selectAll('div')
    .data(rand)
    .enter()
    .append('div') 
    //.style('color', 'blue')
    //.style('background-color', 'yellow')
    //.style('height', '20px')
    //.style('width', '200px')
    //.style('margin-bottom', '10px');
    .attr('class', 'bar')
    .style('height', function(d) {
      var barHeight = d * 5;
      return barHeight + 'px';
    })
    //.text(function(d) {
      //return d;
    //});


})();
