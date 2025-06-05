import { render } from './view.js';
import { addListeners, checkForSession } from './controller.js';

addListeners();

checkForSession();

render();