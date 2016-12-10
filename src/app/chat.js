/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {signaling, user} from './app';
import {EventsLoader} from './events';
import {addMessage} from './window';
import PeerData from 'peer-data';

export class Chat {
  constructor() {
    this.inputSelector = 'input#sendInput';
    this.inputBtnSelector = 'button#sendBtn';
    this.init();
  }

  init() {
    let token = this.getToken();
    if (token) {
      EventsLoader.load(token, signaling.onMessage);
    } else {
      PeerData.connect();
    }

    let sendBtn = document.querySelector(this.inputBtnSelector);
    sendBtn.addEventListener('click', this.onSend.bind(this));

    let sendInput = document.querySelector(this.inputSelector);
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
    let message = this.send(this.getMessage());
    if (message.length > 0 && user.inRoom) {
      PeerData.send(message, [user.inRoom]);
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