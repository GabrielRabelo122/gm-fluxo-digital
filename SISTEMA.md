# Sistema de Solicitações - Guarda Municipal

## Funcionalidades Implementadas

### ✅ Interface Completa
- **Autenticação**: Login e cadastro com perfis (Guarda Municipal, Administrador, Comandante)
- **Dashboard**: Visão geral com ações rápidas e histórico de solicitações
- **Formulários**: 
  - Dispensa (múltiplos dias não sequenciais)
  - Atestado (upload de arquivo)
  - Permuta (troca entre guardas)

### 🎨 Design System
- Cores oficiais da Guarda Municipal (#001F54)
- Estados visuais para solicitações (Pendente, Aprovado, Negado)
- Interface responsiva e profissional
- Componentes reutilizáveis

### 📱 Experiência do Usuário
- Navegação intuitiva com botões de voltar
- Validação de formulários
- Notificações toast
- Layout limpo e objetivo

## Próximos Passos: Backend com Supabase

Para ativar todas as funcionalidades do sistema (autenticação real, banco de dados, etc.), você precisa conectar o projeto ao Supabase:

### Como Conectar
1. Clique no botão verde **Supabase** no topo direito da interface
2. Conecte sua conta Supabase
3. O sistema irá automaticamente configurar:
   - Tabelas do banco de dados
   - Autenticação de usuários
   - Upload de arquivos
   - Políticas de segurança (RLS)

### Estrutura do Banco (será criada automaticamente)
```sql
-- Usuários
usuarios: id, usuario, senha_hash, perfil, nome_completo, matricula, status

-- Solicitações principais
solicitacoes: id, usuario_id, tipo, status, data_criacao

-- Tipos específicos
dispensas: id, solicitacao_id, datas_especificas, motivo, observacoes
atestados: id, solicitacao_id, arquivo_upload, motivo, data_atestado
permutas: id, solicitacao_id, guarda_proponente_id, guarda_alvo_id, plantao_cedido, plantao_recebido
```

### Fluxos de Trabalho
1. **Dispensa**: Guarda → Administrador → Comandante
2. **Atestado**: Guarda → Administrador → Comandante  
3. **Permuta**: Guarda A → Guarda B → Administrador → Comandante

### Recursos Avançados (pós-Supabase)
- Assinatura digital nas aprovações
- Notificações automáticas
- Histórico completo de alterações
- Relatórios e estatísticas
- Backup automático

## Tecnologias Utilizadas
- **Frontend**: React + TypeScript + Tailwind CSS
- **Componentes**: shadcn/ui
- **Backend**: Supabase (após conexão)
- **Autenticação**: Supabase Auth
- **Banco**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage (para arquivos)