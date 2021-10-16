import View from './View';
import previevView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks found!';
  _message = '';

  addHandlerLoadBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previevView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
