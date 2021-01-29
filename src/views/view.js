import * as controller from '../controller.js';
const toggleButton = document.querySelectorAll('.toggleButton')[0];
const pagination = document.querySelector('.pagination');
const cardContainer = document.querySelector('.cardRow');
const location = document.querySelector('.locationDropdown');
const category = document.querySelector('.categoryDropdown');
const logo = document.querySelector('.headerButton');
const searchBar = document.querySelector('.searchMeal');

export const initViews = function () {
  toggleButton.addEventListener('click', () => controller.toggleHeader());

  pagination.addEventListener('click', (e) => controller.pageController(e));

  cardContainer.addEventListener('click', (e) => controller.cardController(e));

  location.addEventListener('click', (e) => controller.locationController(e));

  category.addEventListener('click', (e) => controller.categoryController(e));

  logo.addEventListener('click', () => controller.fetchMeals('meals'));

  searchBar.addEventListener('keyup', (e) => controller.searchController(e));
};
