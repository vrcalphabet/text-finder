// オーバレイの重なりから面積が一番小さい要素を選択して返す
export default class OverlaySelector {
  public static select(
    root: Document | ShadowRoot,
    mouseX: number,
    mouseY: number
  ): HTMLElement | void {
    const elements = root.elementsFromPoint(mouseX, mouseY) as HTMLElement[];
    return this.selectOverlayBySize(this.filterOverlay(elements));
  }

  private static filterOverlay(elements: HTMLElement[]): HTMLElement[] {
    return elements.filter((element) => element?.dataset.overlayId !== void 0);
  }

  private static selectOverlayBySize(overlays: HTMLElement[]): HTMLElement | void {
    if (overlays.length === 0) return;

    const overlaySizes = overlays.map((overlay) => {
      const { width, height } = overlay.getBoundingClientRect();
      return { target: overlay, size: width * height };
    });
    const smallestOverlay = overlaySizes.reduce((prev, current) => {
      return prev.size < current.size ? prev : current;
    });

    return smallestOverlay.target.parentElement ?? void 0;
  }
}
