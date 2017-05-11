import { WebComponent } from 'web-component'

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();
  }
}