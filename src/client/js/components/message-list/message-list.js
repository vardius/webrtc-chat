import {
  WebComponent
} from './../../../../../../web-component/src'

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html')
})
export class MessageList extends HTMLElement {
  constructor() {
    super();

    this._title = '';

    this.addMessage = this.addMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this._title = newValue;
        break;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('title')) {
      this._title = this.getAttribute('title');
      this._updateRendering();
    }

    const messageNew = this.querySelector('webrtc-message-new');
    messageNew.addEventListener('send', this.onSend)

    this._updateRendering();
  }

  get title() {
    return this._title;
  }

  set title(v) {
    this.setAttribute("title", v);
  }

  onSend(e) {
    const msg = e.detail
    if (msg) {
      this.addMessage(e.detail, 'outcome');
      this.scrollDown();
    }
  }

  addMessage(body, type) {
    let msg = document.createElement("webrtc-message");
    msg.body = body;
    msg.type = type;

    this.querySelector('.message-list').appendChild(msg);
  }

  scrollDown() {
    const elem = this.querySelector('.message-list');
    elem.scrollTop = elem.scrollHeight;
  }

  _updateRendering() {
    this.querySelector('.title').textContent = `${this._title}`;
  }
}
