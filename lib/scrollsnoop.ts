import { throttle } from 'lodash-es';

class ScrollSnoop {
  private wrapper: HTMLElement;
  private overflowContainer: HTMLElement;
  private overflowContainerObserver: ResizeObserver;

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
    
    this.overflowContainerObserver = new ResizeObserver(this.updateShadow);
    this.overflowContainerObserver.observe(this.overflowContainer);

    this.updateShadow();
  }

  updateShadow() {
    const hasHorizontalScroll = this.overflowContainer.scrollWidth > this.overflowContainer.clientWidth;
    const hasVerticalScroll = this.overflowContainer.scrollHeight > this.overflowContainer.clientHeight;

    const scrollPercentageLeft = this.overflowContainer.scrollLeft / (this.overflowContainer.scrollWidth - this.overflowContainer.clientWidth) || 0;
    const scrollPercentageTop = this.overflowContainer.scrollTop / (this.overflowContainer.scrollHeight - this.overflowContainer.clientHeight) || 0;

    const scrollPercentageBottom = 1 - scrollPercentageTop;
    const scrollPercentageRight = 1 - scrollPercentageLeft;
    
    if (hasHorizontalScroll) {
      this.wrapper.style.setProperty('--scroll-left-percentage', scrollPercentageLeft.toFixed(2));
      this.wrapper.style.setProperty('--scroll-right-percentage', scrollPercentageRight.toFixed(2));
    }
    
    if (hasVerticalScroll) {
      this.wrapper.style.setProperty('--scroll-top-percentage', scrollPercentageTop.toFixed(2));
      this.wrapper.style.setProperty('--scroll-bottom-percentage', scrollPercentageBottom.toFixed(2));
    }
  }

  destroy() {
    this.overflowContainerObserver.disconnect();
    this.overflowContainer.removeEventListener('scroll', this.updateShadow);
  }
}

export { ScrollSnoop };