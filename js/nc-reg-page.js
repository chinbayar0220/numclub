import { submitClubRequest } from "./apiclient.js";

class NcRegistrationPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Read selected club id from localStorage
        const clubId = localStorage.getItem('register_club_id') || '1';
        const clubNames = {
            '1': 'Hackum',
            '2': 'AI Innovators',
            '3': 'Web Dev Club',
            '4': 'Mobile Club',
            '5': 'Data Science',
            '6': 'Game Dev',
            '7': 'Robotics',
            '8': 'Cloud Computing',
            '9': 'Cybersecurity'
        };
        const selectedClubName = clubNames[clubId] || 'Hackum students club';

        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                }
                article h2 {
                    text-align: right;
                }
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    margin-left: 100px;
                    margin-right: 100px;
                }
                .question {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .question label {
                    font-weight: 500;
                    color: var(--text-primary, #000);
                }
                .question input {
                    padding: 10px 12px;
                    border: 1px solid var(--border-color, #ddd);
                    border-radius: 6px;
                    background: var(--input-bg, #fff);
                    color: var(--input-text, #000);
                    font-size: 14px;
                }
                input[type="submit"] {
                    padding: 12px 20px;
                    background: var(--primary-color, #007bff);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                }
                input[type="submit"]:hover {
                    background: var(--primary-hover, #0056b3);
                }
                ol {
                    list-style: decimal;
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 24px;
                }
            </style>

            
                <div class="main">
            <h2>Клубт элсэх хүсэлт</h2>
            <h3>${selectedClubName} students club</h3>
            <form id="registrationForm">
                <ol>
                    <li>
                        <section class="question">
                            <label for="email">Имэйл хаяг (жишээ: example@email.com)</label>
                            <input type="email" name="email" id="email" placeholder="example@email.com" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="phone">Утасны дугаар</label>
                            <input type="tel" name="phone" id="phone" placeholder="+976 ..." required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="reason">Та яагаад ${selectedClubName} клубт элсэхийг хүсэж байна вэ?</label>
                            <input type="text" name="reason" id="reason" placeholder="Товч тайлбар" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="impact">Клубт элссэнээр ямар хувь нэмэр оруулах вэ?</label>
                            <input type="text" name="impact" id="impact" placeholder="Товч тайлбар" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="description">Өөрийнхөө 3 давуу талыг бичнэ үү</label>
                            <input type="text" name="description" id="description" placeholder="Жишээ: Манлайлал, Харилцаа, Багаар ажиллах" required>
                        </section>
                    </li>
                </ol>
                <input type="submit" value="Илгээх">
            </form>
        </div>
        `;

        // Handle form submission
        this.querySelector('#registrationForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                clubId: clubId,
                email: this.querySelector('#email').value,
                phone: this.querySelector('#phone').value,
                reason: this.querySelector('#reason').value,
                impact: this.querySelector('#impact').value,
                description: this.querySelector('#description').value
            };
            const result = await submitClubRequest(formData);
            if (result.code !== 201) {
                alert("Хүсэлт илгээж чадсангүй.");
                return;
            }
            alert("Хүсэлт илгээгдлээ.");
            // Clear the saved club id after successful submission
            localStorage.removeItem('register_club_id');
            // Navigate back to home
            if (window.Router) window.Router.navigate('/');
        });
    }
}

window.customElements.define('nc-reg-page', NcRegistrationPage);



