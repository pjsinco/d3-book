(function() {
  //lab exercise
  //https://github.com/CS171/lab2

  var dataset = [36, 34];
  var dataset = [
    {
      'name': 'Homer',
      'age': 36
    },
    {
      'name': 'Marge',
      'age': 34
    },
    {
      'name': 'Bart',
      'age': 10
    },
    {
      'name': 'Lisa',
      'age': 8
    },
    {
      'name': 'Maggie',
      'age': 1
    }
  ];

  //d3.select('body').selectAll('p')
    //.data(data)
    //.enter().append('p')
      //.transition().delay(function(d, i) {
        //return i * 500;
      //})
        //.text(function(d) {
          //return d;
        //});

  d3.select('body').selectAll('div').classed('lab', true)
    .data(dataset)
    .enter().append('div').classed('lab', true)
      .style('width', '10px')
      .text(function(d) {
        return d.name;
      });

  d3.selectAll('div.lab')
    .data(dataset)
    .transition()
    .duration(function(d, i) {
      return (i * 1000);
    })
      .style('width', function(d) {
        return (d.age * 10) + 'px';
      })

      //.transition().duration(function(d, i) {
         //return i * 1000;
      //})
        //.style('width', function(d) {
          //return (d.age * 10) + 'px';
        //})
        //.style('background-color', function(d) {
          //if (d.age > 15) {
            //return 'red';
          //}
        //});
        //.text(function(d) {
          //return d.name;
        //});

})();
