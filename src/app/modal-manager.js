/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {SignalingData} from "./signaling";

export class ModalManager {
    static showShareModal() {
        if (SignalingData.candidatesLoaded !== true || (SignalingData.offerLoaded !== true && SignalingData.answerLoaded !== true)) {
            return false;
        }

        let templateName = SignalingData.offerLoaded ? 'offer' : 'answer';
        let token = JSON.stringify(SignalingData.events);
        let data = (SignalingData.offerLoaded ? location.href + '#' : '') + encodeURIComponent(token);

        let template = require('./../public/' + templateName + '.html');

        template = template.replace(/{{data}}/gi, prop => data);
        document.querySelector('div#share-info').innerHTML += template;
        $('#shareModal').modal('show');

        return true;
    }

    static onHide(selector, callback) {
        $(selector).on('hide.bs.modal', callback);
    }
}
