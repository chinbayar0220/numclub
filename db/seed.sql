insert into directions (id, label) values
  ('volunteer', 'Сайн дурын'),
  ('sport', 'Спорт'),
  ('art', 'Урлаг'),
  ('open', 'Чөлөөт'),
  ('photo', 'Фото зураг'),
  ('science', 'Шинжлэх ухаан'),
  ('it', 'Мэдээллийн технологи'),
  ('language', 'Хэл судлал')
on conflict (id) do update set label = excluded.label;

insert into schools (id, label) values
  ('bs', 'БС'),
  ('its', 'ИТС'),
  ('mtes', 'МТЭС'),
  ('uts', 'УТСОХУС'),
  ('khs', 'ХЗС'),
  ('shus', 'ШУС')
on conflict (id) do update set label = excluded.label;

insert into clubs (id, name, short_name, description, school, logo, members) values
  (1, 'Artemisia', 'Artemisia', '"Artemisia" клуб нь 2022 оны намар үүсгэн байгуулагдсан бөгөөд байгуулагдсан өдрөөсөө хойш уран зургийн чиглэлээр тасралтгүй үйл ажиллагаагаа амжилттай явуулсаар ирсэн МУИС-д харъяалагдах бие даасан уран зургийн цор ганц клуб билээ. Одоогийн байдлаар "Artemisia"  клуб нь 65 идэвхтэй гишүүдтэй. Мөн үйл ажиллагааны хувьд гишүүдийн хооронд мэдлэг мэдээлэл олгох, урлагаар нийгэмшүүлэх, уран зургийн авъяас чадварыг өргөжүүлэхийг гол зорилго, зорилтоо болгон ажилладаг клуб юм.', 'shus', 'images/clubsartemisia.png', 65),
  (2, 'Astrology Club', 'Astrology', 'Астрологи клуб нь 2022 оны 10-р сараас хойш үйл ажиллагаагаа явуулж эхэлсэн бөгөөд одон орон, зурхайн судлалаар үйл ажиллагаа явуулдаг.', 'shus', 'images/clubs/astrology.png', 42),
  (3, 'Bilim Club', 'Bilim', 'МУИС-ийн харьяа казах оюутан залуусийн нэгдэл Билим клуб', 'its', 'images/clubs/bilim.png', 80),
  (4, 'BSONK Club', 'BSONK', 'МУИС-Бизнесийн сургуулийн оюутны нэгдэл /БСОНК/ клуб нь оюутан оюутнаа дэмжих цогц төсөл хөтөлбөрүүдийг хэрэгжүүлэх, оюутны хөгжлийг дараагийн түвшинд хүргэх, бие даасан, хариуцлагатай, зөөлөн ур чадвартай оюутнуудыг бэлтгэх зорилгоор байгуулагдсан бөгөөд өдийг хүртэл тасралтгүй үйл ажиллагаа явуулж байна.', 'bs', 'images/clubs/bsonk.png', 100),
  (5, 'Delta Club', 'Delta', 'МУИС, ШУС, БУС, Физикийн тэнхимийн харьяа “ДЕЛЬТА- ОНОЛЫН ФИЗИКИЙН КЛУБ” нь их сургуулийн оюутнуудын дунд физикийн шинжлэх ухааныг гүнзгийрүүлэн судлах сонирхлыг нэмэгдүүлэх, физик судлах соёлыг дэлгэрүүлэх сайн дурын нэгдэл.', 'shus', 'images/clubs/delta.png', 55),
  (6, 'DEVILISH CROCODILE', 'DEVILISH CROCODILE', 'DEVILISH CROCODILE friendly volunteer club нь олон төрлийн өөрийгөө хөгжүүлэх сургалт, тэмцээн, сэтгэл зүйн эрүүл мэндэд чиглэсэн үйл ажиллагаа, сайн дурын олон талт ажлуудыг зохион байгуулдаг үйл ажиллагаа бүртээ Certificate өгдөг, тодорхойлох захидал бичиж өгдөг, төгсөхөд нь 2 төрлийн дипломтой төгсгөдөг МУИС-ийн анхны клуб юм', 'uts', 'images/clubs/photo.png', 25),
  (7, 'Ecology Erdem Club', 'EEC', 'МУИС-ын Биологийн тэнхимийн дэргэдэх Экологи-Эрдэм клуб нь 21 дэх жилдээ үйл ажиллагаагаа явуулж буй 3 удаагийн шилдэг ууган клуб юм.', 'shus', 'images/clubs/eec.png', 40),
  (8, 'Hackum Students Club', 'Hackum', 'Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудынд мэдлэгийг хөгжүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг.', 'mtes', 'images/clubs/hackum.png', 70),
  (9, 'INFINITY', 'INFINITY', 'сайн дурын үндсэн дээр муисийн оюутан залуусын чөлөөт цагийг зөв боловсон өнгрүүлэхэд орчин, үйл ажиллагаа хийх боломжийг бүрдүүлэн, оюутнуудын дунд спорт, урлаг, соёлын арга хэмжээг зохион байгуулж, нийгэмд эерэг өөрчлөлт авчрах үйлсэд хувь нэмрээ оруулан ажилладаг клуб юм.', 'shus', 'images/clubs/infinity.png', 120)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  description = excluded.description,
  school = excluded.school,
  logo = excluded.logo,
  members = excluded.members;

insert into club_directions (club_id, direction_id) values
  (1, 'art'),
  (1, 'open'),
  (2, 'volunteer'),
  (2, 'science'),
  (3, 'volunteer'),
  (3, 'open'),
  (4, 'open'),
  (5, 'science'),
  (6, 'volunteer'),
  (6, 'open'),
  (7, 'science'),
  (7, 'volunteer'),
  (8, 'it'),
  (8, 'science'),
  (8, 'open'),
  (9, 'volunteer'),
  (9, 'open')
on conflict do nothing;

select setval(pg_get_serial_sequence('clubs', 'id'), (select max(id) from clubs));

alter table clubs add column if not exists goal text;
alter table clubs add column if not exists vision text;
alter table clubs add column if not exists email text;
alter table clubs add column if not exists phone text;
alter table users add column if not exists password text;
alter table users add column if not exists school text;
alter table users add column if not exists major text;
alter table users add column if not exists year text;
alter table users add column if not exists phone text;
alter table users add column if not exists bio text;
alter table users add column if not exists avatar_url text;

create table if not exists club_requests (
  id bigserial primary key,
  club_id bigint references clubs(id) on delete cascade,
  email text not null,
  phone text,
  reason text,
  impact text,
  description text,
  status text default 'pending',
  decided_at timestamp,
  decided_by text,
  created_at timestamp default now()
);

create table if not exists club_reviews (
  id bigserial primary key,
  club_id bigint references clubs(id) on delete cascade,
  user_id bigint references users(id) on delete set null,
  rating integer check (rating between 1 and 5),
  title text,
  body text,
  created_at timestamp default now()
);
