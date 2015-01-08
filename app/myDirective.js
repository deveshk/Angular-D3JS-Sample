app.directive('mydirective', function () {
    return{
        restrict: 'E',
        scope: {
            val: "="
        },
        template: "<div id='d3Chart' class = 'row'></div>",
        link: function (scope, element, attrs) {

            scope.$watch('val', function (n, o) {

                if (!n || typeof (n[0]) === "undefined") {
                    return;
                }
                var yCount = n.length;
                // var yCount =10;
                var margin = {t: 30, r: 20, b: 20, l: 70}, width = 900,
                        height = 600;
                var w = width - margin.l - margin.r;
                var h = height - margin.t - margin.b;


                var y = d3.scale.linear().range([h - margin.t - margin.b, 0]);
                var x = d3.scale.linear().range([0, w - margin.r - margin.l]);

                var color = ["#6b486b", "#827A98", "#98abc5"];
                var getRanges = function (d) {
                    var e, p;
                    e = ((d.quantityExecuted / d.quantity)).toFixed(4);
                    p = ((d.quantityPlaced / d.quantity)).toFixed(4);
                    return [[0, e], [e, (p - e).toFixed(4)], [p, 1 - p]];
                };
                var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("top")
                        .tickSubdivide(true)
                        .tickFormat(d3.format(".0%"))
                        .ticks(3);
                var y_domain = [yCount, 0];

                var yAxis = d3.svg.axis()
                        .scale(y)
                        .ticks(0)
                        .tickSubdivide(true)
                        .orient("left");
                y.domain(y_domain);
                var svg = d3.select("#d3Chart").append("svg")
                        .attr("width", w)
                        .attr("height", h)
                        .attr("transform", "translate(0," + (margin.t) + ")");

                svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                        .call(xAxis);

                svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                        .call(yAxis);
                // function for the x grid lines
                function make_x_axis() {
                    return d3.svg.axis()
                            .scale(x)
                            .orient("bottom")
                            .ticks(5);
                }

                // function for the y grid lines
                function make_y_axis() {
                    return d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .ticks(5);
                }
                // Draw the x Grid lines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h + margin.t) + ")")
                        .call(make_x_axis()
                                .tickSize(-h, 0, 0)
                                .tickFormat("")
                                );

                // Draw the y Grid lines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h + margin.t) + ")")
                        .call(make_y_axis()
                                .tickSize(-w, 0, 0)
                                .tickFormat("")
                                );
                n.forEach(function (td, j) {
                    svg.append("g")
                            .append("text")
                            .text(td.id)
                            .attr("transform", "translate(" + (margin.l - 20) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");
                    svg.append("g")
                            .attr("transform", "translate(" + margin.l + "," + (y(j) + margin.t - Math.floor((w / yCount) / 2)) + ")")
                            .selectAll("rect")
                            .data(getRanges(td))
                            .enter()
                            .append("rect")
                            .attr("class", "bar")
                            .style("fill", function (d, i) {
                                return color[i];
                            })
                            .attr("width", function (d, i) {
                                return x(d[1]);
                            })
                            .attr("height", Math.floor((w / yCount) / 2))
                            .attr("transform", function (d) {
                                return "translate(" + x(d[0]) + "," + Math.floor((w / yCount) / 2) + ")";
                            });
                });
            }, true);
        }
    }
});