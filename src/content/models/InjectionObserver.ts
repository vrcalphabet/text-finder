export default class InjectionObserver {
  public static observe(target: Node, callback: () => boolean): void {
    const observer = new MutationObserver(() => {
      const disconnect = callback();
      if (disconnect) observer.disconnect();
    });
    
    observer.observe(target, { childList: true });
  }
}