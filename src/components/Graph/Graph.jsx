import * as React from "react";
import * as d3 from "d3";
import { data } from "../../utils/sample-data";
import transformData from "../../utils/transformData";
import { forceManyBody, forceCollide } from "d3";

class Graph extends React.Component {
  static defaultProps = {
    lineageData: data,
    activeNode: data.baseEntityGuid
  };

  constructor(props) {
    super(props);

    this.state = {
      graphData: {},
      r: 30
    };

    this.SVGRef = React.createRef();
    this.tooltipRef = React.createRef();
  }

  updateNodesAndLinks = nodeContext => {
    console.log(nodeContext);

    let currentNode = nodeContext.getAttribute("data-nodeId");

    //debugger;
    let newData = transformData(data, currentNode, "all");
    console.log(newData);

    //check if newnodes already exist if yes, remove them
    let newNodes = newData.nodes.filter(node => {
      //check this particular node is in main array

      let result = this.state.graphData.nodes.filter(stateNode => {
        return stateNode.id === node.id;
      });

      return result.length > 0 ? false : true;
    });

    let newLinks = newData.links.filter(testLink => {
      let result = this.state.graphData.links.filter(stateLink => {
        return (
          testLink.source === stateLink.source &&
          testLink.target === stateLink.target &&
          testLink.name === stateLink.name
        );
      });
      //if exists return false;
      return result.length > 0 ? false : true;
    });

    this.setState({
      graphData: {
        nodes: [...this.state.graphData.nodes, ...newNodes],
        links: [...this.state.graphData.links, ...newLinks]
      },
      r: 30
    });
  };

  svgDefns = () => {
    const context = d3.select(this.SVGRef.current);

    //    context
    //      .select("svg")
    //      .append("defs")
    //      B
    //      .append("marker")
    //      .attr(("id", "arrow-head"))
    //      .attr("viewbox", "0 -5 10 10")
    //      .attr("refX", 13)
    //      .attr("refY", 0)
    //      .attr("orient", "auto")
    //      .attr("markerWidth", 13)
    //      .attr("markerHeight", 13)
    //      .attr("xoverflow", "visible")
    //      .append("path")
    //      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
    //      .attr("fill", "#999");
  };
  componentDidMount() {
    console.log("Console mounted");

    this.svgDefns();

    let newdata = transformData(
      this.props.lineageData,
      this.props.activeNode,
      "nodes"
    );

    console.log(newdata);
    this.setState({
      graphData: { ...newdata }
    });
  }

  nodeClickHandler = (context, handler) => {
    console.log(context);
    //debugger;
    handler(context.getAttribute("data-nodeId"));
  };

  hideTooltip = (node, index) => {
    console.log("mouseout fired");
    let div = d3.select(this.tooltipRef.current);
    div = div.transition(200);
    div
      .style("opacity", 0)
      .style("top", 0)
      .style("left", 0);
  };
  displayTooltip = (node, index) => {
    console.log("mouseoverFired");
    let div = d3.select(this.tooltipRef.current);

    div.transition(200).style("opacity", 0.8);

    div
      .html(node.name)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  };

  componentDidUpdate() {
    console.log("Component Updated");

    const context = d3.select(this.SVGRef.current);

    let t = context.transition().duration(100);

    let { width, height } = this.SVGRef.current;

    console.log(width, height);

    const { nodes, links } = this.state.graphData;

    console.log(nodes);
    console.log(links);
    //debugger;

    //Creating the marker

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(d => d.id)
          .distance(d => 250)
      )
      /*
       *.force("charge", d3.forceManyBody())
       */

      /*
       *.force("center", d3.forceCenter(500, 500))
       */
      .force("repulsion", forceManyBody().strength(2))
      .force(
        "collide",
        forceCollide(function(d, i, g) {
          return Math.random();
        })
      );

