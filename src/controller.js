import { serverUrl } from './config.js';
import * as createViews from './views/createView.js';
const footer = document.querySelector('.footer');
const cardContainer = document.querySelector('.cardRow');
const pagination = document.querySelector('.pagination');
const navbarLinks = document.querySelectorAll('.navbarLinks')[0];

export const fetchMeals = async function (fetchUrl, page = 1) {
  let fetchQuery = '';
  let totalUrl = '';
  if (!fetchUrl.includes('?page')) {
    fetchQuery = fetchUrl.split('?page');
    totalUrl = serverUrl + fetchQuery + '?page=' + page;
  }
  const mealsDataDoc = await fetch(totalUrl);
  const mealsData = await mealsDataDoc.json();
  const { meals } = mealsData;
  pagination.classList.remove('hidden');
  footer.classList.remove('hidden');
  if (meals.length === 0) {
    pagination.classList.add('hidden');
    footer.classList.add('hidden');
    const emptyPageMarkup = createViews.createEmptyPageMarkup();
    cardContainer.innerHTML = emptyPageMarkup;
    console.log('No meals', emptyPageMarkup);
    return;
  }

  createViews.createPaginationMarkup(
    +mealsData.currentPage,
    mealsData.hasNextPage,
    mealsData.hasPreviousPage,
    +mealsData.nextPage,
    +mealsData.previousPage,
    +mealsData.lastPage,
    fetchQuery
  );

  cardContainer.innerHTML = '';
  for (const meal of Object.values(meals)) {
    const cardMarkup = createViews.createCardMarkup(
      meal._id,
      meal.imageUrl,
      meal.name,
      meal.category.categoryName,
      meal.location.locationName
    );
    cardContainer.insertAdjacentHTML('afterbegin', cardMarkup);
  }
};

export const viewMealDetails = async function (mealId) {
  pagination.classList.add('hidden');
  const mealData = await fetch(serverUrl + 'meals/' + mealId);
  const { meals } = await mealData.json();
  const ingredientMarkup = createViews.createIngredientMarkup(
    meals.ingredients
  );
  const singlePageMarkup = createViews.createSinglePageMarkup(
    meals.imageUrl,
    meals.name,
    meals.category.categoryName,
    meals.location.locationName,
    ingredientMarkup,
    meals.instruction,
    meals.youtubeUrl,
    meals.sourceUrl
  );
  cardContainer.innerHTML = singlePageMarkup;
};

export const fetchCategories = async function () {
  const categoryData = await fetch(serverUrl + 'category');
  const { category } = await categoryData.json();
  createViews.createCategoryMarkup(category);
};

export const fetchLocations = async function () {
  const locationData = await fetch(serverUrl + 'location');
  const { location } = await locationData.json();
  createViews.createLocationMarkup(location);
};

export const pageController = function (e) {
  const pageButton = e.target.closest('.paginationItem');
  const page = pageButton.dataset.page;
  const fetchQuery = pageButton.dataset.query;
  fetchMeals(fetchQuery, page);
};

export const cardController = function (e) {
  const cardButton = e.target.closest('.cardButton');
  const cardId = cardButton.dataset.id;
  viewMealDetails(cardId);
};

export const locationController = function (e) {
  const locationButton = e.target.closest('.locationButton');
  const locationId = locationButton.dataset.id;
  fetchMeals(`location/${locationId}`);
};

export const categoryController = function (e) {
  const categoryButton = e.target.closest('.categoryButton');
  const categoryId = categoryButton.dataset.id;
  fetchMeals(`category/${categoryId}`);
};

export const searchController = function (e) {
  if (e.keyCode === 13) {
    const searchKey = e.target.value.toString();
    e.target.value = '';
    pagination.classList.remove('hidden');
    fetchMeals(`meals/search/${searchKey}`);
  }
};

export const toggleHeader = function () {
  navbarLinks.classList.toggle('active');
};
