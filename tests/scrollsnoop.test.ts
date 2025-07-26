import { JSDOM } from 'jsdom';
import { expect, test, describe, beforeEach } from 'vitest';
import { ScrollSnoop } from '../lib/scrollsnoop';

let dom = new JSDOM();
let window = dom.window;
let document = window.document;

describe('scrollsnoop', () => {
  beforeEach(() => {
    dom = new JSDOM();
    window = dom.window;
    document = window.document;
    document.body.innerHTML = '';
  })

  describe('initialisation', () => {
    test('should throw an error if no element is provided', () => {
      expect(() => new ScrollSnoop()).toThrow();
    });

    test('should throw an error if the element is not a valid element', () => {
      expect(() => new ScrollSnoop(document.createElement('div'))).toThrow();
    });
    
  });
});