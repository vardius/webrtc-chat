import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-message', {
  template: require('./message.html')
})
export class Message extends HTMLElement {
  constructor() {
    super();

    this._type = 'system';
    this._time = (new Date).getTime();
    this._author = '';
    this._body = '';
  }

  static get observedAttributes() {
    return ['type', 'body', 'time', 'author'];
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
    const container = this.querySelector('p');
    if (container) {
      container.innerHTML = `<b>${this._author}: </b>${this._body}`;
      container.className = `message ${this._type}`;
      container.setAttribute("title", new Date(this._time));
    }
  }
}
