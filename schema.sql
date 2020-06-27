CREATE TABLE sound (
  id serial primary key,
  name varchar not null,
  server_id varchar not null,
  uri varchar,
  upload_date timestamp not null default NOW(),
  play_count int not null default 0,
  duration float not null default 0.0,
  CONSTRAINT name_server_id_uniq UNIQUE (name, server_id)
);

