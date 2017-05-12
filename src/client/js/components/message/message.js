import {
  WebComponent
} from './../../../../../../web-component/src'

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
    this._body = '';
  }

  static get observedAttributes() {
    return ['type', 'body', 'time', 'status', 'picture'];
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
      case 'status':
        this._status = newValue;
        break;
      case 'picture':
        this._picture = newValue;
        break;
    }
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
    if (this.hasAttribute('status')) {
      this._status = this.getAttribute('status');
      this._updateRendering();
    }
    if (this.hasAttribute('picture')) {
      this._picture = this.getAttribute('picture');
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

  get status() {
    return this._status;
  }

  set status(v) {
    this.setAttribute("status", v);
  }

  get picture() {
    return this._picture;
  }

  set picture(v) {
    this.setAttribute("picture", v);
  }

  _updateRendering() {
    this.querySelector('.bubble').className = `bubble ${this._type}`;
    this.querySelector('.bubble').setAttribute("title", new Date(this._time));
    this.querySelector('.status').className = `status ${this._status}`;
    this.querySelector('.body').textContent = `${this._body}`;
    this.querySelector('img').src = `${this._picture}`;
  }
}
