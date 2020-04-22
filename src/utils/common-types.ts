export interface Node {
  name: string;
  id: string;
  numberOfLinks: number;
}

export interface Link {
  source: string;
  target: string;
  name: string;
}

export interface Data {
  nodes: Node[];
  links: Link[];
}
