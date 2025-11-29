class NcLogin extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host { display: block; padding: 40px; }
                .login-card { max-width: 420px; margin: 0 auto; background: var(--card-bg, #fff); padding: 24px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
                .login-card h2 { margin: 0 0 16px; font-size: 20px; color: var(--text-primary); }
                .login-card label { display:block; margin-bottom:8px; color: var(--text-secondary); }
                .login-card input { width:100%; padding:10px 12px; margin-bottom:12px; border:1px solid var(--border-color, #ddd); border-radius:6px; background: var(--input-bg, #fff); color: var(--input-text, #000); }
                .login-card button { width:100%; padding:10px 12px; border:none; background: #667eea; color:white; border-radius:6px; cursor:pointer; }
            </style>
            <div class="login-card">
                <h2>Нэвтрэх</h2>
                <form id="loginForm">
                    <label for="email">И-мэйл</label>
                    <input id="email" name="email" type="email" required />
                    <label for="password">Нууц үг</label>
                    <input id="password" name="password" type="password" required />
                    <button type="submit">Нэвтрэх</button>
                </form>
            </div>
        `;

        this.querySelector('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // simple demo behavior: show alert and navigate to home
            const email = this.querySelector('#email').value;
            alert(`Signed in as ${email}`);
            // navigate to home
            if (window.Router) window.Router.navigate('/');
        });
    }
}

if (!customElements.get('nc-login')) {
    customElements.define('nc-login', NcLogin);
}
