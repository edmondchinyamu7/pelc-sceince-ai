// === Splash Screen Timer (10 seconds) ===
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.classList.add('fade-out');
    document.getElementById('app').classList.remove('hidden');

    setTimeout(() => splash.style.display = 'none', 800);
  }, 10000); // 10 seconds
});

// === AI Assistant (placeholder response) ===
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotReply(question) {
  const q = question.toLowerCase();

  if (q.includes('photosynthesis'))
    return "Photosynthesis is the process plants use to convert sunlight, water, and CO₂ into glucose and oxygen. 🌱";
  if (q.includes('gravity'))
    return "Gravity is the force that attracts objects with mass toward each other. On Earth it accelerates objects at ~9.8 m/s². 🌍";
  if (q.includes('atom'))
    return "An atom is the smallest unit of matter, made of protons, neutrons, and electrons. ⚛️";
  if (q.includes('dna'))
    return "DNA is the molecule carrying genetic instructions for life, shaped like a double helix. 🧬";
  if (q.includes('water') || q.includes('h2o'))
    return "Water (H₂O) is a polar molecule essential for all known life. 💧";
  if (q.includes('newton'))
    return "Newton's laws describe motion: inertia, F = ma, and action-reaction. 📐";

  return "Great question! A full AI backend will power this soon. For now try asking about: photosynthesis, gravity, atoms, DNA, or Newton's laws. 🔬";
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  userInput.value = '';

  setTimeout(() => {
    addMessage(getBotReply(text), 'bot');
  }, 600);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});
