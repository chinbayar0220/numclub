class wcTest1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const clubname = this.getAttribute('cname') || 'Club name';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
        article{
          padding:16px;
          border: 1px solid #D9D9D9;
          background-color: white;
          border-radius: 8px;
      }
      label{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          
      }
      h4 {
        font-weight: 600;
        font-size: 20px;
        margin: 0;
      }
      </style>
      <article>
          <img src="images/event.png" alt="">
          <header>
              <label><img src="images/club_logo.svg" alt=""><h4>Hackum student club</h4></label>
          </header>
          <p>Эвентийн нэр</p>
          <p>2025.10.23 18.40</p>
          <p>Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.</p>
          <p>$1000</p>
          <button>Дэлгэрэнгүй</button>
      </article>
      
    `;
  }
}

customElements.define('wc-card', wcTest1);
