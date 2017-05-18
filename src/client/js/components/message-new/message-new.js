import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-message-new', {
  template: require('./message-new.html')
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();

    this._onKeyPress = this._onKeyPress.bind(this);
    this._onSend = this._onSend.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-send');
    btnSend.addEventListener('click', this._onSend);

    const area = this.querySelector('textarea');
    area.addEventListener('keypress', this._onKeyPress);
  }

  _onSend() {
    const area = this.querySelector('textarea');
    const msg = area.value;
    area.value = "";

    const event = new CustomEvent("send", {
      detail: msg
    });
    this.dispatchEvent(event);
  }

  _onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      this._onSend();
    }
  }
}
