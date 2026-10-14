# Silentium — Acesso Restrito

Página de acesso com estética sombria e minimalista. A senha correta 
redireciona para outro site.

## 🔑 Senhas aceitas

- `Testemunha`
- `Testemunhar`

(Insensível a maiúsculas/minúsculas e acentos.)

## 🚀 Como usar

### GitHub Pages
1. Suba todos os arquivos na raiz do repositório
2. Vá em **Settings → Pages**
3. Em *Source*, selecione a branch `main` e a pasta `/ (root)`
4. Salve e aguarde alguns segundos
5. Acesse `https://SEU-USUARIO.github.io/SEU-REPO/`

### Localmente
Basta abrir o `index.html` no navegador.

## ⚙️ Configuração

No arquivo `script.js`, ajuste:

```js
const REDIRECT_URL  = 'https://exemplo.com';         // site de destino
const VALID_ANSWERS = ['testemunha', 'testemunhar']; // palavras aceitas
