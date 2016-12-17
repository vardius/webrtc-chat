/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {signaling, peerData} from './app';
import {EventsLoader} from './events';
import {addMessage} from './window';

export class Chat {
  constructor() {
    this.inputSelector = 'input#sendInput';
    this.inputBtnSelector = 'button#sendBtn';
    this.init();
  }

  init() {
    const token = this.getToken();
    if (token) {
      EventsLoader.load(token, signaling.onMessage.bind(signaling));
    } else {
      peerData.connect();
    }

    const sendBtn = document.querySelector(this.inputBtnSelector);
    sendBtn.addEventListener('click', this.onSend.bind(this));

    const sendInput = document.querySelector(this.inputSelector);
    sendInput.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  onSend() {
    this.send();
  }

  send() {
    const message = this.getMessage();
    if (message.length > 0) {
      peerData.send(message);
      addMessage(message);
    }
  }

  getMessage() {
    return document.querySelector(this.inputSelector).value;
  }


  getToken() {
    return window.location.hash.substring(1);
  }
}
