export function findCyclesBetweenLocations(
  graph: Record<string, string[]>
): string[][] {
  const visited: Record<string, boolean> = {};
  const cycles: string[][] = [];

  const visit = (node: string, path: string[] = []) => {
    if (!graph[node]) {
      throw new Error("Invalid graph: missing nodes");
    }

    if (visited[node]) {
      if (path.includes(node)) {
        cycles.push([...path, node]);
      }
      return;
    }

    visited[node] = true;

    graph[node].forEach((neighbor) => visit(neighbor, [...path, node]));
  };

  Object.keys(graph).forEach((node) => visit(node));

  return cycles;
}
