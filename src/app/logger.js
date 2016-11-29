/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {LogLevel} from "peer-data";

export class Logger {
    constructor(logLevel) {
        this._logLevel = logLevel;
    }

    info(data) {
        this.trace(data, 'info');
    }

    log(data) {
        this.trace(data, 'log');
    }

    warn(data) {
        this.trace(data, 'warn');
    }

    error(data) {
        this.trace(data, 'error');
    }

    trace(data, method) {
        if (this._logLevel === LogLevel.OFF) {
            return;
        }
        if (this._logLevel === LogLevel.WARN && method === 'error') {
            return;
        }
        if (this._logLevel === LogLevel.INFO && (method === 'error' || method === 'warn')) {
            return;
        }

        if (window.performance) {
            let now = (window.performance.now() / 1000).toFixed(3);
            if (data instanceof Error) {
                this.logToChat(method, now + ': ' + data.toString());
            }
            this.logToChat(method, now + ': ', data);
        } else {
            this.logToChat(method, data);
        }
    }

    logToChat(method, message) {
        let template = require('./../public/system-message.html');
        template = template.replace(/{{message}}/gi, prop => message);
        template = template.replace(/{{class}}/gi, prop => method);
        document.querySelector('div.chat').innerHTML += template;
    }

    get logLevel() {
        return this._logLevel;
    }

    set logLevel(value) {
        this._logLevel = value;
    }
}
