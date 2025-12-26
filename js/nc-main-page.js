class NcRegistrationPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #f5f5f5;
                }
                
                .page-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f5f5f5;
                }
                
                .header {
                    display: flex;
                    width: 100%;
                    max-width: 1440px;
                    align-items: center;
                    justify-content: space-between;
                    padding: 32px 100px;
                    background-color: #ffffff;
                    border-bottom: 1px solid #d9d9d9;
                    box-sizing: border-box;
                }
                
                .logo {
                    font-family: "Leckerli One", cursive;
                    font-size: 40px;
                    font-weight: 400;
                    color: #1e1e1e;
                    letter-spacing: -1.2px;
                    text-decoration: none;
                }
                
                .navigation {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                
                .nav-link {
                    padding: 8px;
                    color: #1e1e1e;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 16px;
                }
                
                .content-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 1440px;
                    padding: 64px 480px;
                    box-sizing: border-box;
                }
                
                .page-title {
                    font-family: "Inter", Helvetica, sans-serif;
                    font-weight: 700;
                    color: #1e1e1e;
                    font-size: 48px;
                    letter-spacing: -0.96px;
                    line-height: 48px;
                    margin-bottom: 24px;
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
                
                .input-field {
                    padding: 12px 16px;
                    background-color: #ffffff;
                    border: 1px solid #d9d9d9;
                    border-radius: 8px;
                    font-size: 16px;
                    color: #1e1e1e;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .input-field:focus {
                    outline: none;
                    border-color: #2c2c2c;
                }
                
                .input-field::placeholder {
                    color: #b3b3b3;
                }
                
                .radio-group {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                
                .radio-option {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .radio-option input[type="radio"] {
                    width: 16px;
                    height: 16px;
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
                }
                
                .submit-button:hover {
                    background-color: #000000;
                }
                
                .question-number {
                    font-weight: 600;
                    color: #1e1e1e;
                    margin-right: 8px;
                }
            </style>

            <div class="page-container">
                <div class="header">
                    <a href="#home" class="logo">Club.</a>
                    <nav class="navigation">
                        <a href="clubs.html" class="nav-link">Клуб</a>
                        <a href="events.html" class="nav-link">Эвент</a>
                        <a href="#profile" class="nav-link">Профайл</a>
                    </nav>
                </div>
                
                <div class="content-wrapper">
                    <h1 class="page-title">Элсэлтийн форм</h1>
                    <h3 class="club-name">Hackum students club</h3>
                    
                    <form class="form-container" id="registrationForm">
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">1.</span>Таны мэйл хаяг (өдөр тутам ашигладаг)?</label>
                            <input type="email" class="input-field" placeholder="example@email.com" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">2.</span>Таны утасны дугаар?</label>
                            <input type="tel" class="input-field" placeholder="99999999" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">3.</span>Та яагаад Hackum клубт элсэхийг хүсэж байна вэ?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">4.</span>Технологийн клубт орсноороо таны амьдрал, карьерт ямар өөрчлөлт авчирна гэж төсөөлж байгаа вэ?</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="experience" value="1-2" required>
                                    <span>1-2 жил</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="experience" value="3-5">
                                    <span>3-5 жил</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="experience" value="6+">
                                    <span>6+ жил</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">5.</span>Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">6.</span>Та өмнө нь ямар нэгэн клубт гишүүнээр элссэн туршлагатай юу?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">7.</span>Таны хоби юу вэ?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">8.</span>Та ямар төрлийн идэвхитэй оролцохыг хүсч байна?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">9.</span>Та долоо хоногт хэдэн цаг клубын үйл ажиллагаанд зориулах боломжтой вэ?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <div class="question-item">
                            <label class="question-label"><span class="question-number">10.</span>Таны ирээдүйн зорилго юу вэ?</label>
                            <input type="text" class="input-field" placeholder="Таны хариулт" required>
                        </div>
                        
                        <button type="submit" class="submit-button">Илгээх</button>
                    </form>
                </div>
            </div>
        `;
        
        this.querySelector('#registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted!');
            alert('Таны хүсэлтийг амжилттай илгээлээ!');
        });
    }
}

window.customElements.define('nc-registration-page', NcRegistrationPage);
