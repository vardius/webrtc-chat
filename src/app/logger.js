/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {LogLevel} from 'peer-data';
import {addSystemMessage} from './window';

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
    let now = new Date();
    now = now.getHours() + '.' + now.getMinutes();
    if (data instanceof Error) {
      addSystemMessage(method, now + ': ' + data.toString());
    }
    addSystemMessage(method, now + ': ' + data);
  }

  get logLevel() {
    return this._logLevel;
  }

  set logLevel(value) {
    this._logLevel = value;
  }
}
