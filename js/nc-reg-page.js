class NcRegistrationPage extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        // Read selected club id from localStorage
        const clubId = localStorage.getItem('register_club_id') || '1';
        await this.loadAndRender(clubId);
    }

    async loadAndRender(clubId) {
        let selectedClubName = 'Клуб';
        
        // Try to load club name from API
        try {
            const response = await fetch('http://127.0.0.1:3000/api/clubs');
            if (response.ok) {
                const data = await response.json();
                const clubs = data.clubs || [];
                const foundClub = clubs.find(c => c.id == clubId);
                
                if (foundClub) {
                    selectedClubName = foundClub.name || foundClub.shortName || 'Клуб';
                }
            }
        } catch (error) {
            console.error('Failed to load club data from API:', error);
        }

        // Fallback to JSON file if API fails
        if (selectedClubName === 'Клуб') {
            try {
                const response = await fetch('/json/Club.json');
                if (response.ok) {
                    const data = await response.json();
                    const clubs = data.clubs || [];
                    const foundClub = clubs.find(c => c.id == clubId);
                    
                    if (foundClub) {
                        selectedClubName = foundClub.name || foundClub.shortName || 'Клуб';
                    }
                }
            } catch (error) {
                console.error('Failed to load club data from JSON:', error);
            }
        }

        this.render(clubId, selectedClubName);
    }

    render(clubId, selectedClubName) {

        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #f5f5f5;
                    min-height: 100vh;
                }
                
                .page-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f5f5f5;
                }
                
                .content-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 1440px;
                    padding: 64px 100px;
                    box-sizing: border-box;
                }
                
                .page-title {
                    font-family: "Inter", Helvetica, sans-serif;
                    font-weight: 700;
                    color: #1e1e1e;
                    font-size: 48px;
                    letter-spacing: -0.96px;
                    line-height: 48px;
                    margin-bottom: 16px;
                    text-align: center;
                }
                
                .club-name {
                    font-size: 24px;
                    font-weight: 600;
                    color: #1e1e1e;
                    margin-bottom: 32px;
                    text-align: center;
                }
                
                .form-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 480px;
                    gap: 24px;
                    padding: 24px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    border: 1px solid #d9d9d9;
                }
                
                .question-item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .question-label {
                    font-family: "Inter", Helvetica, sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                    color: #1e1e1e;
                    line-height: 24px;
                }
                
                .question-number {
                    font-weight: 600;
                    color: #1e1e1e;
                    margin-right: 8px;
                }
                
                .input-field {
                    padding: 12px 16px;
                    background-color: #ffffff;
                    border: 1px solid #d9d9d9;
                    border-radius: 8px;
                    font-size: 16px;
                    color: #1e1e1e;
                    width: 100%;
                    box-sizing: border-box;
                    font-family: "Inter", Helvetica, sans-serif;
                }
                
                .input-field:focus {
                    outline: none;
                    border-color: #2c2c2c;
                }
                
                .input-field::placeholder {
                    color: #b3b3b3;
                }
                
                .submit-button {
                    padding: 12px;
                    background-color: #2c2c2c;
                    color: #ffffff;
                    border: 1px solid #2c2c2c;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    font-family: "Inter", Helvetica, sans-serif;
                }
                
                .submit-button:hover {
                    background-color: #000000;
                }
                
                @media (max-width: 768px) {
                    .content-wrapper {
                        padding: 32px 20px;
                    }
                    
                    .page-title {
                        font-size: 32px;
                    }
                    
                    .club-name {
                        font-size: 20px;
                    }
                }
            </style>

            
        <div class="page-container">
            <div class="content-wrapper">
                <h1 class="page-title">Элсэлтийн форм</h1>
                <h3 class="club-name">${selectedClubName}</h3>
                
                <form class="form-container" id="registrationForm">
                    <div class="question-item">
                        <label class="question-label"><span class="question-number">1.</span>Таны мэйл хаяг (өдөр тутам ашигладаг)?</label>
                        <input type="email" class="input-field" name="email" id="email" placeholder="example@email.com" required>
                    </div>
                    
                    <div class="question-item">
                        <label class="question-label"><span class="question-number">2.</span>Таны утасны дугаар?</label>
                        <input type="tel" class="input-field" name="phone" id="phone" placeholder="+976 99999999" required>
                    </div>
                    
                    <div class="question-item">
                        <label class="question-label"><span class="question-number">3.</span>Та яагаад ${selectedClubName} клубт элсэхийг хүсэж байна вэ?</label>
                        <input type="text" class="input-field" name="reason" id="reason" placeholder="Хариултаа оруулна уу" required>
                    </div>
                    
                    <div class="question-item">
                        <label class="question-label"><span class="question-number">4.</span>Клубт орсноороо таны амьдрал, карьерт ямар өөрчлөлт авчирна гэж төсөөлж байгаа вэ?</label>
                        <input type="text" class="input-field" name="impact" id="impact" placeholder="Хариултаа оруулна уу" required>
                    </div>
                    
                    <div class="question-item">
                        <label class="question-label"><span class="question-number">5.</span>Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                        <input type="text" class="input-field" name="description" id="description" placeholder="Үг 1, Үг 2, Үг 3" required>
                    </div>
                    
                    <button type="submit" class="submit-button">Илгээх</button>
                </form>
            </div>
        </div>
        `;

        // Handle form submission
        this.querySelector('#registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                clubId: clubId,
                email: this.querySelector('#email').value,
                phone: this.querySelector('#phone').value,
                reason: this.querySelector('#reason').value,
                impact: this.querySelector('#impact').value,
                description: this.querySelector('#description').value
            };
            console.log('Registration submitted:', formData);
            alert('Элсэлтээ амжилтай илгээсэн болно. Баярлалаа!');
            // Clear the saved club id and name after successful submission
            localStorage.removeItem('register_club_id');
            localStorage.removeItem('register_club_name');
            // Navigate back to home
            if (window.Router) window.Router.navigate('/');
        });
    }
}

window.customElements.define('nc-reg-page', NcRegistrationPage);
