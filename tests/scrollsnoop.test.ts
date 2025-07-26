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

  test('should be defined', () => {
    expect(ScrollSnoop).toBeDefined();
  });
});