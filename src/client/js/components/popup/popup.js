import { WebComponent } from 'web-component';

@WebComponent('webrtc-popup', {
  template: require('./popup.html')
})
export class Popup extends HTMLElement {
    constructor() {
        super();

        this.onEnter = this.onEnter.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    connectedCallback() {
        const btnSend = this.querySelector('.btn-enter');
        btnSend.addEventListener('click', this.onEnter);
    }

    onEnter() {
        const query = this.querySelector('.room-query').value;
        if (query.length > 0) {
            window.location.href = query;
        }
    }

    show() {
        $('#enter-modal').modal('show');
    }

    hide() {
        $('#enter-modal').modal('hide');
    }
}
