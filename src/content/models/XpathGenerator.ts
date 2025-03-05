import { IRectangle, IXpathData } from './interfaces';
import SizeCalculator from './SizeCalculator';

export default class XPathGenerator {
  private static INSTANCE: XPathGenerator = new XPathGenerator();
  public static getInstance(): XPathGenerator {
    return this.INSTANCE;
  }

  private classNamePattern = /^e[a-z0-9]+\d$/;
  private target!: Node;
  private root!: HTMLElement;

  public generate(root: HTMLElement, target: Node): IXpathData[] {
    this.root = root;
    this.target = target;
    const path = this.createPath();
    this.setXPath(path);

    return path;
  }

  private createPath(): IXpathData[] {
    const path: IXpathData[] = [];
    let current: Node = this.target;
    while (true) {
      if (!current || current === this.root) {
        break;
      }

      if (current instanceof Text) {
        path.unshift({
          target: current,
          value: '',
          size: null,
          otherSizes: [],
        });
      } else {
        const children = current.parentElement!.children;
        const filteredChildren = [...children].filter((child) => child !== current);

        path.unshift({
          target: current,
          value: current.parentElement! === document.body ? '::' : '',
          size: SizeCalculator.calculate(current)[0],
          otherSizes: filteredChildren.map((child) => SizeCalculator.calculate(child)[0]),
        });
      }

      current = current.parentElement!;
    }
    return path;
  }

  private setXPath(path: IXpathData[]): void {
    for (const p of path) {
      this.setPartialXPath(p);
    }
  }

  private setPartialXPath(node: IXpathData): void {
    if (node.target instanceof Text) {
      node.value += this.getPartialTextXPath(node.target);
    } else {
      node.value += this.getPartialElementXPath(node.target as Element);
    }
  }

  private getPartialTextXPath(node: Text): string {
    const siblings = this.getChildTextNodes(node.parentElement!);
    const index = siblings.indexOf(node);
    return `/text()[${index + 1}]`;
  }

  private getPartialElementXPath(node: Element): string {
    const tagName = node.tagName.toLowerCase();
    const className = this.getUniqueClassName(node);
    const siblings = this.getChildElements(node.parentElement!, tagName, className);

    if (node.id !== '') {
      return `//${tagName}#${node.id}`;
    }

    const index = siblings.indexOf(node);
    if (className) {
      return `/${tagName}.${className}[${index + 1}]`;
    }
    return `/${tagName}[${index + 1}]`;
  }

  private getChildTextNodes(node: Element): Text[] {
    return [...node.childNodes].filter((child) => child instanceof Text);
  }

  private getChildElements(node: Element, tagName: string, className?: string): Element[] {
    return [...node.children].filter(
      (child) =>
        child.tagName.toLowerCase() === tagName &&
        (className ? child.classList.contains(className) : true)
    );
  }

  private getUniqueClassName(node: Element): string | undefined {
    const classNames = [...node.classList];
    const uniqueClassName = classNames.find((className) => this.classNamePattern.test(className));

    return uniqueClassName;
  }
}
