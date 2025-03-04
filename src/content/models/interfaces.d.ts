export interface IRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface INodeData {
  target: HTMLElement | SVGElement | Text;
  xpath: IXpathData[];
  title: string | void;
  placeholder: string | void;
  textContent: string | void;
  sizes: IRectangle[];
}

export interface IXpathData {
  target: Node;
  value: string;
  sizes: IRectangle[];
}
