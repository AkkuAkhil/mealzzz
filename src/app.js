import * as controller from './controller.js';
import * as view from './views/view.js';

const init = async function () {
  await controller.fetchMeals('meals');
  await controller.fetchCategories();
  await controller.fetchLocations();
  view.initViews();
};
init();
