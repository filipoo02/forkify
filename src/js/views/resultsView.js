import View from './View';
import previevView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previevView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
