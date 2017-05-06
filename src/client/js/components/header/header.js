import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-header', {
  template: require('./header.html')
})
export class Header extends HTMLElement {
  constructor() {
    super();
  }
}
