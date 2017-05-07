import { WebComponent } from 'web-component'

@WebComponent('webrtc-footer', {
  template: require('./footer.html')
})
export class Footer extends HTMLElement {
  constructor() {
    super();
  }
}
