import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-popup', {
  template: require('./popup.html')
})
export class Popup extends HTMLElement {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this._onEnter = this._onEnter.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-enter');
    btnSend.addEventListener('click', this._onEnter);

    const query = this.querySelector('.room-query');
    query.addEventListener('keypress', this._onKeyPress);
  }

  show() {
    $('#enter-modal').modal('show');
  }

  hide() {
    $('#enter-modal').modal('hide');
  }

  _onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      this._onEnter();
    }
  }

  _onEnter() {
    const query = this.querySelector('.room-query').value;
    if (query.length > 0) {
      window.location.href = window.location.href + '#' + query;
      location.reload();
    }
  }
}
