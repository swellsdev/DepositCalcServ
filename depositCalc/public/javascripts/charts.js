
    
var chart;
var data = [4, 8, 15, 90, 16, 23, 42];
$(document).ready(function(){
    chart = new OneBarChart(data,".chart");
    
    data = [16, 80, 95];
    chart.redraw(data);
});

var OneBarChart = function(data,selector)
{   
this.translateFunc = function(d, i)
    { 
        var marginBottom = getMarginBeforeElement(this.data,i);
        var xScale = this.xScale;
        return "translate("+ 0 +"," + xScale(marginBottom) + ")"; 
    };

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
    };
    
   this.width = 60;
   this.height = 420; 
   this.data;
   this.xScale;
   this.chart;
   this.bar;
   this.selector = selector;
   this.redraw(data);
}

OneBarChart.prototype = function()
{
    
    
    
    
    var drawChart = function(newData)
    { 
        this.data = newData.sort(function(a, b){return a-b});
        
        this.xScale = d3.scale.linear()
            .domain([0, d3.sum(this.data)])
            .range([0, this.height]);       
        
        this.chart = d3.select(this.selector)
            .attr("width", this.width)
            .attr("height", this.height);
        
        this.chart.selectAll("g").remove();
        
        this.bar = this.chart.selectAll("g")
            .data(this.data)
          .enter().append("g")
            .attr("transform", this.translateFunc);
            
        this.bar.append("rect")
            .attr("width", this.width)
            .attr("height", this.xScale);

        this.bar.append("text")
            .attr("x", this.width / 2)
            .attr("y", $.proxy(function(d) { return this.xScale(d) / 2; },this))
            .attr("dy", ".35em")
            .text(function(d) { return d; });
    };
    
    return{
        redraw:drawChart
    }
}();




    