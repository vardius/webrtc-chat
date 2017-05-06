import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-footer', {
  template: require('./footer.html')
})
export class Footer extends HTMLElement {
  constructor() {
    super();
  }
}
