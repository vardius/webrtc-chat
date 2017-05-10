import {
  WebComponent
} from 'web-component'

@WebComponent('webrtc-message', {
  template: require('./message.html')
})
export class Message extends HTMLElement {
  constructor() {
    super();
    this._body = null;
    this._type = null;
  }

  static get observedAttributes() {
    return ['body'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'body':
        this._body = newValue;
        break;
      case 'type':
        this._type = newValue;
        break;
    }
    this._updateRendering();
  }

  connectedCallback() {
    if (this.hasAttribute('body')) {
      this._body = this.getAttribute('body');
      this._updateRendering();
    }
    if (this.hasAttribute('type')) {
      this._type = this.getAttribute('type');
      this._updateRendering();
    }
  }

  get type() {
    return this._type;
  }

  set type(v) {
    this.setAttribute("type", v);
  }

  get body() {
    return this._body;
  }

  set body(v) {
    this.setAttribute("body", v);
  }

  _updateRendering() {
    this.querySelector('.bubble').textContent = `${this._body}`;
    this.querySelector('.bubble').className = `bubble ${this._type}`;
  }
}
