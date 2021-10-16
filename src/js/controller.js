import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { SEC_TO_HIDE_MODAL } from './config';
// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServings(newServing);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    addRecipeView.renderMessage();
    recipeView.render(model.state.recipe);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, SEC_TO_HIDE_MODAL * 1000);

    bookmarksView.render(model.state.bookmarks);

    console.log(model.state.recipe.id);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerLoadBookmarks(controlBookmarks);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
