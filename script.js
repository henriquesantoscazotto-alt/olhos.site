const input   = document.getElementById('codeInput');
const message = document.getElementById('message');
const granted = document.getElementById('granted');

// ⚠️ CONFIGURE AQUI
const REDIRECT_URL = 'https://exemplo.com';       // troque pelo seu destino
const VALID_ANSWERS = ['testemunha', 'testemunhar']; // palavras aceitas

// Normaliza texto: minúsculas + remove acentos + trim
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function tryAccess() {
  const value = normalize(input.value);

  if (VALID_ANSWERS.includes(value)) {
    // Sucesso — intensifica o som dramático
    if (typeof audioCtx !== 'undefined' && audioCtx && soundEnabled) {
      audioNodes.forEach(node => {
        if (node.gain) {
          node.gain.linearRampToValueAtTime(
            node.gain.value * 2,
            audioCtx.currentTime + 1.5
          );
        }
      });
    }

    granted.classList.add('active');

    // Redireciona após a animação
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 2500);

  } else {
    // Erro
    input.classList.add('error');
    message.classList.add('show');

    setTimeout(() => {
      input.classList.remove('error');
      message.classList.remove('show');
    }, 1800);
  }
}

// Enter para confirmar
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    tryAccess();
  }
});
