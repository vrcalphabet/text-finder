import { INodeData } from './interfaces';
import SizeCalculator from './SizeCalculator';
import XPathGenerator from './XpathGenerator';

interface IPosition {
  x: number;
  y: number;
}

export default class NodeFinder {
  private static readonly instance = new NodeFinder();
  public static getInstance(): NodeFinder {
    return this.instance;
  }

  private static ignoreTags = new Set(['IFRAME', 'NOSCRIPT', 'SCRIPT', 'TEXTAREA']);
  private root!: HTMLElement;
  private nodes: Map<Node, INodeData>;

  private constructor() {
    this.nodes = new Map();
  }

  public findNodes(root: HTMLElement): INodeData[] {
    this.nodes.clear();
    if (!root) return [];

    this.root = root;
    this.recursive(root);
    return [...this.nodes.values()];
  }

  private recursive(node: Node): void {
    if (node instanceof Text) {
      this.checkText(node);
    } else if (node instanceof HTMLElement) {
      const hasTextContent = this.isSingleText([...node.childNodes]);
      this.checkElement(node, hasTextContent);

      if (hasTextContent || NodeFinder.ignoreTags.has(node.tagName)) {
        return;
      }

      node.childNodes.forEach((childNode) => {
        this.recursive(childNode);
      });
    } else if (node instanceof SVGElement) {
      this.checkTitle(node);
    }
  }

  private isSingleText(nodes: Node[]): boolean {
    const isContainsElement = nodes.some((node) => !(node instanceof Text));
    if (isContainsElement) return false;

    const textNodes = nodes.filter(
      (node) => node instanceof Text && this.isNonEmptyString(node.nodeValue!)
    );
    return textNodes.length === 1;
  }

  private checkText(node: Text): void {
    if (this.isNonEmptyString(node.nodeValue!) && this.checkVisible(node.parentElement!)) {
      this.addTextMetadata(node);
    }
  }

  private isNonEmptyString(value: string): boolean {
    return value.trim().length > 0;
  }

  private checkElement(node: HTMLElement, hasTextContent: boolean): void {
    if (this.checkVisible(node) && (hasTextContent || this.hasAttribute(node))) {
      this.addHTMLElementMetadata(node, hasTextContent);
    }
  }

  private checkTitle(node: SVGElement): void {
    if (this.hasTitleElement(node) && this.checkVisible(node)) {
      this.addSVGTitleMetadata(node, this.getTitleElement(node)!);
    }
  }

  private hasTitleElement(node: SVGElement): boolean {
    return !!this.getTitleElement(node);
  }

  private getTitleElement(node: SVGElement): HTMLElement | void {
    return node.querySelector<HTMLElement>(':scope > title') ?? void 0;
  }

  private hasAttribute(node: HTMLElement): boolean {
    return node.hasAttribute('title') || node.hasAttribute('placeholder');
  }

  private checkVisible(node: HTMLElement | SVGElement): boolean {
    return this.isVisible(node) && this.isElementInFront(node);
  }

  private isVisible(node: HTMLElement | SVGElement): boolean {
    // 要素がdisplay:noneの場合もwidthとheightが0になる
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  private isElementInFront(node: HTMLElement | SVGElement): boolean {
    const centerPos = this.calcCenterPos(node);
    const element = document.elementFromPoint(centerPos.x, centerPos.y);
    if (!element) return false;

    return this.getAncestors(element).includes(node);
  }

  private getAncestors(node: Element): Element[] {
    const ancestors: Element[] = [];
    let current: Element | null = node;

    while (current) {
      ancestors.unshift(current);
      current = current.parentElement;
    }
    return ancestors;
  }

  private calcCenterPos(node: HTMLElement | SVGElement): IPosition {
    const { left, top, width, height } = node.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  private addMetadata(metadata: INodeData): void {
    const oldMetadata = this.nodes.get(metadata.target);
    if (oldMetadata) {
      const newMetadata: INodeData = {
        target: oldMetadata.target,
        xpath: metadata.xpath ?? oldMetadata.xpath,
        title: metadata.title ?? oldMetadata.title,
        placeholder: metadata.placeholder ?? oldMetadata.placeholder,
        textContent: metadata.textContent ?? oldMetadata.textContent,
        sizes: [...oldMetadata.sizes, ...metadata.sizes],
      };
      this.nodes.set(metadata.target, newMetadata);
    } else {
      this.nodes.set(metadata.target, metadata);
    }
  }

  private addSVGTitleMetadata(svg: SVGElement, title: HTMLElement): void {
    this.addMetadata({
      target: svg,
      xpath: XPathGenerator.getInstance().generate(this.root, svg),
      title: void 0,
      placeholder: void 0,
      textContent: this.validateText(title.textContent),
      sizes: SizeCalculator.calculate(svg),
    });
  }

  private addTextMetadata(node: Text): void {
    this.addMetadata({
      target: node,
      xpath: XPathGenerator.getInstance().generate(this.root, node),
      title: void 0,
      placeholder: void 0,
      textContent: this.validateText(node.nodeValue),
      sizes: SizeCalculator.calculate(node),
    });
  }

  private addHTMLElementMetadata(node: HTMLElement, hasTextContent: boolean): void {
    this.addMetadata({
      target: node,
      xpath: XPathGenerator.getInstance().generate(this.root, node),
      title: this.validateText(node.getAttribute('title')),
      placeholder: this.validateText(node.getAttribute('placeholder')),
      textContent: hasTextContent ? this.validateText(node.textContent) : void 0,
      sizes: SizeCalculator.calculate(node),
    });
  }

  private validateText(text: string | null): string | void {
    if (!text) return;
    return text.trim().replaceAll('\n', '\\n');
  }
}
