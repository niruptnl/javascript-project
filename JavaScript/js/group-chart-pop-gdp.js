  var margin = {top:20,right:10,bottom:100,left:75};
  var width = 1000 - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;
  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0,width], 0.5,0.05);
  var x1 = d3.scale.ordinal();
  var y = d3.scale.linear()
      .range([height,0]);

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#d0743c"]);

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select(".population-gdp-data")
                .append('svg')
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +")");


  d3.json("../json/continentlist.json", function(json) {
    var data = json.Continent_List_DATA;

    var dataNames = d3.keys(data[0]).filter(function(key) { return key !== "continent"; });

    data.forEach(function(d) {
        d.keys = dataNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(data.map(function(d) {return d.continent;}));
    x1.domain(dataNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0,d3.max(data, function(d) { return d3.max(d.keys, function(d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("dx", "0.75em")
        .attr("dy", "0.75em")
        .style("text-anchor", "middle")
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("GDP & Population Data");

    var continent = svg.selectAll(".continent")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.continent) + ",0)"; });

    continent.selectAll("rect")
        .data(function(d) { return d.keys; })
      .enter()
      .append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return (height - y(d.value)); })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
       .data(dataNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 25 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
           if(d=="gdp")
           {return "GDP in Billions";}
           else {
          {return "Population in Lakhs";}
           }
          });
  });
