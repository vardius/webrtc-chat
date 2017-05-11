import { WebComponent } from 'web-component'

@WebComponent('webrtc-chat', {
  template: require('./chat.html'),
  styles: require('./chat.scss'),
  shadowDOM: true
})
export class Chat extends HTMLElement {
  constructor() {
    super();
  }
}