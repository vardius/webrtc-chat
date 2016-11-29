/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {EventType} from "peer-data";

export class Chat {
    constructor(peerData) {
        this.peerData = peerData;
        this.inputSelector = 'input#sendInput';
        this.subscribeEvents();
        this.init('sendBtn');
    }

    init(id) {
        let sendBtn = document.getElementById(id);
        sendBtn.addEventListener('click', this.onSend.bind(this));
    }

    subscribeEvents() {
        this.peerData.on(EventType.OPEN, this.onOpen.bind(this));
        this.peerData.on(EventType.CLOSE, this.onClose.bind(this));
        this.peerData.on(EventType.DATA, this.onData.bind(this));
        this.peerData.on(EventType.ERROR, this.onError.bind(this));
    }

    onSend() {
        let message = document.querySelector(this.inputSelector).value;
        this.clearInput();
        this.peerData.send(message);
        this.addMessage(message);
    }

    onOpen(event) {
        console.log(event);
    }

    onClose(event) {
        console.log(event);
    }

    onData(event) {
        this.addMessage(event.data, true);
    }

    onError(event) {
        console.log(event);
    }

    clearInput() {
        document.querySelector(this.inputSelector).value = '';
    }

    addMessage(message, incoming = false) {
        let template = require('./../public/message.html');
        template = template.replace(/{{message}}/gi, prop => message);
        template = template.replace(/{{class}}/gi, prop => incoming ? 'income' : 'outcome');
        document.querySelector('div.chat').innerHTML += template;
    }
}
