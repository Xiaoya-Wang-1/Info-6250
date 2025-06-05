import { createModel } from './model.js';
import { setupController } from './controller.js';
import { makeAPI } from './service.js';

const rootElement = document.getElementById('root');
const state = createModel();
const api = makeAPI();

setupController(rootElement, state, api);