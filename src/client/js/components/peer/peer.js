import { WebComponent } from 'web-component';

@WebComponent('webrtc-peer', {
  template: require('./peer.html')
})
export class Peer extends HTMLElement {
  constructor() {
    super();

    this._picture = '/webrtc-chat/images/avatar.png';
    this._status = 'off';
    this._title = '';
    this._info = '';
  }

  static get observedAttributes() {
    return ['title', 'info', 'status', 'picture'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this._title = newValue;
        break;
      case 'info':
        this._info = newValue;
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
    if (this.hasAttribute('title')) {
      this._title = this.getAttribute('title');
      this._updateRendering();
    }
    if (this.hasAttribute('info')) {
      this._info = this.getAttribute('info');
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

  get title() {
    return this._title;
  }

  set title(v) {
    this.setAttribute("title", v);
  }

  get info() {
    return this._info;
  }

  set info(v) {
    this.setAttribute("info", v);
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
    this.querySelector('.title').textContent = `${this._title}`;
    this.querySelector('.info').textContent = `${this._info}`;
    this.querySelector('.status').className = `status ${this._status}`;
    this.querySelector('img').src = `${this._picture}`;
  }
}
