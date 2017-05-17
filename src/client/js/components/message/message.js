import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-message', {
  template: require('./message.html')
})
export class Message extends HTMLElement {
  constructor() {
    super();

    this._picture = '/images/avatar.png';
    this._type = 'system';
    this._status = 'off';
    this._time = (new Date).getTime();
    this._author = '';
    this._body = '';
  }

  static get observedAttributes() {
    return ['type', 'body', 'time', 'status', 'picture', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateRendering();
    }
  }

  connectedCallback() {
    this._updateRendering();
  }

  _updateRendering() {
    const bubble = this.querySelector('.bubble');
    if (bubble) {
      bubble.className = `bubble ${this._type}`;
      bubble.setAttribute("title", new Date(this._time));
    }
    const status = this.querySelector('.status');
    if (status) {
      status.className = `status ${this._status}`;
    }
    const body = this.querySelector('.body');
    if (body) {
      body.textContent = `${this._body}`;
    }
    const author = this.querySelector('.author');
    if (author) {
      author.textContent = `${this._author}`;
    }
    const img = this.querySelector('img');
    if (img) {
      img.src = `${this._picture}`;
    }
  }
}
