type NthDVector<D extends number> = [number, ...number[]] & { length: D };

type DistanceFunction<D extends number> = (v1: NthDVector<D>, v2: NthDVector<D>) => number;

type ProximitreeNodeID = string;

interface ProximitreeNode<D extends number> {
  id?: ProximitreeNodeID,
  nearby?: ProximitreeNodeID[]
  position: NthDVector<D>
};

interface ProximitreeNodes<D extends number> {
  [id: string]: ProximitreeNode<D>
}

interface ProximitreeInterface<D extends number> {
  add: (node: ProximitreeNode<D> | undefined) => ProximitreeInterface<D>,
  find: (node: ProximitreeNode<D> | undefined, visited?: Set<ProximitreeNodeID>) => ProximitreeNode<D> | undefined
}

interface ProximitreeArguments<D extends number> {
  nodes?: ProximitreeNodes<D>,
  distance?: DistanceFunction<D>,
  proximity?: number
}

const defaultProximitreeArguments = {
  nodes: {},
  distance: (positionA, positionB) => {
    return Math.sqrt(
      positionA.reduce((sum, curA, i) => {
        const curB = positionB[i];
        return sum + (curB - curA)**2;
      }, 0)
    );
  },
  proximity: 1
};

export const Proximitree = <D extends number = 2>(
  { nodes, distance, proximity }: ProximitreeArguments<D> = defaultProximitreeArguments
): ProximitreeInterface<D> => {

  const find = (node, visited = new Set([])) => {
    const ids = Object.keys(nodes);
    const rndId = ids[Math.floor(Math.random() * ids.length)];
    return nodes[rndId];
  };

  const add = node => {

    return Proximitree<D>({ nodes, distance, proximity });
  };

  return { add, find };
};