import { WebComponent } from 'web-component'

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html'),
  styles: require('./message-list.scss'),
  shadowDOM: true
})
export class MessageList extends HTMLElement {
  constructor() {
    super();

    this.elements = [];
  }
}
