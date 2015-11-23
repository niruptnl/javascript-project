var margin={top:20,right:10,bottom:100,left:75}

var w = 1000-margin.right-margin.left;
var h = 500-margin.top-margin.bottom;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, w], 0.07,0.2);

var yScale = d3.scale.linear()
    .range([h, 0]);



var xaxis=d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

var yaxis=d3.svg.axis()
        .scale(yScale)
        .orient("left");

    /* Loading GDP DATA JSON ////////////////////////////////////////////////////////////////*/

d3.json("json/gdpdata.json",function(json){

  var data=json.GDP_DATA;
  var svg = d3.select(".gdp-plot")
    .append("svg")
    .attr("width", w + margin.right+ margin.left)
    .attr("height", h + margin.top+ margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+','+margin.right+")");

    var colorscale = d3.scale.linear()
                    .domain([0,d3.max(data, function(d) {return d.gdp;})])
                    .range(["red","green","lightblue"]);

    data.sort(function (a, b) {
        return b.gdp - a.gdp;
    });

    xScale.domain(data.map(function(d){return d.country_name;}));
    yScale.domain([0, d3.max(data, function(d) {return d.gdp;})]);


    svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("height",0)
     .attr("y",h)
     .transition().duration(1000)
     .delay(function(d,i){return i*20;})
     .attr("x", function(d, i) {
      return xScale(d.country_name);
     })
     .attr("y", function(d) {
      return yScale(d.gdp);
     })
     .attr("width", xScale.rangeBand())
     .attr("height", function(d) {
      return h-yScale(d.gdp);
     })
     .attr("fill", "steelblue")
     .style("backgroung","1px dotted black");


    // svg.selectAll("text")
    //  .data(data)
    //  .enter()
    //  .append("text")
    //  .text(function(d) {
    // 	return d.gdp;
    //  })
    //  .attr("text-anchor", "middle")
    //  .attr("x", function(d, i) {
    // 	return xScale(d.country_name) + xScale.rangeBand() / 2;
    //  })
    //  .attr("y", function(d,i) {
    // 	return yScale(d.gdp)-2;
    //  })
    //  .attr("font-family", "sans-serif")
    //  .attr("font-size", "11px")
    //  .attr("font-weight", "bold")
    //  .attr("fill", "black");

    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,"+ h +")")
        .call(xaxis)
        .selectAll("text")
        .attr("transform","rotate(-60)")
        .attr("dx","-.8em")
        .attr("dy",".25em")
        .style("text-anchor","end")

    svg.append("g")
        .attr("class","y axis")
        .call(yaxis)
        .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -90)
  .attr("dy", "1.75em")
  .style("text-anchor", "end")
  .text("GDP in Billion Dollars");
});

 /*Second script///////////////////////////////////////////////// */
 d3.json("json/populationdata.json",function(json){

   var data=json.Population_DATA;
   var svg = d3.select(".population-plot")
     .append("svg")
     .attr("width", w + margin.right+ margin.left)
     .attr("height", h + margin.top+ margin.bottom)
     .append("g")
     .attr("transform","translate("+margin.left+','+margin.right+")");

     var colorscale = d3.scale.linear()
                     .domain([0,d3.max(data, function(d) {return d.population;})])
                     .range(["red","green","lightblue"]);

     data.sort(function (a, b) {
         return b.population - a.population;
     });

     xScale.domain(data.map(function(d){return d.country_name;}));
     yScale.domain([0, d3.max(data, function(d) {return d.population;})]);


     svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("height",0)
      .attr("y",h)
      .transition().duration(1000)
      .delay(function(d,i){return i*20;})
      .attr("x", function(d, i) {
      return xScale(d.country_name);
      })
      .attr("y", function(d) {
      return yScale(d.population);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
      return h-yScale(d.population);
      })
      .attr("fill", "steelblue");


    //  svg.selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .text(function(d) {
   // 		return d.population;
    //   })
    //   .attr("text-anchor", "middle")
    //   .attr("x", function(d, i) {
   // 		return xScale(d.country_name) + xScale.rangeBand() / 2;
    //   })
    //   .attr("y", function(d,i) {
   // 		return yScale(d.population)-2;
    //   })
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "11px")
    //   .attr("font-weight", "bold")
    //   .attr("fill", "black");

     svg.append("g")
         .attr("class","x axis")
         .attr("transform","translate(0,"+ h +")")
         .call(xaxis)
         .selectAll("text")
         .attr("transform","rotate(-60)")
         .attr("dx","-.8em")
         .attr("dy",".25em")
         .style("text-anchor","end")

     svg.append("g")
         .attr("class","y axis")
         .call(yaxis)
         .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", -90)
   .attr("dy", "1.75em")
   .style("text-anchor", "end")
   .text("Population in Billions");
 });
