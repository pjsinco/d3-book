//$(document).ready(function() {

// redraw example:
// http://www.streamlinedataworks.com/example5.html

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

  var specialties = {};
  var stateCounts = {};
  var dataset = [];
  var selectButton;
  var states = [];
    
  // load up the specialties
  d3.json('/js/data/specialties.json', function(error, data) {
    specialties = data;

    var dropdown = d3.select('body').append('select')
      .attr('name', 'select')
      .attr('id', 'specialtyDropdown')

    console.log(specialties.specialties);

    var options = dropdown.selectAll('option')
      .data(specialties.specialties)
      .enter()
        .append('option')
        .attr('value', function(d) {
          return d.cert_board;
        })
        .text(function(d) {
          return d.cert_board;
        })

    selectButton = d3.select('body')
      .append('button', 'select')
      .attr('name', 'button')
      .text('Go')
  });

  d3.csv('/js/data/do-members-in-practice-2014-04-11.csv', function(error, data) {

    dataset = data;
    console.log(dataset);
  

    d3.json('/js/data/us-states.json', function(error, json) {

      // get rid of puerto rico
      json.features = json.features.filter(function(f) {
        return f.properties.name !== 'Puerto Rico';
      })
      // set up 

      //merge practice-loc data and geojson
      // loop through for each 
      for (var i = 0; i < data.length; i++) {

        // grab the state name at hand
        var dataState = data[i].full_state;
        
        // grab the data
        var dataValue = stateCounts[dataState];

        // find the corresponding state inside the geojson
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.name;
          if (jsonState === dataState) {
            json.features[j].properties.value = dataValue;
          }
        }
      }

    console.log(json.features);

    states = svg.selectAll('path')
      .data(json.features, function(d) {
        return d.properties.name;
      })
      .enter()
        .append('path')
        .attr('class', 'state')
        .attr('id', function(d) {
          return d.properties.name;
        })
        .attr('d', path)
//        .style('fill', function(d) {
//          
//          if (d.properties.value) {
//            return color(d.properties.value);
//          } else {
//            return '#ccc';
//          }
//        })
        .style('stroke', '#aaa')

      selectButton
        .on('click', function() {
          // get an array of the option elements
          var options = document.getElementById('specialtyDropdown').options;
          // figure out the index of the selected option
          var selectedIndex = options.selectedIndex;
          // pass the text value of that to showSpecialty() 
          showSpecialty(options[selectedIndex].text);
        });


  
    });; // end d3.json()
  }); // end d3.csv()

  function showSpecialty(s) {
    // gather all the pri_cert values for the passed specialty
    stateCounts = {};
    var priCert = [];
    for (var i = 0; i < specialties.specialties.length; i++) {
      if (specialties.specialties[i].cert_board == s) {
        priCert = specialties.specialties[i].pri_cert;
      }
    }
    
    dataset.forEach(function(d) {
      if (priCert.indexOf(d.maj_prac_focus) == 0) {
        if (stateCounts[d.full_state]) {
          stateCounts[d.full_state]++;
        } else {
          stateCounts[d.full_state] = 1;
        }
      }
    });
    
    color
      .domain(d3.extent(d3.values(stateCounts)));
    
    console.log(d3.entries(stateCounts));

    
    states
      .data(d3.entries(stateCounts), function(d) {
        return d.properties.name;
      })
      .enter()
        .append('path')
        .style('fill', function(d) {
          console.log(d);
          return color(d.value);
        })
    

    console.log(states);
  }

//});
