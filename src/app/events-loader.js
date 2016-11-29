/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class EventsLoader {
    static load(data, callback) {
        let events = JSON.parse(decodeURIComponent(data));
        for (let i = 0; i < events.length; i++) {
            callback(events[i]);
        }
    }
}
