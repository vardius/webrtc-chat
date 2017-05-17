import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-popup', {
  template: require('./popup.html')
})
export class Popup extends HTMLElement {
  constructor() {
    super();

    this.onEnter = this.onEnter.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-enter');
    btnSend.addEventListener('click', this.onEnter);

    const query = this.querySelector('.room-query');
    query.addEventListener('keypress', this.onKeyPress);
  }

  onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      this.onEnter();
    }
  }

  onEnter() {
    const query = this.querySelector('.room-query').value;
    if (query.length > 0) {
      window.location.href = window.location.href + '#' + query;
      location.reload();
    }
  }

  show() {
    $('#enter-modal').modal('show');
  }

  hide() {
    $('#enter-modal').modal('hide');
  }
}
