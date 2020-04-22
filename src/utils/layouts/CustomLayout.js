export default function() {
  function generate(data, options) {
    // let us first find the origin node. Origin node is the node which does not have any source
    let currentNode = "node-0";
    let distance = 350;
    let nodeWidth = 100;
    let nodeHeight = 30;
    let leftHeightConsumtion = 0;
    let rightHeightConsumtion = 0;
    let leftColumn = 1;
    let rightColumn = 1;

    let margin = 50;

    const { links, nodes } = data;

    let nodeObj = {};
    // Create a node object so that any node can accessed quickly.

    nodes.map(node => {
      nodeObj[node.id] = node;
    });

    console.log(options.graph);
    console.log("Width of the node");

    let origin = options.width / 2;
    let nodeArranged = [];
    nodeObj[currentNode].x = origin;
    nodeObj[currentNode].y = options.height / 2;
    //  nodeObj[currentNode].anchorPoints = [
    //    [0, 0.5],
    //    [1, 0.5]
    //  ];
    nodeArranged.push(currentNode);
    let newEdges = links.map(link => {
      let currEdge = link;
      const typeNode = currentNode === link.source ? "input" : "output";
      if (typeNode === "input") {
        console.log(
          `The left : ${leftHeightConsumtion} and the right : ${rightHeightConsumtion}`
        );
        //For all the nodes on the left
        // if we have already consumed a column.
        if (leftHeightConsumtion > options.height - margin - nodeHeight) {
          leftColumn++;
          leftHeightConsumtion = 0;
        }

        if (rightHeightConsumtion > options.height - margin - nodeHeight) {
          rightColumn++;
          rightHeightConsumtion = 0;
        }
        if (
          link.target !== currentNode &&
          !nodeArranged.includes(link.target)
        ) {
          leftHeightConsumtion = leftHeightConsumtion + margin + nodeHeight;

          nodeObj[link.target].x = origin + leftColumn * distance;
          nodeObj[link.target].y = leftHeightConsumtion;
          //nodeObj[link.target].anchorPoints = [[0, 0.5]];

          nodeArranged.push(link.target);
        }
        currEdge = {
          ...link
        };
      } else {
        if (
          link.source !== currentNode &&
          !nodeArranged.includes(link.source)
        ) {
          rightHeightConsumtion = rightHeightConsumtion + margin + nodeHeight;
          nodeObj[link.source].x = origin - rightColumn * distance;
          nodeObj[link.source].y = rightHeightConsumtion;

          //  nodeObj[link.source].anchorPoints = [[1, 0.5]];

          nodeArranged.push(link.source);
        }
        currEdge = {
          ...link
        };
      }
      return {
        ...currEdge,
        shape: "CurvedEdge"
      };
    });

    let newNodes = Object.values(nodeObj);
    console.log(newNodes);
    return {
      data: {
        ...data,
        nodes: newNodes,
        links: newEdges
      }
    };
  }

  return customLayout;
}
