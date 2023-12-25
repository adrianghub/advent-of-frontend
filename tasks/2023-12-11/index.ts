export interface WeightedGraph {
  [key: string]: { [key: string]: number };
}

export function findShortestPath(
  graph: WeightedGraph,
  startNode: string,
  endNode: string
): string[] | null {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const nodes: string[] = [];

  if (!graph[startNode] || !graph[endNode]) {
    throw new Error("Invalid or non-existent route");
  }

  Object.keys(graph).forEach((node) => {
    if (node === startNode) {
      distances[node] = 0;
    } else {
      distances[node] = Infinity;
    }
    previous[node] = null;
    nodes.push(node);
  });

  while (nodes.length) {
    const smallest = nodes.sort((a, b) => distances[a] - distances[b])[0];
    if (smallest === endNode) {
      const path = [];
      let node = endNode;
      while (node) {
        path.push(node);
        node = previous[node] as string;
      }
      return path.reverse();
    }
    if (distances[smallest] === Infinity) {
      break;
    }
    nodes.splice(nodes.indexOf(smallest), 1);

    Object.keys(graph[smallest]).forEach((neighbor) => {
      const alt = distances[smallest] + graph[smallest][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = smallest;
      }
    });
  }

  return null;
}
