class NcRegistrationPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                article h2{
                    text-align: right;
                }
                header{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                form{
                    display:flex;
                    flex-direction:column;
                    gap:16px;
                    }
                .main{
                    display:flex;
                    flex-direction:column;
                    gap:32px;
                    margin-left:100px;
                    margin-right:100px;}
            </style>

            
        <div class="main">
            <h2>Элсэлтийн форм</h2>
            <h3>Hackum students club</h3>
            <div class="form">
                <ol>
                    <li>
                        <section class="question">
                            <label for="mail">Таны мэйл хаяг (өдөр тутам ашигладаг)?</label>
                            <br>
                            <input type="text" name="id1" id="id1" value="mail" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="mail">Таны мэйл хаяг (өдөр тутам ашигладаг)?</label>
                            <br>
                            <input type="text" name="id1" id="id1" value="mail" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Та яагаад Hackum клубт элсэхийг хүсэж байна вэ?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Технологийн клубт орсноороо таны амьдрал, карьерт ямар өөрчлөлт авчирна гэж төсөөлж байгаа вэ?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" placeholder">
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="patty">Өөрийгөө 3 үгээр илэрхийл гэвэл?</label>
                            <br>
                            <input type="text" name="id2" id="id2" value="answer" required>
                        </section>
                    </li>
                    
                </ol>
                <form>
                    <input type="submit" value="Илгээх">
            </div>
        </div>
        `;
    }
}

window.customElements.define('nc-reg-page', NcRegistrationPage);
