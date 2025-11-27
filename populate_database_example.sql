-- =====================================================
-- SCRIPT DE DADOS DE EXEMPLO
-- Popula o banco com dados fictícios para testar o dashboard
-- =====================================================

-- 1. Criar alguns leads de exemplo
INSERT INTO leads (nome, whatsapp, origem, utm_medium, utm_campaign, dispositivo, criado_em) VALUES
('Maria Silva', '11987654321', 'instagram', 'social', 'verao2024', 'mobile', NOW() - INTERVAL '2 days'),
('Ana Costa', '21976543210', 'facebook', 'cpc', 'campanha-teste', 'desktop', NOW() - INTERVAL '1 day'),
('Carla Santos', '47965432109', 'google', 'organic', NULL, 'mobile', NOW() - INTERVAL '3 hours'),
('Julia Oliveira', '11954321098', 'instagram', 'story', 'influencer-maria', 'mobile', NOW() - INTERVAL '5 days'),
('Fernanda Lima', '21943210987', 'facebook', 'cpc', 'campanha-teste', 'desktop', NOW() - INTERVAL '12 hours');

-- 2. Criar respostas do quiz para cada lead
INSERT INTO quiz_respostas (
    lead_id, 
    idade_faixa, 
    principal_desejo, 
    regiao_incomoda, 
    sinais_desgaste, 
    nivel_estresse, 
    tentativas_anteriores, 
    tempo_disponivel, 
    altura_cm, 
    peso_kg, 
    pergunta_compromisso
)
SELECT 
    id,
    CASE 
        WHEN random() < 0.25 THEN '39-45'
        WHEN random() < 0.5 THEN '46-50'
        WHEN random() < 0.75 THEN '51-60'
        ELSE '60+'
    END,
    (ARRAY['gordura', 'tonificar', 'postura', 'energia'])[floor(random() * 4 + 1)],
    (ARRAY['barriga', 'bracos', 'coxas', 'rosto'])[floor(random() * 4 + 1)],
    ARRAY(
        SELECT unnest 
        FROM unnest(ARRAY['ondas_calor', 'insonia', 'cansaco', 'humor']) 
        WHERE random() < 0.5
    ),
    (ARRAY['alto', 'moderado', 'baixo'])[floor(random() * 3 + 1)],
    (ARRAY['academia', 'dietas', 'remedios', 'nada'])[floor(random() * 4 + 1)],
    (ARRAY['5-10', '15-30', '30+'])[floor(random() * 3 + 1)],
    floor(random() * 20 + 150)::INTEGER, -- altura entre 150-170cm
    (random() * 30 + 55)::DECIMAL(5,2), -- peso entre 55-85kg
    (ARRAY['sim', 'talvez', 'nao'])[floor(random() * 3 + 1)]
FROM leads;

-- 3. Criar resultados calculados
INSERT INTO quiz_resultados (
    lead_id,
    imc,
    classificacao_imc,
    idade_real_estimada,
    idade_biologica,
    diferenca_idade,
    quantidade_sintomas
)
SELECT 
    l.id,
    ROUND(qr.peso_kg / ((qr.altura_cm / 100.0) * (qr.altura_cm / 100.0)), 2),
    CASE 
        WHEN (qr.peso_kg / ((qr.altura_cm / 100.0) * (qr.altura_cm / 100.0))) < 18.5 THEN 'abaixo'
        WHEN (qr.peso_kg / ((qr.altura_cm / 100.0) * (qr.altura_cm / 100.0))) < 25 THEN 'ideal'
        WHEN (qr.peso_kg / ((qr.altura_cm / 100.0) * (qr.altura_cm / 100.0))) < 30 THEN 'acima'
        ELSE 'obesidade'
    END,
    CASE qr.idade_faixa
        WHEN '39-45' THEN 42
        WHEN '46-50' THEN 48
        WHEN '51-60' THEN 55
        WHEN '60+' THEN 65
        ELSE 50
    END,
    CASE qr.idade_faixa
        WHEN '39-45' THEN 42
        WHEN '46-50' THEN 48
        WHEN '51-60' THEN 55
        WHEN '60+' THEN 65
        ELSE 50
    END + COALESCE(array_length(qr.sinais_desgaste, 1), 0) * 2,
    COALESCE(array_length(qr.sinais_desgaste, 1), 0) * 2,
    COALESCE(array_length(qr.sinais_desgaste, 1), 0)
FROM leads l
JOIN quiz_respostas qr ON qr.lead_id = l.id;

-- 4. Criar rastreamento do funil (simular progresso)
INSERT INTO funil_etapas (
    lead_id,
    session_id,
    etapa_atual,
    step_1_em,
    step_2_em,
    step_3_em,
    step_4_em,
    step_5_em,
    step_6_em,
    step_7_em,
    step_8_em,
    step_9_em,
    step_10_em,
    step_11_em,
    resultado_em,
    vendas_em,
    checkout_em,
    comprou_em
)
SELECT 
    l.id,
    'session_' || l.id,
    CASE 
        WHEN random() < 0.2 THEN 'step_5' -- 20% param no meio
        WHEN random() < 0.5 THEN 'resultado' -- 30% chegam no resultado
        WHEN random() < 0.7 THEN 'vendas' -- 20% vão pra vendas
        WHEN random() < 0.85 THEN 'checkout' -- 15% vão pro checkout
        ELSE 'comprou' -- 15% compram
    END,
    l.criado_em,
    l.criado_em + INTERVAL '30 seconds',
    l.criado_em + INTERVAL '1 minute',
    l.criado_em + INTERVAL '90 seconds',
    l.criado_em + INTERVAL '2 minutes',
    l.criado_em + INTERVAL '150 seconds',
    l.criado_em + INTERVAL '3 minutes',
    l.criado_em + INTERVAL '210 seconds',
    l.criado_em + INTERVAL '4 minutes',
    l.criado_em + INTERVAL '270 seconds',
    l.criado_em + INTERVAL '5 minutes',
    CASE WHEN random() > 0.2 THEN l.criado_em + INTERVAL '6 minutes' ELSE NULL END,
    CASE WHEN random() > 0.5 THEN l.criado_em + INTERVAL '8 minutes' ELSE NULL END,
    CASE WHEN random() > 0.7 THEN l.criado_em + INTERVAL '10 minutes' ELSE NULL END,
    CASE WHEN random() > 0.85 THEN l.criado_em + INTERVAL '12 minutes' ELSE NULL END
FROM leads l;

-- 5. Criar algumas compras (15% dos leads)
INSERT INTO compras (
    lead_id,
    valor,
    metodo_pagamento,
    status,
    transacao_id
)
SELECT 
    l.id,
    297.00, -- valor do produto
    (ARRAY['pix', 'cartao'])[floor(random() * 2 + 1)],
    'aprovado',
    'txn_' || substring(md5(random()::text) from 1 for 16)
FROM leads l
WHERE random() < 0.15; -- 15% de conversão

-- Mensagem de sucesso
SELECT 
    (SELECT COUNT(*) FROM leads) as total_leads,
    (SELECT COUNT(*) FROM quiz_respostas) as total_respostas,
    (SELECT COUNT(*) FROM quiz_resultados) as total_resultados,
    (SELECT COUNT(*) FROM funil_etapas) as total_etapas,
    (SELECT COUNT(*) FROM compras) as total_compras;

-- =====================================================
-- COMO USAR ESTE SCRIPT:
-- 
-- 1. Execute este SQL no editor do Supabase
-- 2. Ou use o dashboard MCP:
--    mcp0_execute_sql(project_id, query)
-- 3. Acesse http://localhost:3000/dashboard
-- =====================================================
