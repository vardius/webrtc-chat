/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {ModalManager} from "./modal-manager";
import {EventsLoader} from "./events-loader";

export class GuiManager {
    constructor(peerData, signaling) {
        this.peerData = peerData;
        this.signaling = signaling;
        this.init();
    }

    init() {
        let token = this.getToken();
        if (token) {
            EventsLoader.load(token, this.signaling.onMessage);
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
        this.modalLoop(10)
    }

    modalLoop(i) {
        setTimeout(() => {
            if (ModalManager.showShareModal() !== true && --i) this.modalLoop(i);
        }, 1000)
    }

    onLoad() {
        let data = document.querySelector('textarea#loadInput').value;
        EventsLoader.load(data, this.signaling.onMessage);
        $('#loadModal').modal('hide');
    }

    getToken() {
        return window.location.hash.substring(1);
    }
}
