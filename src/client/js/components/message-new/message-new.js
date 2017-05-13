import { WebComponent } from 'web-component'

@WebComponent('webrtc-message-new', {
  template: require('./message-new.html')
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();

    this.onSend = this.onSend.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-send');
    btnSend.addEventListener('click', this.onSend);
    const area = this.querySelector('textarea');
    area.addEventListener('keypress', this.onKeyPress);
  }

  onSend() {
    const area = this.querySelector('textarea');
    const msg = area.value;
    area.value = "";

    const event = new CustomEvent("send", {
      detail: msg
    });
    this.dispatchEvent(event);
  }

  onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  }
}
