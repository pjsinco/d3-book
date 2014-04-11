$(document).ready(function() {

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  d3.select('body')
    .append('h1')
    .text('Self-reported primary practice focus of AOA members')

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width) 
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ','
      + margin.top + ')')

  var projection = d3.geo.albersUsa()
    .translate([width / 2, height / 2])
    .scale(900)

  var path = d3.geo.path()
    .projection(projection)

  var color = d3.scale.quantize()
    .range(['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)'])


  var familyPrac = {};
  var specialties = {};
  var cardiology = {};

  d3.csv('/js/data/do-members-in-practice.csv', function(error, data) {

    // process family medicine
    data.forEach(function(d) {
      if (d.maj_prac_focus.indexOf('Family') == 0) {
        if (familyPrac[d.full_state]) {
          familyPrac[d.full_state]++;
        } else {
          familyPrac[d.full_state] = 1;
        }
      }
    });


    // process specialties
    data.forEach(function(d) {
      if (specialties[d.maj_prac_focus]) {
        specialties[d.maj_prac_focus]++; 
      } else {
        specialties[d.maj_prac_focus] = 1; 
      } 
    });

    console.log(specialties);


    // process cardiology
    data.forEach(function(d) {
      if (d.maj_prac_focus === 'Cardiology') {
        if (cardiology[d.full_state]) {
          cardiology[d.full_state]++;
        } else {
          cardiology[d.full_state] = 1;
        }
      }
    }); 

    color
      .domain(d3.extent(d3.values(familyPrac)));

    d3.json('/js/data/us-states.json', function(error, json) {

      // get rid of puerto rico
      json.features = json.features.filter(function(f) {
        return f.properties.name !== 'Puerto Rico';
      })

      //merge practice-loc data and geojson
      // loop through for each 
      for (var i = 0; i < data.length; i++) {

        // grab the state name at hand
        var dataState = data[i].full_state;
        
        // grab the data
        var dataValue = familyPrac[dataState];

        // find the corresponding state inside the geojson
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.name;
          if (jsonState === dataState) {
            json.features[j].properties.value = dataValue;
          }
        }
      }

    console.log(json.features[41]);

    svg
      .selectAll('path')
      .data(json.features)
      .enter()
        .append('path')
        .attr('d', path)
        .style('fill', function(d) {
          
          if (d.properties.value) {
            return color(d.properties.value);
          } else {
            return '#ccc';
          }
        })
        .style('stroke', '#ccc')

  
    });; // end d3.json()
  }); // end d3.csv()


});
