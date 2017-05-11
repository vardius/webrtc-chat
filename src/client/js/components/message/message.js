import {WebComponent} from 'web-component'

@WebComponent('webrtc-message', {
  template: require('./message.html'),
  styles: require('./message.scss')
})
export class Message extends HTMLElement {
  constructor() {
    super();
    this._type = null;
    this._time = null;
    this._body = null;
  }

  static get observedAttributes() {
    return ['type', 'body', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this._type = newValue;
        break;
      case 'time':
        this._time = newValue;
        break;
      case 'body':
        this._body = newValue;
        break;
    }
    this._updateRendering();
  }

  connectedCallback() {
    if (this.hasAttribute('type')) {
      this._type = this.getAttribute('type');
      this._updateRendering();
    }
    if (this.hasAttribute('body')) {
      this._body = this.getAttribute('body');
      this._updateRendering();
    }
    if (this.hasAttribute('time')) {
      this._time = this.getAttribute('time');
      this._updateRendering();
    }
  }

  get type() {
    return this._type;
  }

  set type(v) {
    this.setAttribute("type", v);
  }

  get time() {
    return this._time;
  }

  set time(v) {
    this.setAttribute("time", v);
  }

  get body() {
    return this._body;
  }

  set body(v) {
    this.setAttribute("body", v);
  }

  _updateRendering() {
    this.querySelector('.bubble').className = this._type ? `bubble ${this._type}` : 'bubble system';
    this.querySelector('.body').textContent = this._body ? `${this._body}` : '';

    //todo: add name and time
  }
}
