import { WebComponent } from 'web-component'

@WebComponent('webrtc-message-new', {
  template: require('./message-new.html')
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();
  }
}
