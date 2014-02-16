(function() {
  var dataset = [ 
    { key: 0, value: 5 },		
    { key: 1, value: 10 },	
    { key: 2, value: 13 },
    { key: 3, value: 19 },
    { key: 4, value: 21 },
    { key: 5, value: 25 },
    { key: 6, value: 22 },
    { key: 7, value: 18 },
    { key: 8, value: 15 },
    { key: 9, value: 13 },
    { key: 10, value: 11 },
    { key: 11, value: 12 },
    { key: 12, value: 15 },
    { key: 13, value: 20 },
    { key: 14, value: 18 },
    { key: 15, value: 17 },
    { key: 16, value: 16 },
    { key: 17, value: 18 },
    { key: 18, value: 23 },
    { key: 19, value: 25 } 
  ];

  var w = 600;
  var h = 250;
  var maxValue = 25;
  var sortOrder = false;

  var key = function(d) {
    return d.key;
  }

  var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length)) // # of data elements
    .rangeRoundBands([0, w], 0.05); 
      // 5% of each band's w will be padding between bars

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {
      return d.value;
    })])
    .range([0, h]);

  var sortBars = function() {
    sortOrder = !sortOrder;

    svg.selectAll('rect')
      .sort(function(a, b) {
        if (sortOrder) {
          return d3.ascending(a.value, b.value);
        } else {
          return d3.descending(a.value, b.value);
        }
      })
      .transition()
      .delay(function(d, i) {
        return i * 50; 
      })
      .duration(1000)
        .attr('x', function(d, i) {
          return xScale(i);
        })
        //.attr('y', function(d) {
          //return h - yScale(d.value) + 20;
        //})
  
//    svg.selectAll('text')
//      .sort(function(a, b) {
//        if (sortOrder) {
//          return d3.ascending(a.value, b.value);
//        } else {
//          return d3.descending(a.value, b.value);
//        }
//      })
//      .transition()
//      .delay(function(d, i) {
//        return i * 50; 
//      })
//      .duration(1000)
//        .attr('x', function(d, i) {
//          return xScale(i) + xScale.rangeBand() / 2;
//        })
//        .attr('y', function(d) {
//          return h - yScale(d.value) + 20;
//        })
  } // end sortBars
  
  var svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

  var group = svg.selectAll('g')
    .data(dataset, key)
    .enter()
      .append('g') // mismatch between selectAll and append
      
  var bars = group.append('rect');

  var text = group.append('text');

  var showTooltip = function(d, selection) {
    var xPosition = parseFloat(selection
      .attr('x')) + xScale.rangeBand() / 2;
    var yPosition = parseFloat(selection
      .attr('y')) / 2 + h / 2;

    d3.select('#tooltip')
      .style('left', xPosition + 'px')
      .style('top', yPosition + 'px')
      .select('#value')
        .text(d.value)
      
    d3.select('#tooltip')
      .classed('hidden', false)
  }

  var hideTooltip = function() {
    d3.select('#tooltip')
      .classed('hidden', true);
  }

  bars
    .attr('x', function(d, i) {
      //console.log(i * xScale(i));
      return xScale(i);
    })
    .attr('y', function(d) {
      //console.log(yScale(d));
      return h - yScale(d.value);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d.value);
    })
    .attr('fill', function(d) {
      return 'rgb(0, 0, ' + (d.value * 10) + ')';
    })
    .on('mouseover', function(d) {
      showTooltip(d, d3.select(this));
      d3.select(this)
        .attr('fill', 'orange');
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(250)
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + d.value * 10 + ')';
          })

      hideTooltip();
    })

//  text
//    .attr('text-anchor', 'middle')
//    .attr('x', function(d, i) {
//      return xScale(i) + xScale.rangeBand() / 2;
//    })
//    .attr('y', function(d) {
//      return h - yScale(d.value) + 20;
//    })
//    .text(function(d) {
//      return d.value;
//    })
//    .attr('fill', '#ffffff')
//    .attr('font-family', 'sans-serif')
//    .attr('font-size', '12px');

  d3.select('body')
    .append('button')
    .text('Sort')
    .on('click', sortBars);

  d3.select('body')
    .append('button')
    .text('Add new value')
    .on('click', function() {
      console.log(dataset[dataset.length - 1]);
      var newVal = Math.floor(Math.random() * maxValue);
      dataset.push({
        key: d3.max(dataset, function(d) {
          return dataset[dataset.length - 1].key + 1
        }),
        value: newVal
      });

      // remap our scales to reflect the new value
      xScale
        .domain(d3.range(dataset.length));
      yScale
        .domain([0, d3.max(dataset, function(d) {
          return d.value;
        })]);

      var bars = svg.selectAll('rect')
        .data(dataset, key);

      // Enter ...
      bars
        .enter()
        .append('rect')
          .attr('x', w)
          .attr('y', function(d) {
            return h - yScale(d.value);
          })
          .attr('height', function(d) {
            return yScale(d.value);
          })
          .attr('width', xScale.rangeBand())
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + (d.value * 10) + ')';
          }) 
          .on('mouseover', function(d) {
            showTooltip(d, d3.select(this));
            d3.select(this)
              .attr('fill', 'orange');
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(250)
                .attr('fill', function(d) {
                  return 'rgb(0, 0, ' + d.value * 10 + ')';
                })
            hideTooltip();

          })
    
      // Update ...
      bars
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i);
          })
          .attr('y', function(d) {
            return h - yScale(d.value);
          })
          .attr('height', function(d) {
            return yScale(d.value);
          })
          .attr('width', xScale.rangeBand())
      
      var text = svg.selectAll('text')
        .data(dataset, key)

      // Enter -- the new text element
      text
        .enter()
          .append('text')
