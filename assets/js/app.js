// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 100,
  left: 100
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

var category = [
  "poverty", "povertyMoe", "age", "ageMoe", "income", "incomeMoe", "healthcare", "healthcareLow", "healthcareHigh", "obesity", "obesityLow", "obesityHigh", "smokes", "smokesLow", "smokesHigh"];
// Load data from forcepoints.csv
d3.csv("assets/data/data.csv").then(function (healthRisk) {
  var xcat = "poverty";
  var ycat = "healthcare";
  // Format the date and cast the force value to a number
  healthRisk.forEach(function (data) {

    for (var i = 0; i < category.length; i++) {
      data[category[i]] = +data[category[i]];
    };
  });

  // Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthRisk, data => data.poverty) * 0.9, d3.max(healthRisk, data => data.poverty) + 2])
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthRisk, data => data.healthcare) - 0.8, d3.max(healthRisk, data => data.healthcare) + 3])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);



  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("yaxis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("xaxis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
  //set x axis labels
  //poverty
  chartGroup.append("text")
    .classed("xaxisTitle", true)
    .attr("id", "Poverty")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-weight", 900)
    .text("In Poverty (%)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".xaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      xcat = category[0];
      updateXData(category[0]);

    });

  //age
  chartGroup.append("text")
    .classed("xaxisTitle", true)
    .attr("id", "Age")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + margin.bottom / 2 + 20)
    .attr("text-anchor", "middle")
    .attr("fill", "#d0d0d0")
    .attr("font-weight", 900)
    .text("Age (Median)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".xaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      xcat = category[2];
      updateXData(category[2]);
    });

  //income
  chartGroup.append("text")
    .classed("xaxisTitle", true)
    .attr("id", "Income")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + margin.bottom / 2 + 40)
    .attr("text-anchor", "middle")
    .attr("fill", "#d0d0d0")
    .attr("font-weight", 900)
    .text("Household Income (Median)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".xaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      xcat = category[4];
      updateXData(category[4]);
    });

  //set y lables
  chartGroup.append("text")
    .classed("yaxisTitle", true)
    .attr("id", "Healthcare")
    .attr("y", -margin.left / 2)
    .attr("dx", -chartHeight / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "black")
    .attr("font-weight", 900)
    .text("Lack Healthcare (%)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".yaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      ycat = category[6];
      updateYData(category[6]);
    });

  chartGroup.append("text")
    .classed("yaxisTitle", true)
    .attr("id", "Smoke")
    .attr("y", -margin.left / 2 - 20)
    .attr("dx", -chartHeight / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "#d0d0d0")
    .attr("font-weight", 900)
    .text("Smoke (%)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".yaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      ycat = category[12];
      updateYData(category[12]);
    });

  chartGroup.append("text")
    .classed("yaxisTitle", true)
    .attr("id", "obesity")
    .attr("y", -margin.left / 2 - 40)
    .attr("dx", -chartHeight / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "#d0d0d0")
    .attr("font-weight", 900)
    .text("Obese (%)")
    .on("mouseover", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "grey");
      }
    })
    .on("mouseout", function () {
      var axisColor = d3.select(this).attr("fill");
      if (axisColor != "black") {
        d3.select(this)
          .attr("fill", "#d0d0d0");
      }
    })
    .on("click", function () {
      chartGroup.selectAll(".yaxisTitle").attr("fill", "#d0d0d0");
      d3.select(this)
        .attr("fill", "black");
      ycat = category[9];
      updateYData(category[9]);
    });

  //draw scatter plot
  var scatterPlot = chartGroup.append('g').classed("plotdata", true)
    .selectAll("dot")
    .data(healthRisk)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xLinearScale(d.poverty); })
    .attr("cy", function (d) { return yLinearScale(d.healthcare); })
    .attr("r", 11)
    .style("fill", "#59c3c9");

  var scatterPlot1 = chartGroup.select(".plotdata")
    .selectAll("dot")
    .data(healthRisk)
    .enter()
    .append("text")
    .classed("innerCircle", true)
    .attr("x", function (d) { return xLinearScale(d.poverty); })
    .attr("y", function (d) { return yLinearScale(d.healthcare) + 3; })
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-weight", 900)
    .text(d => d.abbr);

  // Step 1: Initialize Tooltip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([40, -60])
    .html(function (d) {
      return (`${d.state}<br>${xcat}: ${d[xcat]}<br>${ycat}: ${d[ycat]}`);
    });

  // Step 2: Create the tooltip in chartGroup.
  chartGroup.call(toolTip);

  // Step 3: Create "mouseover" event listener to display tooltip
  scatterPlot.on("mouseover", function (d) {
    toolTip.show(d, this);
  })
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function (d) {
      toolTip.hide(d);
    });

  scatterPlot1.on("mouseover", function (d) {
    toolTip.show(d, this);
  })
    .on("mouseout", function (d) {
      toolTip.hide(d);
    });


  //update Y axis function
  function updateYData(cat) {

    //update yscale
    yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthRisk, data => data[cat]) - 0.8, d3.max(healthRisk, data => data[cat]) + 3])
      .range([chartHeight, 0]);
    leftAxis = d3.axisLeft(yLinearScale);
    //update axis
    chartGroup.selectAll(".yaxis").remove();
    chartGroup.append("g")
      .classed("yaxis", true)
      .call(leftAxis);
    //update circle data
    scatterPlot = chartGroup.select(".plotdata")
      .selectAll("circle")
      .data(healthRisk).transition().duration(500);

    scatterPlot
      .attr("cy", function (d) { return yLinearScale(d[cat]); });

    scatterPlot1 = chartGroup.select(".plotdata")
      .selectAll("text")
      .data(healthRisk);

    scatterPlot1
      .attr("y", function (d) { return yLinearScale(d[cat]) + 3; })

   };

  function updateXData(cat) {

    //update xscale
    xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthRisk, data => data[cat]) * 0.9, d3.max(healthRisk, data => data[cat]) + 2])
      .range([0, chartWidth]);
    bottomAxis = d3.axisBottom(xLinearScale);
    //update axis
    chartGroup.selectAll(".xaxis").remove();
    chartGroup.append("g")
      .classed("xaxis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
    //update circle data
    scatterPlot = chartGroup.select(".plotdata")
      .selectAll("circle")
      .data(healthRisk).transition().duration(500);

    scatterPlot
      .attr("cx", function (d) { return xLinearScale(d[cat]); });

    scatterPlot1 = chartGroup.select(".plotdata")
      .selectAll("text")
      .data(healthRisk);

    scatterPlot1
      .attr("x", function (d) { return xLinearScale(d[cat]); });

  };

}).catch(function (error) {
  console.log(error);
});

