/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {logger} from "./app";
import {Chat} from "./chat";

export class EventsLoader {
    static load(data, callback) {
        let events = JSON.parse(decodeURIComponent(data));
        for (let i = 0; i < events.length; i++) {
            callback(events[i]);
        }
    }
}

export function onOpen() {
    logger.info('User joined chat');
}

export function onClose() {
    logger.info('User left chat');
}

export function onData(event) {
    Chat.addMessage(event.data, true);
}

export function onError(event) {
    logger.error(event);
}
