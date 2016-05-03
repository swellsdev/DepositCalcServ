
    
var chart;
var data = [4, 8, 15, 90, 16, 23, 42];
$(document).ready(function(){
    chart = new OneBarChart(data,".chart");
});

function OneBarChart(data,selector)
{   
    function translateFunc(d, i)
    { 
        var marginLeft = getWidthBeforeElement(data,i);
        return "translate("+xScale(marginLeft)+"," + barHeight + ")"; 
    }
    
    function getWidthBeforeElement(data,element)
    {
        var width = 0;
        if(element != 0)
        {
            for(i=0; i < element; i++)
            {
                width += data[i];
            }        
        }
        return width;
    }
    
    var width = 420;
    var barHeight = 60; 
    var data = data.sort(function(a, b){return a-b});
    
    var xScale = d3.scale.linear()
        .domain([0, d3.sum(data)])
        .range([0, width]);       
    
    var chart = d3.select(selector)
        .attr("width", width)
        .attr("height", barHeight * data.length);
    
    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", translateFunc);
        
    bar.append("rect")
        .attr("width", xScale)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", $.proxy(function(d) { return xScale(d) - 3; },this))
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
}

