import { WebComponent } from 'web-component'

@WebComponent('webrtc-header', {
  template: require('./header.html')
})
export class Header extends HTMLElement {
  constructor() {
    super();
  }
}
