//d3.select('body')
  //.append('p')
  //.text('hiya');

var dataset = [5, 10, 15, 20, 25];
//var dataset;

d3.select('body')
  .selectAll('p')
  .data(dataset)
  .enter()
    .append('p')
    .text(function(d) {
      return countUpTo(d);
    })
    .style('color', function(d) {
      if (d < 15) {
        return 'red';
      } else {
        return 'black';
      }
    });

function countUpTo(num) {
  return 'I can count up to ' + num;
}

//d3.csv('/js/data/food.csv', function(error, data) {
  //dataset = data;

  //generateVis();
//});

//function generateVis() {
  //console.log(dataset);
//}
