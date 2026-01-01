create table if not exists directions (
  id text primary key,
  label text not null
);

create table if not exists schools (
  id text primary key,
  label text not null
);

create table if not exists clubs (
  id bigserial primary key,
  name text not null,
  short_name text,
  description text,
  goal text,
  vision text,
  school text references schools(id),
  logo text,
  email text,
  phone text,
  members integer default 0
);

create table if not exists club_directions (
  club_id bigint references clubs(id) on delete cascade,
  direction_id text references directions(id) on delete cascade,
  primary key (club_id, direction_id)
);

create table if not exists users (
  id bigserial primary key,
  name text not null,
  email text unique,
  password text,
  school text,
  major text,
  year text,
  phone text,
  bio text,
  avatar_url text,
  role text default 'member',
  created_at timestamp default now()
);

create table if not exists events (
  id bigserial primary key,
  club_id bigint references clubs(id) on delete cascade,
  title text not null,
  description text,
  location text,
  starts_at timestamp,
  ends_at timestamp,
  capacity integer,
  created_by bigint references users(id),
  created_at timestamp default now()
);

create table if not exists event_registrations (
  event_id bigint references events(id) on delete cascade,
  user_id bigint references users(id) on delete cascade,
  status text default 'registered',
  created_at timestamp default now(),
  primary key (event_id, user_id)
);

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

create table if not exists club_members (
  club_id bigint references clubs(id) on delete cascade,
  user_id bigint references users(id) on delete cascade,
  role text default 'member',
  joined_at timestamp default now(),
  primary key (club_id, user_id)
);
