import { WebComponent } from 'web-component'

@WebComponent('webrtc-room', {
  template: require('./room.html'),
  styles: require('./room.scss')
})
export class Room extends HTMLElement {
  constructor() {
    super();
    this._title = null;
    this._newCount = null;
  }

  static get observedAttributes() {
    return ['title', 'newCount'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this._title = newValue;
        break;
      case 'newCount':
        this._newCount = newValue;
        break;
    }
    this._updateRendering();
  }

  connectedCallback() {
    if (this.hasAttribute('title')) {
      this._title = this.getAttribute('title');
      this._updateRendering();
    }
    if (this.hasAttribute('newCount')) {
      this._newCount = this.getAttribute('newCount');
      this._updateRendering();
    }
  }

  get title() {
    return this._title;
  }

  set title(v) {
    this.setAttribute("title", v);
  }

  get newCount() {
    return this._newCount;
  }

  set newCount(v) {
    this.setAttribute("newCount", v);
  }

  _updateRendering() {
    this.querySelector('.title').textContent = `${this._title}`;
    this.querySelector('.status').textContent = this._newCount ? `${this._newCount}` : '';
  }
}
