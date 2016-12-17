/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {user, signaling} from './app';
import {EventsLoader} from './events';

export class Manager {
  constructor() {
    this.init();
  }

  init() {
    const loadBtn = document.getElementById('loadBtn');
    loadBtn.addEventListener('click', this.onLoad.bind(this));

    const shareTokenBtn = document.getElementById('shareToken');
    shareTokenBtn.addEventListener('click', this.onShareToken.bind(this));

    const shareLinkBtn = document.getElementById('shareLink');
    shareLinkBtn.addEventListener('click', this.onShareLink.bind(this));

    this.onModalHide('#loadModal', this.clearLoadModal.bind(this));
  }

  clearLoadModal() {
    document.querySelector('div#load-info').innerHTML = '';
  }

  onModalHide(selector, callback) {
    $(selector).on('hide.bs.modal', callback);
  }

  onLoad() {
    const data = document.querySelector('textarea#loadInput').value;
    EventsLoader.load(data, signaling.onMessage.bind(signaling));
    $('#loadModal').modal('hide');
  }

  onShareToken() {
    if (user.offer || user.answer) {
      this.getShareToken(user.offer ? user.offer : user.answer);
      user.offer = null;
      user.answer = null;
    }
  }

  onShareLink() {
    if (user.offer) {
      this.getShareToken(user.offer, true);
      user.offer = null;
    }
  }

  getShareToken(offer, asURL = false) {
    const candidates = user.candidates;
    const events = candidates.concat(offer);

    const data = (asURL !== false ? location.href + '#' : '')
      + encodeURIComponent(JSON.stringify(events));

    window.prompt("Share", data);
  }
}
