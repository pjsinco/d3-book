(function() {

  //var dataset = [30, 10, 50, 40, 20, 3];
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

  d3.select('body').append('div');

  d3.select('div').selectAll('p')
    .data(dataset)
    .enter().append('p')
      .text(function(d) {
        return d.name + ': ' + d.age;
      });
    
  d3.select('div').selectAll('p')
    .sort(function(a, b) {
      //console.log('a: ' + a.name);
      //console.log('b: ' + b.name);
      return d3.ascending(a.age, b.age);
    });


})();
