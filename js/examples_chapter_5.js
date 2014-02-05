(function() {
  console.log('ch-5');

  //d3.select('body')
    //.append('p')
    //.text('New paragraph');

  var multiplyBy5 = function(n) {
    return n * 5;
  }

  var data = [5, 10, 15, 20, 25];

  var dataset;

  d3.csv('/misc/eastern.csv', function(data) {
    dataset = data; // once loaded, copy data to dataset
  });

  d3.select('body')
    .selectAll('p')
    .data(data)
    .enter()
    .append('p')
    //.text('New paragraph');
    .text(function(d) {
      return d;
    })
    .style('color', function(d) {
      if (d > 10) {
        return 'red';
      } else {
        return 'fuchsia';
      }
    });


  

})();
