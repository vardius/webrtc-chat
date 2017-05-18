import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-conversation', {
  template: require('./conversation.html')
})
export class Conversation extends HTMLElement {
  constructor() {
    super();

    this._name = '';
    this._owner = '';

    this.addMessage = this.addMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);

    this._onSend = this._onSend.bind(this);
  }

  static get observedAttributes() {
    return ['name', 'owner'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateRendering();
    }
  }

  connectedCallback() {
    const messageNew = this.querySelector('webrtc-message-new');
    messageNew.addEventListener('send', this._onSend)

    this._updateRendering();
  }

  addMessage(author, body, type) {
    let msg = document.createElement("webrtc-message");
    msg.author = author;
    msg.body = body;
    msg.type = type;

    this.querySelector('.conversation').appendChild(msg);
    this.scrollDown();
  }

  scrollDown() {
    const elem = this.querySelector('.conversation');
    elem.scrollTop = elem.scrollHeight;
  }

  _onSend(e) {
    const msg = e.detail
    if (msg) {
      this.addMessage(this._owner, e.detail, 'outcome');
      this.scrollDown();
    }
  }

  _updateRendering() {
    const name = this.querySelector('.name');
    if (name) {
      name.textContent = `${this._name}`;
    }
  }
}
