(function() {

  var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  var w = 600;
  var h = 250;
  var maxValue = 25;

  var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length)) // # of data elements
    .rangeRoundBands([0, w], 0.05); 
      // 5% of each band's w will be padding between bars

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  d3.select('body').append('p')
    .text('Click on this text to update the chart with new ' 
      + 'data values (as many times as you like)');
  
  var svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

  svg.selectAll('rect')
    .data(dataset)
    .enter()
      .append('rect')
      .attr('x', function(d, i) {
        //console.log(i * xScale(i));
        return xScale(i);
      })
      .attr('y', function(d) {
        //console.log(yScale(d));
        return h - yScale(d);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + (d * 10) + ')';
      })

  svg.selectAll('text')
    .data(dataset)
    .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr('y', function(d) {
        return h - yScale(d) + 20;
      })
      .text(function(d) {
        return d;
      })
      .attr('fill', '#ffffff')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px');

  d3.select('body')
    .append('button')
    .text('Add new value')
    .on('click', function() {
      console.log('button clicked');
      var newVal = Math.floor(Math.random() * maxValue);
      dataset.push(newVal);
      console.log(dataset);

      // remap our scales to reflect the new value
      xScale
        .domain(d3.range(dataset.length));
      yScale
        .domain([0, d3.max(dataset)]);

      var bars = svg.selectAll('rect')
        .data(dataset);

      // Enter ...
      bars
        .enter()
        .append('rect')
          .attr('x', w)
          .attr('y', function(d) {
            return h - yScale(d);
          })
          .attr('height', function(d) {
            return yScale(d);
          })
          .attr('width', xScale.rangeBand())
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + (d * 10) + ')';
          }) 
    
      // Update ...
      bars
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i);
          })
          .attr('y', function(d) {
            return h - yScale(d);
          })
          .attr('height', function(d) {
            return yScale(d);
          })
          .attr('width', xScale.rangeBand())
      
      var text = svg.selectAll('text')
        .data(dataset)

      // Enter -- the new text element
      text
        .enter()
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('x', w)
          .attr('y', function(d) {
            return h - yScale(d) + 20;
          })
          .text(function(d) {
            return d
          })
          .attr('fill', '#ffffff')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12px');

      // Update -- all the text elements
      text
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
          })
          .attr('y', function(d) {
            return h - yScale(d) + 20;
          })
          .text(function(d) {
            return d;
          })
          .attr('fill', '#ffffff')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12px');
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
        .domain([0, d3.max(dataset)]);

      /*
       * Process bars
       */

      // select all the bars, rebind new data to the bars,
      // grab the update selection
      var bars = svg.selectAll('rect')
        .data(dataset)

      // Exit
      bars
        .exit()
          .transition()
          .duration(500)
            .attr('x', w)
            .remove();

      // Update
      bars
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i);
          })
          .attr('y', function(d) {
            return h - yScale(d);
          })
          .attr('height', function(d) {
            return yScale(d);
          })
          .attr('width', xScale.rangeBand());

      /*
       * Process text
       */
      var text = svg.selectAll('text')
        .data(dataset)

      // Exit
      text
        .exit()
          .transition()
          .duration(500)
            .attr('x', w)
            .remove();

      // Update
      text
        .transition()
        .duration(500)
          .attr('x', function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
          })
          .attr('y', function(d) {
            return h - yScale(d) + 20;
          })
          .text(function(d) {
            return d;
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

      yScale.domain([0, d3.max(dataset)]);
      

      svg.selectAll('rect')
        .data(dataset)
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
            return h - yScale(d);
          })
          //.attr('width', xScale.rangeBand())
          .attr('height', function(d) {
            return yScale(d);
          })
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + (d * 10) + ')';
          })
        

      svg.selectAll('text')
        .data(dataset)
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
            return h - yScale(d) + 20;
          })
          .text(function(d) {
            return d;
          })
        .attr('fill', '#ffffff')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px');

  
    });


})();
