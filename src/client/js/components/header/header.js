import { WebComponent } from 'web-component'

@WebComponent('webrtc-header', {
  template: require('./header.html'),
  styles: require('./header.scss'),
  shadowDOM: true
})
export class Header extends HTMLElement {
  constructor() {
    super();
  }
}
