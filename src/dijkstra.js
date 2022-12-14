
// class Dijkstra {
//     /**
//      * @param {*[][]} matrix, 2d representation of the map dijkstra will find the path on
//      * @param {MatrixPoint} start
//      * @param {MatrixPoint} end
//      */
//     constructor(matrix, start, end){
//         this.graph = matrix;
//         this.start = start;
//         this.end = end;
//     }

import { Logger } from "./helper";


// }

class DijkstraGraph {
    /**
     * 
     * @param {DijkstraNode[]} nodes - points in the graph
     * @param {DijkstraEdge[]} edges - lines between nodes
     */
    constructor(nodes, edges){
        this.nodes = nodes;
        this.edges = edges;
    }

    edgesForNode(node) {
        return this.edges.filter(e => e.source == node);    
    }
}

class DijkstraNode {
    /**
     * 
     * @param {String} id 
     * @param {*} meta
     */
    constructor(id, meta){
        this.id = id;
        this.meta = meta
    }
}

class DijkstraEdge {
    /**
     * 
     * @param {DijkstraNode} source 
     * @param {DijkstraNode} target 
     * @param {number} distance
     */
    constructor(source, target, distance){
        this.source = source
        this.target = target
        this.distance = distance
    }
}

function dijkstraShortestPath(graph, source, target, logger){
    // let toVisit = graph.nodes.slice()

    let visited = new Map();
    let current = source

    visited.set(source, {distance: 0, path: [source]})
    
    while (!visited.get(target)) {
        // visit nodes while no path to target
        let edgesToVisit = graph.edgesForNode(current);
        let [currentDistance, path] = visited.get(current);
        // visit nodes neighbours
        for (let edge of edgesToVisit) {
            const newPath = path.concat(edge.target);
            const newDistance = currentDistance + edge.distance;

            let existing = visited.get(edge.target);
            if (existing && existing.distance < newDistance) {
                logger.debug(`Existing path to node`, edge.target, `is smaller existing (${existing.distance} < ${newDistance}) new than the new distance, keeping path`)
            } else {
                visited.set(edge.target, {distance: newDistance, path: newPath});
                logger.debug(`Path to node`, edge.target, `new (${newDistance} < ${existing && existing.distance}) existing shorter than existing path`)
            }

            
        }
    }

}



/**
 * @typedef {Object} DijkstraPath 
 * 
 */

/**
 * @typedef {Object} MatrixPoint
 * @property {integer} x
 * @property {integer} y
 */