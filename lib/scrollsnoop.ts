class ScrollSnoop {

  private element: HTMLElement;

  constructor(element: HTMLElement) {
    if (!element) {
      throw new Error('No element provided');
    }

    if (!(element instanceof HTMLElement)) {
      throw new Error('Invalid element provided');
    }

    this.element = element;
  }
}

export { ScrollSnoop };