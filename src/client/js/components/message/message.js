import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-message', {
  template: require('./message.html')
})
export class Message extends HTMLElement {
  constructor() {
    super();
  }
}
