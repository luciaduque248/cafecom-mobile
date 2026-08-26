create table if not exists public.app_health (
  id smallint primary key default 1 check (id = 1),
  status text not null default 'ok',
  created_at timestamptz not null default now()
);

alter table public.app_health enable row level security;

create policy "Health status is publicly readable"
on public.app_health
for select
to anon, authenticated
using (true);

insert into public.app_health (id, status)
values (1, 'ok')
on conflict (id) do update set status = excluded.status;

comment on table public.app_health is
'Single read-only row used by CaféCom availability monitoring.';
