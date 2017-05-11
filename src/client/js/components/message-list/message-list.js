import {WebComponent} from 'web-component'

@WebComponent('webrtc-message-list', {
  template: require('./message-list.html'),
  styles: require('./message-list.scss')
})
export class MessageList extends HTMLElement {
  constructor() {
    super();
    this.addMessage.bind(this);
  }

  connectedCallback() {
    this.addMessage('from js', 'system');
  }

  addMessage(body, type) {
    let msg = document.createElement('webrtc-message');
    msg.textContent = body;
    msg.type = type;

    this.querySelector('.messages').appendChild(msg);
  }
}
