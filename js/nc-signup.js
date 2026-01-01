import { signupUser } from "./apiclient.js";

class NcRegister extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    padding: 40px; 
                }
                .register-card{ 
                    max-width: 420px; 
                    margin: 0 auto; 
                    margin-top: 100px;
                    margin-bottom: 100px;
                    align-items: center;
                    background: var(--card-bg, #fff); 
                    padding: 24px; 
                    border-radius: 8px; 
                    box-shadow: 0 6px 18px rgba(0,0,0,0.06); 
                }
                .register-card h2{ 
                    margin: 0 0 16px; 
                    font-size: 20px; 
                    color: var(--text-primary); 
                }
                .register-card label{ 
                    display:block; 
                    margin-bottom:8px; 
                    color: var(--text-secondary); 
                }
                .register-card input{ 
                    width:100%; 
                    padding:10px 12px; 
                    margin-bottom:12px; 
                    border:1px solid var(--border-color); 
                    border-radius:6px; 
                    background: var(--input-bg); 
                    color: var(--input-text); 
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 16px;
                }

                .form-field label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151; /* neutral gray */
                }
                .form-field input {
                    height: 36px;
                    width: 90%;
                    padding: 0 12px;
                    font-size: 14px;
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .register-card button{ 
                    width:100%; 
                    padding:10px 12px; 
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--color-white, #fff);
                    color: var(--text-primary, #000);
                    border-radius:6px; 
                    cursor:pointer; 
                }
                .register-card button:hover {
                    background: var(--bg-secondary, #f5f5f5);
                }
            </style>
            <div class="register-card">
                <h2>Бүртгүүлэх</h2>
                <form id="registerForm">
                    <div class="form-field">
                        <label for="name">Овог нэр</label>
                        <input id="name" name="name" type="text" required />
                    </div>
                    <div class="form-field">
                        <label for="email">И-мэйл</label>
                        <input id="email" name="email" type="email" required />
                    </div>
                    <div class="form-field">
                        <label for="password">Нууц үг</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <div class="form-field">
                        <label for="confirmPassword">Нууц үг давтах</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required />
                    </div>
                    <button type="submit">Бүртгүүлэх</button>
                </form>
            </div>
        `;

        this.querySelector('#registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;

            if (!name) {
                alert('Овог нэрээ оруулна уу.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Нууц үг таарахгүй байна!');
                return;
            }

            const result = await signupUser({ email, password, name });
            if (result.code !== 200) {
                alert('Бүртгэл амжилтгүй боллоо.');
                return;
            }

            if (window.AuthState) {
                window.AuthState.login(email);
            }

            if (window.Router) window.Router.navigate('/user-profile');
        });
    }
}

if (!customElements.get('nc-signup')) {
    customElements.define('nc-signup', NcRegister);
}
