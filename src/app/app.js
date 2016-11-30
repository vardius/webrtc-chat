/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {PeerData, PeerDataConfig, LogLevel} from "peer-data";
import {Signaling} from "./signaling";
import {Logger} from "./logger";
import {Chat} from "./chat";

const servers = {
    iceServers: [
        {url: "stun:stun.1.google.com:19302"}
    ]
};
const constraints = {ordered: true};
const logLevel = LogLevel.ERROR;

export const logger = new Logger(logLevel);
export const signaling = new Signaling();

export default class App {
    constructor() {
        this.config = new PeerDataConfig(servers, constraints, logLevel, signaling);
        this.config.logger = logger;
        this.peerData = new PeerData(this.config);
        this.chat = new Chat(this.peerData);
    }
};
