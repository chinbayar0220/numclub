class NcEventCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('ename') || 'Эвентийн нэр';
    const date = this.getAttribute('edate') || 'Огноо цаг';
    const price = this.getAttribute('price') || '₮0';

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