//          .attr('text-anchor', 'middle')
//          .attr('x', w)
//          .attr('y', function(d) {
//            return h - yScale(d.value) + 20;
//          })
          .text(function(d) {
            return d.value;
          })
          //.attr('fill', '#ffffff')
          //.attr('font-family', 'sans-serif')
          //.attr('font-size', '12px');

      // Update -- all the text elements
//      text
//        .transition()
//        .duration(500)
//          .attr('x', function(d, i) {
//            return xScale(i) + xScale.rangeBand() / 2;
//          })
//          .attr('y', function(d) {
//            return h - yScale(d.value) + 20;
//          })
//          .text(function(d) {
//            return d.value;
//          })
//          .attr('fill', '#ffffff')
//          .attr('font-family', 'sans-serif')
//          .attr('font-size', '12px');
    }) // end button

  d3.select('body')
    .append('button')
    .text('Remove value')
    .on('click', function() {

      // remove first element from array
      dataset.shift();

      // remap scales
      xScale
        .domain(d3.range(dataset.length));
      yScale
        .domain([0, d3.max(dataset, function(d) {
          return d.value;
        })]);

      /*
       * Process bars
       */

      // select all the bars, rebind new data to the bars,
      // grab the update selection
      var bars = svg.selectAll('rect')
        .data(dataset, key)

      // Exit
      bars
        .exit()
          .transition()
          .duration(500)
            .attr('x', -xScale.rangeBand()) // exit stage left
            .remove();

      // Update
      bars
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i);
          })
          .attr('y', function(d) {
            return h - yScale(d.value);
          })
          .attr('height', function(d) {
            return yScale(d.value);
          })
          .attr('width', xScale.rangeBand());

      /*
       * Process text
       */
      var text = svg.selectAll('text')
        .data(dataset, key)

      // Exit
      text
        .exit()
          .transition()
          .duration(500)
            .attr('x', -xScale.rangeBand()) // exit stage left
            .remove();

      // Update
      text
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
          })
          .attr('y', function(d) {
            return h - yScale(d.value) + 20;
          })
          .text(function(d) {
            return d.value;
          })
          .attr('fill', '#ffffff')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12px');
        
      

    }) // end button 'remove'

  d3.select('p')
    .on('click', function() {
      console.log('clikc');
	  //dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
		//5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
      var numValues = dataset.length; 
      dataset = [];
      for (var i = 0; i < numValues; i++) {
        var newNum = Math.floor(Math.random() * maxValue);
        dataset.push(newNum);
      }

      yScale.domain([0, d3.max(dataset, function(d) {
        return d.value;
      })]);
      

      svg.selectAll('rect')
        .data(dataset, key)
        .transition()
        .duration(500)
        .delay(function(d, i) {
          return i / dataset.length * 1000;
        })
//          .attr('x', function(d, i) {
//            //console.log(i * xScale(i));
//            return xScale(i);
//          })
          .attr('y', function(d) {
            //console.log(yScale(d));
            return h - yScale(d.value);
          })
          //.attr('width', xScale.rangeBand())
          .attr('height', function(d) {
            return yScale(d.value);
          })
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + (d.value * 10) + ')';
          })
        

      svg.selectAll('text')
        .data(dataset, key)
        .transition()
        .duration(500)
        .delay(function(d, i){
          return i / dataset.length * 1000;
        })
          .attr('text-anchor', 'middle')
          .attr('x', function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
          })
          .attr('y', function(d) {
            return h - yScale(d.value) + 20;
          })
          .text(function(d) {
            return d.value;
          })
        .attr('fill', '#ffffff')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px');

  
    });


})();
