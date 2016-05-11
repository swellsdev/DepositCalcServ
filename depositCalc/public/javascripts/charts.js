
    
var chart;
var data = [4, 8, 15, 90, 16, 23, 42];
$(document).ready(function(){
    chart = new OneBarChart(data,".chart");
});

function OneBarChart(data,selector)
{   
    function translateFunc(d, i)
    { 
        var marginBottom = getMarginBeforeElement(data,i);
        return "translate("+ 0 +"," + xScale(marginBottom) + ")"; 
    }
    
    function getMarginBeforeElement(data,element)
    {
        var margin = 0;
        if(element != 0)
        {
            for(i=0; i < element; i++)
            {
                margin += data[i];
            }        
        }
        return margin;
    }
    
    var width = 60;
    var height = 420; 
    var data = data.sort(function(a, b){return a-b});
    
    var xScale = d3.scale.linear()
        .domain([0, d3.sum(data)])
        .range([0, height]);       
    
    var chart = d3.select(selector)
        .attr("width", width)
        .attr("height", height);
    
    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", translateFunc);
        
    bar.append("rect")
        .attr("width", width)
        .attr("height", xScale);

    bar.append("text")
        .attr("x", width / 2)
        .attr("y", $.proxy(function(d) { return xScale(d) / 2; },this))
        .attr("dy", ".35em")
        .text(function(d) { return d; });
}

