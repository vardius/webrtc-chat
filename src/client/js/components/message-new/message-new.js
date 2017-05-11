import { WebComponent } from 'web-component'

@WebComponent('webrtc-message-new', {
  template: require('./message-new.html'),
  styles: require('./message-new.scss'),
  shadowDOM: true
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();
  }
}
