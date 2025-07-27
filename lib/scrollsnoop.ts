import { throttle } from 'lodash-es';

class ScrollSnoop {
  private wrapper: HTMLElement;
  private overflowContainer: HTMLElement;
  private resizeObserver: ResizeObserver;

  /**
   * @description Creates a new ScrollSnoop instance.
   * @example
   * ```ts
   * const scrollSnoop = new ScrollSnoop(wrapper, overflowContainer);
   * ```
   * 
   * @param wrapper - The element that the CSS properties will be applied to.
   * @param overflowContainer - The overflowing container element.
   */
  constructor(wrapper: HTMLElement, overflowContainer: HTMLElement) {
    if (!wrapper) {
      throw new Error('A wrapper element must be provided');
    }

    if (!overflowContainer) {
      throw new Error('An overflow container element must be provided');
    }

    this.wrapper = wrapper;
    this.overflowContainer = overflowContainer;

    this.updateShadow = throttle(this.updateShadow.bind(this), 50);

    this.overflowContainer.addEventListener('scroll', this.updateShadow)
    
    this.resizeObserver = new ResizeObserver(this.updateShadow);
    this.resizeObserver.observe(this.wrapper);
    this.resizeObserver.observe(this.overflowContainer);

    this.updateShadow();
  }

  updateShadow() {
    const hasHorizontalScroll = this.overflowContainer.scrollWidth > this.overflowContainer.clientWidth;
    const hasVerticalScroll = this.overflowContainer.scrollHeight > this.overflowContainer.clientHeight;

    const scrollPercentageLeft = this.overflowContainer.scrollLeft / (this.overflowContainer.scrollWidth - this.overflowContainer.clientWidth) || 0;
    const scrollPercentageTop = this.overflowContainer.scrollTop / (this.overflowContainer.scrollHeight - this.overflowContainer.clientHeight) || 0;

    const scrollPercentageBottom = 1 - scrollPercentageTop;
    const scrollPercentageRight = 1 - scrollPercentageLeft;
    
    this.wrapper.style.setProperty('--scroll-left-percentage', hasHorizontalScroll ? scrollPercentageLeft.toFixed(2) : '0.00');
    this.wrapper.style.setProperty('--scroll-right-percentage', hasHorizontalScroll ? scrollPercentageRight.toFixed(2) : '0.00');
    
    this.wrapper.style.setProperty('--scroll-top-percentage', hasVerticalScroll ? scrollPercentageTop.toFixed(2) : '0.00');
    this.wrapper.style.setProperty('--scroll-bottom-percentage', hasVerticalScroll ? scrollPercentageBottom.toFixed(2) : '0.00');
  }

  destroy() {
    this.resizeObserver.disconnect();
    this.overflowContainer.removeEventListener('scroll', this.updateShadow);
  }
}

export { ScrollSnoop };