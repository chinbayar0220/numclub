import { getClubs } from "./apiclient.js";
class NcClubsList extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback(){
        let items =[];
        const result = await getClubs();
        items = result.data.clubs;
        console.log(items)
        // if (!items || !items.length) {
        //     items = [
        //         { cname: 'Hackum students club', img: 'images/club_logo.svg' },
        //         { cname: 'Утга зохиолын нэгдэл', desc: 'Бид утга зохиол судлаач, сонирхогч оюутан залуусын ур чадварыг нээн илрүүлэхээс гадна урлаг, уран зохиолын мэдрэмж бүхий сонголттой уншигч, үндэсний сэхээтнийг бэлтгэн гаргах зорилготой.'},
        //         { cname: 'Психея клуб', desc: 'Сэтгэл судлалын тэнхимийн харъяа "Психея клуб" нь мэргэжлийн оюутнуудад мэргэжлийн чиг баримжаа олгох, МУИС-ийн нийт оюутнуудад сэтгэл зүйн сайн сайхан байдлыг сурталчлах, сэтгэл зүйн зөвлөгөө үйлчилгээнд хамрагдах сэдлийг олгох үндсэн зорилготой сайн дурын клуб юм.'},
        //         { cname: 'Astrology club', desc: 'Астрологи клуб нь 2022 оны 10-р сараас хойш үйл ажиллагаа явуулж эхэлсэн бөгөөд одон орон, зурхайн судлалаар үйл ажиллагаа явуулдаг.'},
        //         { cname: 'Мераки клуб', desc: 'Оюутнуудынхаа сэтгэл зүйн тогтвортой байдлыг бий болгож, хөгжих, бусдад өөрийгөө илэрхийлэх, чөлөөт цагаа зөв боловсон өнгөрүүлэхэд дэмжлэг туслалцаа үзүүлэн халуун дулаан харилцаа, сэтгэл ханамжийг эрхэмлэн эерэг хандлагыг түгээхийг эрхэмлэдэг халуун дулаан гэр бүл.'},
        //         { cname: 'Artemisia', desc: 'Artemisia клуб нь  2022 оны намар үүсгэн байгуулагдсан бөгөөд байгуулагдсан өдрөөсөө хойш уран зургийн чиглэлээр тасралтгүй үйл ажиллагаагаа амжилттай явуулсаар ирсэн МУИС-д харъяалагдах бие даасан зургийн цор ганц клуб билээ.'},
        //         { cname: 'Num Career Club', desc: 'NUM Career клуб нь МУИС-ийн суралцагчдыг хөдөлмөрийн зах зээлд бэлтгэх, сургалтаас хөдөлмөрт шилжих шилжилтийг дэмжих, ажлын байранд шаардлагатай ур чадварыг нэмэгдүүлэх зорилгоор CV бичих, ажлын ярилцлагад бэлдэх, ажилд зуучлах зэрэгт мэргэжлийн болон туршлагад суурилсан зөвлөгөө, сургалт, арга хэмжээнүүдийг зохион байгуулж байгаа сайн дурын клуб юм.'}
        //     ];
        // }


        const container = document.createElement('div');
        container.className = 'clubs';

        items.forEach((it, idx) => {
            console.log("===========================================",it,idx)
            const el = document.createElement('nc-clubcard');
            if (it.cname) el.setAttribute('cname', it.cname);
            if (it.desc) el.setAttribute('desc', it.desc);
            if (it.img) el.setAttribute('img', it.img);
            const clubId = it.id || String(idx + 1);
            el.setAttribute('club-id', clubId);
            el.setAttribute('data-index', String(idx));
            el.setAttribute('tabindex', '0');
            el.addEventListener('click', () => {
                const detail = { index: idx, cname: it.cname || null, id: it.id || null };
                this.dispatchEvent(new CustomEvent('club-select', { detail, bubbles: true }));
            });
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('club-select', { detail: { index: idx, cname: it.cname || null, id: it.id || null }, bubbles: true }));
                }
            });
            container.appendChild(el);
        });

        this.innerHTML = '';
        this.appendChild(container);
    }
}

if (!customElements.get('nc-clubs-list')) {
    customElements.define('nc-clubs-list', NcClubsList);
}
