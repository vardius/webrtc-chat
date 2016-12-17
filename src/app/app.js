/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PeerData, {EventType, LogLevel} from 'peer-data';
import {onOpen, onClose, onData, onError} from './events';
import {Signaling} from './signaling';
import {Logger} from './logger';
import {Chat} from './chat';
import {Manager} from './manager';

export const peerData = new PeerData();
export const logger = new Logger(LogLevel.ERROR);
export const signaling = new Signaling();
export const user = {
  name: 'User: ' + randomToken(),
  offer: null,
  answer: null,
  candidates: [],
};

export default class App {
  constructor() {
    const servers = {
      iceServers: [
        {url: 'stun:stun.1.google.com:19302'},
      ],
    };
    const constraints = {ordered: true};

    peerData.servers = servers;
    peerData.dataConstraints = constraints;
    peerData.logger = logger;
    peerData.signaling = signaling;

    this.chat = new Chat();
    this.manager = new Manager();
    this.subscribeEvents();
  }

  subscribeEvents() {
    peerData.on(EventType.OPEN, onOpen);
    peerData.on(EventType.CLOSE, onClose);
    peerData.on(EventType.DATA, onData);
    peerData.on(EventType.ERROR, onError);
  }
}

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}
