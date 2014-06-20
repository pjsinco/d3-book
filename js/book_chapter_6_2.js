var w = 500;
var h = 200;

var dataset = [];

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

d3.csv('/js/data/mlb-hitting.csv', function(error, data) {

  data.forEach(function(d, i) {
    dataset[i] = [parseInt(d.H), parseInt(d.R)];
  });

  //dataset = data.map(function(d) {
    //return {
      //team: d.Tm,
      //obp: parseFloat(d.OBP),
      //runs: +d.R 
    //};
  //});

  generateVis();

});

function generateVis() {

  console.log(dataset);
  

  svg
    .selectAll('circle')
    .data(dataset)
    .enter()
      .append('circle')
      .attr('cx', function(d, i) {
        return;
      })
      .attr('cy', function(d, i) {
        return;
      });

}

