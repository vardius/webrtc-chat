import { WebComponent } from 'web-component';

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
    switch (name) {
      case 'id':
        this._id = newValue;
        this._updateRendering();
        break;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('id')) {
      this._id = this.getAttribute('id');
      this._updateRendering();
    }
  }

  get id() {
    return this._id;
  }

  set id(v) {
    this.setAttribute("id", v);
  }

  _updateRendering() {
    const elem = this.querySelector('.peer-id');
    if (elem) {
      elem.textContent = `${this._id}`;
    }
  }
}
