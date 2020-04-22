import { Data, Node, Link } from "./common-types";

export default function transformData(
  data: any,
  activeNode: string,
  mode: "nodes" | "links" | "all"
): Data | { nodes: Node[] } | { links: Link[] } {
  const nodesObj = data.guidEntityMap;
  const relations = data.relations;

  let resultData: Data = {
    nodes: [],
    links: []
  };

  if (mode === "nodes") {
    for (let node in nodesObj) {
      let currNode = nodesObj[node];
      let resultNode = {
        name: currNode.typeName,
        id: node,
        numberOfLinks: relations.reduce((accumulator: number, current: any) => {
          //        console.log(current);
          //      console.log(node);
          if ([current.fromEntityId, current.toEntityId].includes(node)) {
            accumulator++;
          }

          return accumulator;
        }, 0)
      };

      if (resultNode.id === activeNode) {
        return {
          nodes: [{ ...resultNode }],
          links: []
        };
      }
      resultData.nodes.push({ ...resultNode });
    }
  }

  resultData.nodes = [];

  if (mode === "all") {
    resultData.links = relations.map((relation: any) => {
      let currNode: any;
      if ([relation.fromEntityId, relation.toEntityId].includes(activeNode)) {
        //Look for those particular nodes which are either source and target and send them to
        if (relation.fromEntityId === activeNode) {
          //send the taget node information
          currNode = nodesObj[relation.toEntityId];
        } else {
          currNode = nodesObj[relation.fromEntityId];
        }

        let resultNode = {
          name: currNode.typeName,
          id: currNode.guid,
          numberOfLinks: relations.reduce(
            (accumulator: number, current: any) => {
              //        console.log(current);
              //      console.log(node);
              if (
                [current.fromEntityId, current.toEntityId].includes(
                  currNode.guid
                )
              ) {
                accumulator++;
              }

              return accumulator;
            },
            0
          )
        };

        resultData.nodes.push({ ...resultNode });
        /*
         *debugger;
         */
        return {
          source: relation.fromEntityId,
          target: relation.toEntityId,
          name: relation.relationType
        };
      }
    });
  }
  return {
    nodes: [...resultData.nodes],
    links: [...resultData.links.filter(elem => elem != undefined)]
  };
}
