/**
 * jsdom does not implement IntersectionObserver, which Motion's `whileInView`
 * requires. Without it, any component wrapped in the Reveal primitives throws
 * during render.
 *
 * The stub reports an immediate intersection so components settle into their
 * visible state, which is the state assertions care about.
 */
class ImmediateIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [0];

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.callback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  ImmediateIntersectionObserver as unknown as typeof IntersectionObserver;
