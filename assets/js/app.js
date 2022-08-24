// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from forcepoints.csv
d3.csv("assets/data/data.csv").then(function(healthRisk) {

  // Format the date and cast the force value to a number
  healthRisk.forEach(function(data) {
    var category = [
        "poverty","povertyMoe","age","ageMoe","income","incomeMoe","healthcare","healthcareLow","healthcareHigh","obesity","obesityLow","obesityHigh","smokes","smokesLow","smokesHigh"];
    for (var i= 0;i<category.length;i++){
        data[category[i]] = +data[category[i]];
    };
  });

  // Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthRisk, data => data.poverty)-1, d3.max(healthRisk, data => data.poverty)+1])
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthRisk, data => data.healthcare)-0.8, d3.max(healthRisk, data => data.healthcare)+3])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);



  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("text")
  .classed("axisTitle", true)
  // .attr("dx", function (d) { return xLinearScale(d.poverty-0.1); } )
  // .attr("dy", function (d) { return yLinearScale(d.healthcare-0.1); } )
  .attr("x",chartWidth/2)
  .attr("y", chartHeight +margin.bottom/2+10)
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .attr("font-weight",900)
  .text("In Poverty (%)");

  chartGroup.append("text")
  .classed("axisTitle", true)
  // .attr("dx", function (d) { return xLinearScale(d.poverty-0.1); } )
  // .attr("dy", function (d) { return yLinearScale(d.healthcare-0.1); } )
  .attr("y", -margin.left /2)
  .attr("dx", -chartHeight/2 )
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("fill", "black")
  .attr("font-weight",900)
  .text("Lack Healthcare (%)");

  var scatterPlot = chartGroup.append('g')
  .selectAll("dot")
  .data(healthRisk);

  scatterPlot.enter()
  .append("circle")
  .attr("cx", function (d) { return xLinearScale(d.poverty); } )
  .attr("cy", function (d) { return yLinearScale(d.healthcare); } )
  .attr("r", 12)
  .style("fill", "#59c3c9");
 
  scatterPlot.enter()
  .append("text")
  .classed("innerCircle", true)
  // .attr("dx", function (d) { return xLinearScale(d.poverty-0.1); } )
  // .attr("dy", function (d) { return yLinearScale(d.healthcare-0.1); } )
  .attr("x",function (d) { return xLinearScale(d.poverty); })
  .attr("y", function (d) { return yLinearScale(d.healthcare) + 3; } )
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-weight",900)
  .text(d=>d.abbr);


}).catch(function(error) {
  console.log(error);
});
