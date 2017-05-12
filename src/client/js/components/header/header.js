import { WebComponent } from './../../../../../../web-component/src'

@WebComponent('webrtc-header', {
  template: require('./header.html')
})
export class Header extends HTMLElement {
  constructor() {
    super();
  }
}
