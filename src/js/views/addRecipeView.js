import icons from 'url:../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe has been successfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //   const btn = e.target.closest('upload__btn');
      //   console.log(btn);
      //   btn.addEventListener('click', function () {
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
    // });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
