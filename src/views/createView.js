const categoryDropdown = document.querySelector('.categoryDropdown');
const locationDropdown = document.querySelector('.locationRow');
const pagination = document.querySelector('.pagination');

export const createCardMarkup = function (
  id,
  imageUrl,
  name,
  categoryName,
  locationName
) {
  return `
      <div class="card cardButton ${categoryName}" data-id="${id}">
        <div class="cardImageDiv">
            <img class="cardImage"
              src="${imageUrl}"
            />
            </div>
          <div class="cardDetails">
            <div class="cardName">${name}</div>
            <div class="cardCategory  ${categoryName}-text">
              <i class="icon material-icons">&#xe02f;</i>${titleCase(
                categoryName
              )}
            </div>
            <div class="cardArea">
              <i class="icon material-icons">&#xe0c8;</i>${titleCase(
                locationName
              )}
          </div>
        </div>
      </div>
    `;
};

export const createSinglePageMarkup = function (
  imageUrl,
  name,
  categoryName,
  locationName,
  ingredients,
  instructions,
  youtubeUrl,
  sourceUrl
) {
  return `
          <div class="singleMeal">
            <div class="singleMealImageDiv">
              <img
                class="singleMealImage"
                src="${imageUrl}"
              />
            </div>
            <div class="singleMealDetails">
              <div class="singleMealName singleMealPadding">${name}</div>
              <hr />
              <div class="singleMealCategory singleMealPadding">
                <label>Category: </label>${titleCase(categoryName)}
              </div>
              <div class="singleMealArea singleMealPadding">
                <label>Location: </label>${titleCase(locationName)}
              </div>
              <div class="singleMealIngredients singleMealPadding">
                <label class="detailsLabsels">Ingredients: </label><br />
                <ol>
                  ${ingredients}
                </ol>
              </div>

              <div class="singleMealInstruction singleMealPadding">
                <label class="detailsLabsels">Instructions: </label><br />${instructions}
              </div>

              <div class="urlBoxRow">
                <div class="singleMealYoutube singleMealPadding">
                  <a href="${youtubeUrl}" target="_blank">
                    <div class="urlBoxRow">
                      Youtube Recipe
                      <i class="youtubeBoxIcon material-icons">&#xe404;</i>
                    </div>
                  </a>
                </div>
                <div class="singleMealWebsite singleMealPadding">
                  <a
                    href="${sourceUrl}" target="_blank"
                  >
                    <div class="urlBoxRow">
                      Source Website
                      <i class="material-icons">&#xe80b;</i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>`;
};

export const createPaginationMarkup = function (
  currentPage,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
  lastPage,
  fetchQuery
) {
  pagination.innerHTML = '';
  //Pagination Logic Page 1
  if (currentPage !== 1 && previousPage !== 1) {
    pagination.insertAdjacentHTML(
      'beforeend',
      `<div data-page=1 data-query=${fetchQuery} class="paginationItem">1</div>`
    );
  }

  //Pagination Logic Previous Page
  if (hasPreviousPage) {
    pagination.insertAdjacentHTML(
      'beforeend',
      `<div data-page=${previousPage} data-query=${fetchQuery} class="paginationItem">${previousPage}</div>`
    );
  }

  //Pagination Logic Current Page
  pagination.insertAdjacentHTML(
    'beforeend',
    `<div data-page=${currentPage} data-query=${fetchQuery} class="activePage paginationItem">${currentPage}</div>`
  );

  //Pagination Logic Next Page
  if (hasNextPage) {
    pagination.insertAdjacentHTML(
      'beforeend',
      `<div data-page=${nextPage} data-query=${fetchQuery}  class="paginationItem">${nextPage}</div>`
    );
  }

  //Pagination Logic Last Page
  if (lastPage !== currentPage && nextPage !== lastPage) {
    pagination.insertAdjacentHTML(
      'beforeend',
      `<div data-page=${lastPage} data-query=${fetchQuery}  class="paginationItem">${lastPage}</div>`
    );
  }
};

export const createLocationMarkup = function (location) {
  for (const locationObj of Object.values(location)) {
    const locationMarkup = `<a class="locationButton" data-id="${
      locationObj._id
    }">${titleCase(locationObj.locationName)}</a>`;
    locationDropdown.insertAdjacentHTML('beforeend', locationMarkup);
  }
};

export const createCategoryMarkup = function (category) {
  for (const categoryObj of Object.values(category)) {
    const categoryMarkup = `<a class="categoryButton" data-id="${
      categoryObj._id
    }">${titleCase(categoryObj.categoryName)}</a>`;
    categoryDropdown.insertAdjacentHTML('beforeend', categoryMarkup);
  }
};

export const createIngredientMarkup = function (ingredients) {
  let html = '';
  ingredients.forEach((ingredient) => {
    for (const ing of Object.entries(ingredient)) {
      html += `<li>${ing[0] + ' ' + ing[1]}</li>`;
    }
  });
  return html;
};

export const createEmptyPageMarkup = function () {
  return `<div class="emptyPage"><h1>No Meals Found!</h1></div>`;
};

const titleCase = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};
