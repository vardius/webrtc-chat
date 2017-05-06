import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html')
})
export class MessageList extends HTMLElement {
  constructor() {
    super();
  }
}
