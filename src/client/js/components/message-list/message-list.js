import { WebComponent } from 'web-component'

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html')
})
export class MessageList extends HTMLElement {
  constructor() {
    super();
  }
}
