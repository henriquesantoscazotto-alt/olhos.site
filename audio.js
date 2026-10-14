let audioCtx = null;
let audioNodes = [];
let soundEnabled = true;

function initAudio() {
  if (audioCtx) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Gain principal
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.0;
  masterGain.connect(audioCtx.destination);

  // Fade in suave
  masterGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 4);

  // Tom grave 1 (drone principal)
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 55;
  const g1 = audioCtx.createGain();
  g1.gain.value = 0.5;
  osc1.connect(g1).connect(masterGain);
  osc1.start();

  // Tom grave 2 (levemente desafinado — batimento)
  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 55.3;
  const g2 = audioCtx.createGain();
  g2.gain.value = 0.4;
  osc2.connect(g2).connect(masterGain);
  osc2.start();

  // Sub-grave
  const osc3 = audioCtx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.value = 27.5;
  const g3 = audioCtx.createGain();
  g3.gain.value = 0.35;
  osc3.connect(g3).connect(masterGain);
  osc3.start();

  // Ruído filtrado (vento distante)
  const bufferSize = 2 * audioCtx.sampleRate;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 400;
  noiseFilter.Q.value = 2;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.15;

  noise.connect(noiseFilter).connect(noiseGain).connect(masterGain);
  noise.start();

  // LFO lento para modular a intensidade (respiração)
  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.06;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain).connect(masterGain.gain);
  lfo.start();

  audioNodes = [osc1, osc2, osc3, noise, lfo, masterGain];
}

// Inicia o áudio na primeira interação (política de autoplay dos navegadores)
function startAudioOnFirstInteraction() {
  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  document.removeEventListener('click', startAudioOnFirstInteraction);
  document.removeEventListener('keydown', startAudioOnFirstInteraction);
}

document.addEventListener('click', startAudioOnFirstInteraction);
document.addEventListener('keydown', startAudioOnFirstInteraction);

// Botão de som (mutar / ativar)
const soundToggle = document.getElementById('soundToggle');

soundToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  soundEnabled = !soundEnabled;

  if (!audioCtx) {
    initAudio();
  }

  if (soundEnabled) {
    audioCtx.resume();
    soundToggle.textContent = '♪';
    soundToggle.style.color = '#555';
  } else {
    audioCtx.suspend();
    soundToggle.textContent = '✕';
    soundToggle.style.color = '#2a2a2a';
  }
});
