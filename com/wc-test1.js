class Wctest1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Аль аттрибут өөрчлөгдөхийг сонсох вэ?
  static get observedAttributes() {
    return ['event-image', 'club-logo', 'club-name', 'title', 'datetime', 'price'];
  }

  // Аттрибут өөрчлөгдөх бүрт render дуудагдана
  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  // DOM-д ормогц нэг удаа render хийнэ
  connectedCallback() {
    this.render();
  }

  render() {
    const eventImage = this.getAttribute('event-image') || 'images/event.png';
    const clubLogo   = this.getAttribute('club-logo')  || 'images/club_logo.svg';
    const clubName   = this.getAttribute('club-name')  || 'Hackum student club';
    const title      = this.getAttribute('title')      || 'Эвентийн нэр';
    const datetime   = this.getAttribute('datetime')   || '2025.10.23 18:40';
    const price      = this.getAttribute('price')      || '$1000';

    this.shadowRoot.innerHTML = `
      <style>
        article {
          width: 280px;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          background: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        article > img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }

        header {
          display: flex;
          align-items: center;
          margin-top: 4px;
        }

        header label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: default;
        }

        header img {
          width: 24px;
          height: 24px;
        }

        header h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        p {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
        }

        p.title {
          font-size: 16px;
          font-weight: 600;
          margin-top: 6px;
        }

        p.datetime {
          color: #555;
        }

        p.price {
          font-weight: 700;
          margin-top: 4px;
        }

        button {
          margin-top: 8px;
          align-self: flex-start;
          padding: 8px 16px;
          border-radius: 999px;
          border: none;
          background: #3b82f6;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, opacity 0.1s ease;
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        button:active {
          transform: translateY(0);
          box-shadow: none;
          opacity: 0.9;
        }

        /* slot доторх текст */
        .description {
          margin-top: 4px;
          color: #333;
        }
      </style>

      <article>
        <img src="${eventImage}" alt="Event image" />
        <header>
          <label>
            <img src="${clubLogo}" alt="Club logo" />
            <h4>${clubName}</h4>
          </label>
        </header>
        <p class="title">${title}</p>
        <p class="datetime">${datetime}</p>
        <p class="description">
          <slot>Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.</slot>
        </p>
        <p class="price">${price}</p>
        <button>Дэлгэрэнгүй</button>
      </article>
    `;
  }
}

// <event-card> тагийг бүртгэж байна
customElements.define('event-card', Wctest1);
