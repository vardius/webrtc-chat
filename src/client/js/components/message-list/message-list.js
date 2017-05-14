import { WebComponent } from 'web-component';

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html')
})
export class MessageList extends HTMLElement {
  constructor() {
    super();

    this._title = '';
    this._owner = '';

    this.addMessage = this.addMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  static get observedAttributes() {
    return ['title', 'owner'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this._title = newValue;
        break;
      case 'owner':
        this._owner = newValue;
        break;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('title')) {
      this._title = this.getAttribute('title');
      this._updateRendering();
    }
    if (this.hasAttribute('owner')) {
      this._owner = this.getAttribute('owner');
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

  get owner() {
    return this._owner;
  }

  set owner(v) {
    this.setAttribute("owner", v);
  }

  onSend(e) {
    const msg = e.detail
    if (msg) {
      this.addMessage(this._owner, e.detail, 'outcome');
      this.scrollDown();
    }
  }

  addMessage(author, body, type) {
    let msg = document.createElement("webrtc-message");
    msg.author = author;
    msg.body = body;
    msg.type = type;

    this.querySelector('.message-list').appendChild(msg);
    this.scrollDown();
  }

  scrollDown() {
    const elem = this.querySelector('.message-list');
    elem.scrollTop = elem.scrollHeight;
  }

  _updateRendering() {
    this.querySelector('.title').textContent = `${this._title}`;
  }
}
