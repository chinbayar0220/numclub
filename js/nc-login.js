import { loginUser } from "./apiclient.js";

class NcLogin extends HTMLElement {
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
                .login-card{ 
                    max-width: 420px; 
                    margin: 0 auto; 
                    margin-top: 100px;
                    margin-bottom: 100px;
                    allign-items: center;
                    background: var(--card-bg, #fff); 
                    padding: 24px; border-radius: 8px; 
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #e5e7eb);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.06); 
                }
                .login-card h2{ 
                    margin: 0 0 16px; 
                    font-size: 20px; 
                    color: var(--text-primary); 
                }
                .login-card label{ 
                    display:block; 
                    margin-bottom:8px; 
                    color: var(--text-secondary); 
                }
                .login-card input{ 
                    width:100%; 
                    padding:10px 12px; 
                    margin-bottom:12px; 
                    border:8px solid var(--border-color); 
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
                .form-field select {
                    height: 36px;
                    width: 90%;
                    padding: 0 12px;
                    font-size: 14px;
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                    background: #fff;
                    outline: none;
                }
                .login-card button{ 
                    width:100%; 
                    padding:10px 12px; 
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--color-white, #fff);
                    color: var(--text-primary, #000);
                    border-radius:6px; 
                    cursor:pointer; 
                }
                .login-card button:hover {
                    background: var(--bg-secondary, #f5f5f5);
                }
            </style>
            <div class="login-card">
                <h2>Нэвтрэх</h2>
                <form id="loginForm">
                    <div class="form-field">
                        <label for="email">И-мэйл</label>
                        <input id="email" name="email" type="email" required />
                    </div>
                    <div class="form-field">
                        <label for="password">Нууц үг</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <div class="form-field">
                        <label for="role">Нэвтрэх төрөл</label>
                        <select id="role" name="role">
                            <option value="user">Хэрэглэгч</option>
                            <option value="admin">Админ</option>
                        </select>
                    </div>
                    <button type="submit">Нэвтрэх</button>
                </form>
            </div>
        `;

        this.querySelector('#loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            // get email and save state
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const role = this.querySelector('#role')?.value || 'user';

            const result = await loginUser({ email, password });
            if (result.code !== 200) {
                alert("Login failed.");
                return;
            }

            if (window.AuthState) {
                window.AuthState.login(email, role);
            }
            // navigate to home
            if (window.Router) {
                window.Router.navigate(role === 'admin' ? '/admin/requests' : '/');
            }
        });
    }
}

if (!customElements.get('nc-login')) {
    customElements.define('nc-login', NcLogin);
}
