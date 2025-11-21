class NcEventCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('ename') || 'Эвентийн нэр';
    const date = this.getAttribute('edate') || 'Огноо цаг';
    const price = this.getAttribute('price') || '₮0';
    const img = this.getAttribute('event-image') || 'images/event.png'
    const clubName = this.getAttribute('club-name') || 'Hackum student club'

    this.innerHTML = `
      <article class="event-card">
        <img src="images/event.png" alt="">
        <header>
          <label>
            <img src="images/club_logo.svg" alt="">
            <h4>Hackum student club</h4>
          </label>
        </header>
        <p>${name}</p>
        <p>${date}</p>
        <p>Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.</p>
        <p>${price}</p>
        <button>Дэлгэрэнгүй</button>
      </article>
    `;
  }
}

customElements.define('nc-eventcard', NcEventCard);
