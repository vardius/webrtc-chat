/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {EventType} from "peer-data";
import {ModalManager} from "./modal-manager";
import {signaling} from "./app";
import {EventsLoader, onOpen, onClose, onData, onError} from "./events";

export class Chat {
    constructor(peerData) {
        this.peerData = peerData;
        this.inputSelector = 'input#sendInput';
        this.subscribeEvents();
        this.init('sendBtn');
    }

    init(id) {
        let token = this.getToken();
        if (token) {
            EventsLoader.load(token, signaling.onMessage);
        } else {
            this.peerData.connect();
            ModalManager.onHide('#shareModal', event => {
                document.querySelector('div#share-info').innerHTML = '';
                $('#loadModal').modal('show');
            });
        }

        let loadBtn = document.getElementById('loadBtn');
        loadBtn.addEventListener('click', this.onLoad.bind(this));

        ModalManager.onHide('#loadModal', event => document.querySelector('div#load-info').innerHTML = '');
        this.modalLoop(10);

        let sendBtn = document.getElementById(id);
        sendBtn.addEventListener('click', this.onSend.bind(this));

        document.querySelector(this.inputSelector).addEventListener('keypress', this.onKeyPress.bind(this));
    }

    subscribeEvents() {
        this.peerData.on(EventType.OPEN, onOpen);
        this.peerData.on(EventType.CLOSE, onClose);
        this.peerData.on(EventType.DATA, onData);
        this.peerData.on(EventType.ERROR, onError);
    }

    onKeyPress(event) {
        if (event.keyCode === 13) {
            let message = document.querySelector(this.inputSelector).value;
            this.send(message);
        }
    }

    onSend() {
        let message = document.querySelector(this.inputSelector).value;
        this.send(message);
    }

    onLoad() {
        let data = document.querySelector('textarea#loadInput').value;
        EventsLoader.load(data, signaling.onMessage);
        $('#loadModal').modal('hide');
    }

    modalLoop(i) {
        setTimeout(() => {
            if (ModalManager.showShareModal() !== true && --i) this.modalLoop(i);
        }, 1000)
    }

    getToken() {
        return window.location.hash.substring(1);
    }

    clearInput() {
        document.querySelector(this.inputSelector).value = '';
    }

    send(message) {
        if (message.length > 0) {
            this.clearInput();
            this.peerData.send(message);
            this.constructor.addMessage(message);
            this.constructor.scrollDown();
        }
    }

    static addMessage(message, incoming = false) {
        let template = require('./../public/message.html');
        template = template.replace(/{{message}}/gi, prop => message);
        template = template.replace(/{{class}}/gi, prop => incoming ? 'income' : 'outcome');
        document.querySelector('div.chat').innerHTML += template;
    }

    static scrollDown() {
        let elem = document.querySelector('div.chat');
        elem.scrollTop = elem.scrollHeight;
    }
}
