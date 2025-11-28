-- Habilitar leitura pública na tabela leads para o dashboard funcionar
create policy "Enable read access for all users"
on "public"."leads"
as PERMISSIVE
for SELECT
to public
using (true);

-- Habilitar leitura pública na tabela quiz_respostas
create policy "Enable read access for all users"
on "public"."quiz_respostas"
as PERMISSIVE
for SELECT
to public
using (true);

-- Habilitar leitura pública na tabela quiz_resultados
create policy "Enable read access for all users"
on "public"."quiz_resultados"
as PERMISSIVE
for SELECT
to public
using (true);

-- Habilitar leitura pública na tabela funil_etapas
create policy "Enable read access for all users"
on "public"."funil_etapas"
as PERMISSIVE
for SELECT
to public
using (true);

-- Habilitar leitura pública na tabela compras
create policy "Enable read access for all users"
on "public"."compras"
as PERMISSIVE
for SELECT
to public
using (true);