    const node = context
      .selectAll(".nodes")
      .selectAll("circle")
      .data(nodes)
      .join(
        enter => {
          return enter
            .append("circle")
            .attr("r", 30)
            .attr("fill", "red")
            .attr("data-nodeId", d => d.id)
            .call(
              d3
                .drag()
                .on("start", dragStarted)
                .on("drag", draggingHandler)
                .on("end", dragEnded)
            )
            .on(
              "click",
              (() => {
                let updateHandler = this.updateNodesAndLinks;
                return function handleclick() {
                  console.log(this);

                  d3.select(this).on("click", null);
                  updateHandler(this);
                };
              })()
            )
            .on("mouseover", this.displayTooltip)
            .on("mouseout", this.hideTooltip);
        },

        update => {
          return update
            .transition(t)
            .attr("r", 30)
            .attr("fill", "green");
        },
        exit => {
          return exit.remove();
        }
      );
    console.log(node);
    const link = context
      .selectAll(".links")
      .selectAll("path")
      .data(links)
      .join(
        enter =>
          enter
            .append("path")
            .attr("id", (d, i) => {
              return "link-" + i;
            })
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 5)
            .attr("marker-end", "url(#arrow)"),
        update => update.attr("fill", "none"),
        exit => exit.attr("fill", "brown").call(exit => exit.remove())
      );

    const linkLabels = context
      .selectAll(".texts")
      .data(links)
      .join(
        enter =>
          enter
            .append("text")
            .attr("class", "link-label")
            .attr("dx", 50)
            .attr("dy", -10)
            .style("fill", "red")
            .append("textPath")
            .style("fill", "black")
            .attr("xlink:href", (d, i) => "#link-" + i + "")
            .text((d, i) => d.name),
        update => update,
        exit => exit.remove()
      );

    console.log(link);

    console.log(nodes);
    simulation.nodes(nodes).on("tick", ticked);
    simulation.force("link").links(links);

    this.state.graphData.nodes[0].x = 500;
    this.state.graphData.nodes[0].y = 500;

    function dragStarted(d) {
      console.log("Drag is started");
      console.log(d);
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }

      d.fx = d.x;
      d.fy = d.y;
    }

    function draggingHandler(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    function ticked() {
      /*
       *      link
       *        .attr("x1", function (d) {
       *          return d.source.x;
       *        })
       *        .attr("y1", function (d) {
       *          return d.source.y;
       *        })
       *        .attr("x2", function (d) {
       *          return d.target.x;
       *        })
       *        .attr("y2", function (d) {
       *          return d.target.y;
       *        });
       *
       *      link
       *        .attr("x1", function (d) {
       *          return d.source.x;
       *        })
       *        .attr("y1", function (d) {
       *          return d.source.y;
       *        })
       *        .attr("x2", function (d) {
       *          let totalDistance = this.getTotalLength();
       *
       *          let backOffDist = 30 + 18;
       *
       *          let target = this.getPointAtLength(totalDistance - backOffDist);
       *
       *          return target.x;
       *        })
       *        .attr("y2", function (d) {
       *          let totalDistance = this.getTotalLength();
       *
       *          let backOffDist = 30 + 18;
       *
       *          let target = this.getPointAtLength(totalDistance - backOffDist);
       *
       *          return target.y;
       *        });
       *
       */
      link.attr("d", function(d) {
        console.log(d);

        let path =
          "M" +
          d.source.x +
          "," +
          d.source.y +
          " " +
          "Q" +
          d.source.x +
          "," +
          d.target.y +
          " " +
          d.target.x +
          "," +
          d.target.y;
        console.log(path);
        return path;
      });

      link.attr("d", function(d) {
        console.log(d);
        let totalDistance = this.getTotalLength();
        console.log(totalDistance);
        let r = 30 + 15;
        let m = this.getPointAtLength(totalDistance - r);
        console.log(m);

        let path =
          "M" +
          d.source.x +
          "," +
          d.source.y +
          " " +
          "Q" +
          d.source.x +
          "," +
          m.y +
          " " +
          m.x +
          "," +
          m.y;
        console.log(path);
        return path;
      });

      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <div
          className="tooltip"
          style={{
            position: "absolute",
            zIndex: 10,
            display: "inline-flex",
            backgroundColor: "white"
          }}
          ref={this.tooltipRef}
        ></div>
        <svg
          className="graph-area"
          ref={this.SVGRef}
          width={"100%"}
          height={"800px"}
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="30"
              markerHeight="30"
              refX="0"
              refY="15"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <polygon points="0 0,20 15, 0 30"></polygon>
            </marker>
          </defs>
          <g className="links"></g>
          <g className="texts"></g>
          <g className="nodes"></g>
        </svg>
      </React.Fragment>
    );
  }
}

export default Graph;
