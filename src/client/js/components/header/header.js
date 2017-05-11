import { WebComponent } from 'web-component'

@WebComponent('webrtc-header', {
  template: require('./header.html'),
  styles: require('./header.scss')
})
export class Header extends HTMLElement {
  constructor() {
    super();
  }
}
