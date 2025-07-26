import './style.css';

import { ScrollSnoop } from '../lib/scrollsnoop';

new ScrollSnoop(document.querySelector('.scrollsnoop')!, document.querySelector('.scrollsnoop-overflow-container')!);

new ScrollSnoop(document.querySelector('.scrollsnoop-horizontal')!, document.querySelector('.scrollsnoop-horizontal-overflow-container')!);