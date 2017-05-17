import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-header', {
  template: require('./header.html')
})
export class Header extends HTMLElement {
  constructor() {
    super();

    this._id = '';
  }

  static get observedAttributes() {
    return ['id'];
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
    const elem = this.querySelector('.peer-id');
    if (elem) {
      elem.textContent = `${this._id}`;
    }
  }
}
