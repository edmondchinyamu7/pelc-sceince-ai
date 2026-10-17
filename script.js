// PELC Science AI — original homepage plus Physics Phases A–D
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    const app = document.getElementById('app');
    splash?.classList.add('fade-out'); app?.classList.remove('hidden');
    setTimeout(() => { if (splash) splash.style.display = 'none'; }, 800);
  }, 10000);
});

// Mobile navigation
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Original-style built-in assistant (not a connected AI backend yet)
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');
function addMessage(text, sender) {
  const div = document.createElement('div'); div.className = `msg ${sender}`;
  div.textContent = text; chatLog.appendChild(div); chatLog.scrollTop = chatLog.scrollHeight;
}
function getBotReply(question) {
  const q = question.toLowerCase();
  if (q.includes('photosynthesis')) return 'Photosynthesis is the process plants use to convert sunlight, water, and carbon dioxide into glucose and oxygen. 🌱';
  if (q.includes('gravity')) return 'Gravity is the attraction between objects with mass. Near Earth’s surface, gravitational acceleration is about 9.8 m/s². 🌍';
  if (q.includes('atom')) return 'An atom is a basic unit of matter. It contains a nucleus with protons and usually neutrons, with electrons around it. ⚛️';
  if (q.includes('dna')) return 'DNA carries genetic instructions used by living organisms. Its structure is a double helix. 🧬';
  if (q.includes('water') || q.includes('h2o')) return 'Water is H₂O: each molecule contains two hydrogen atoms and one oxygen atom. 💧';
  if (q.includes('newton') || q.includes('force') || q.includes('f = ma')) return 'Newton’s second law is F = ma: resultant force equals mass multiplied by acceleration. Measure mass in kg and acceleration in m/s² to get force in newtons (N).';
  if (q.includes('speed')) return 'Average speed = distance ÷ time. For example, 100 metres travelled in 20 seconds gives 5 m/s.';
  if (q.includes('energy')) return 'Energy is the ability to do work. Common forms include kinetic, gravitational potential, chemical, thermal and electrical energy.';
  if (q.includes('electric') || q.includes('ohm')) return 'Ohm’s law is V = IR: voltage equals current multiplied by resistance. Voltage is in volts, current in amperes and resistance in ohms.';
  if (q.includes('density')) return 'Density = mass ÷ volume. The SI unit is kg/m³.';
  return 'Good question! This is the demo assistant, so its answers are limited. Try asking about photosynthesis, gravity, atoms, DNA, speed, energy, density, electricity or Newton’s laws. 🔬';
}
function handleSend() {
  const text = userInput.value.trim(); if (!text) return;
  addMessage(text, 'user'); userInput.value = ''; userInput.focus();
  setTimeout(() => addMessage(getBotReply(text), 'bot'), 350);
}
sendBtn?.addEventListener('click', handleSend);
userInput?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

// Phase A: topic library
const topics = [
 {name:'Motion',icon:'🏃',summary:'How objects change position over time.',body:'Motion describes a change in position relative to a reference point. Distance is the total path travelled; displacement is the straight-line change from start to finish and has direction. Speed = distance ÷ time. Velocity is speed in a specified direction.'},
 {name:'Forces & Newton’s Laws',icon:'🧲',summary:'Pushes, pulls and their effects.',body:'A force can change an object’s speed, direction or shape. Newton’s first law describes inertia; the second law is F = ma; the third law says forces occur in equal and opposite pairs acting on different objects. Force is measured in newtons (N).'},
 {name:'Work, Energy & Power',icon:'⚡',summary:'Energy transfers and the rate of doing work.',body:'Work is done when a force causes displacement in its direction: W = Fd for a constant aligned force. Kinetic energy is Ek = ½mv². Near Earth, gravitational potential energy is Ep = mgh. Power is the rate of energy transfer: P = W/t.'},
 {name:'Momentum',icon:'🎱',summary:'Mass in motion and collisions.',body:'Momentum is p = mv and is measured in kg·m/s. In an isolated system, total momentum is conserved. Impulse equals the change in momentum and can be written FΔt = Δp when the force is constant.'},
 {name:'Waves & Sound',icon:'〰️',summary:'Energy travelling through oscillations.',body:'Waves transfer energy without a net transfer of matter. Frequency is measured in hertz (Hz), wavelength in metres, and wave speed is v = fλ. Sound is a mechanical wave and needs a medium; light can travel through a vacuum.'},
 {name:'Heat & Temperature',icon:'🌡️',summary:'Thermal energy and particle motion.',body:'Temperature relates to the average random kinetic energy of particles. Heat is energy transferred because of a temperature difference. Heating can occur by conduction, convection and radiation. For a temperature change, Q = mcΔT.'},
 {name:'Electricity',icon:'🔌',summary:'Charge, current, voltage and resistance.',body:'Electric current is the rate of flow of charge: I = Q/t. Voltage is energy transferred per unit charge. Ohm’s law is V = IR for an ohmic conductor under constant physical conditions. Electrical power can be calculated using P = VI.'},
 {name:'Matter & Density',icon:'🧊',summary:'Properties of solids, liquids and gases.',body:'Matter has mass and occupies space. Density is mass per unit volume: ρ = m/V. Solids generally keep their shape, liquids flow but keep a fixed volume, and gases expand to fill their container.'},
 {name:'Pressure',icon:'📍',summary:'Force acting over an area.',body:'Pressure is the normal force per unit area: p = F/A. Its SI unit is the pascal (Pa), equal to one newton per square metre. In a fluid at rest, pressure generally increases with depth.'},
 {name:'Space & Gravity',icon:'🪐',summary:'Gravity, planets and the universe.',body:'Gravity attracts objects with mass. Planets orbit stars because of gravity and their motion. The force of gravity near Earth gives objects a downward acceleration of about 9.8 m/s², although air resistance changes the motion of many falling objects.'}
];
const topicGrid = document.getElementById('topic-grid');
const topicDetail = document.getElementById('topic-detail');
topics.forEach((t, i) => {
  const b = document.createElement('button'); b.className = 'topic-card'; b.type = 'button';
  b.innerHTML = `<strong>${t.icon} ${t.name}</strong><span>${t.summary}</span>`;
  b.addEventListener('click', () => {
    topicGrid.querySelectorAll('.topic-card').forEach(x => x.classList.remove('selected')); b.classList.add('selected');
    topicDetail.innerHTML = `<h4>${t.icon} ${t.name}</h4><p>${t.body}</p>`;
  }); topicGrid.appendChild(b);
});

// Phase B: formula library
const formulas = [
 ['Speed','v = d ÷ t','Average speed = distance travelled divided by time.','m/s'],['Distance','d = vt','Distance for constant speed = speed × time.','m'],['Time','t = d ÷ v','Time = distance divided by average speed.','s'],
 ['Acceleration','a = (v − u) ÷ t','Change in velocity divided by elapsed time.','m/s²'],['Resultant force','F = ma','Mass multiplied by acceleration.','N'],['Weight','W = mg','Mass multiplied by gravitational field strength.','N'],
 ['Density','ρ = m ÷ V','Mass divided by volume.','kg/m³'],['Pressure','p = F ÷ A','Force acting normally divided by area.','Pa'],['Work done','W = Fd','For a constant force aligned with displacement.','J'],
 ['Power','P = W ÷ t','Work done or energy transferred per unit time.','W'],['Kinetic energy','Ek = ½mv²','Energy due to motion.','J'],['Potential energy','Ep = mgh','Gravitational potential energy near Earth’s surface.','J'],
 ['Momentum','p = mv','Mass multiplied by velocity.','kg·m/s'],['Wave speed','v = fλ','Frequency multiplied by wavelength.','m/s'],['Charge','Q = It','Current multiplied by time.','C'],
 ['Ohm’s law','V = IR','Voltage = current × resistance.','V'],['Electrical power','P = VI','Voltage multiplied by current.','W'],['Heating','Q = mcΔT','Energy to change temperature, ignoring phase changes.','J']
];
const formulaGrid = document.getElementById('formula-grid');
function renderFormulas(filter='') {
  formulaGrid.innerHTML = ''; const term = filter.toLowerCase();
  formulas.filter(f => f.join(' ').toLowerCase().includes(term)).forEach(f => {
    const card = document.createElement('article'); card.className = 'formula-card';
    const title = document.createElement('strong'); title.textContent = f[0];
    const formula = document.createElement('div'); formula.className = 'formula'; formula.textContent = f[1];
    const desc = document.createElement('p'); desc.textContent = f[2];
    const unit = document.createElement('p'); unit.textContent = `Common answer unit: ${f[3]}`; unit.style.marginTop = '8px'; unit.style.color = '#00d4ff';
    card.append(title, formula, desc, unit); formulaGrid.appendChild(card);
  });
  if (!formulaGrid.children.length) formulaGrid.textContent = 'No formulas match that search.';
}
renderFormulas(); document.getElementById('formula-search').addEventListener('input', e => renderFormulas(e.target.value));

// Tabs
const tabButtons = document.querySelectorAll('.physics-tab');
tabButtons.forEach(btn => btn.addEventListener('click', () => {
  tabButtons.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
  document.querySelectorAll('.lab-panel').forEach(p => { const active = p.id === `panel-${btn.dataset.tab}`; p.hidden = !active; p.classList.toggle('active', active); });
}));

// Phase C: calculator collection
const calcDefinitions = {
 speed:{label:['Distance (m)','Time (s)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'m/s',name:'Speed'},
 distance:{label:['Speed (m/s)','Time (s)'],run:v=>v[0]*v[1],unit:'m',name:'Distance'},
 time:{label:['Distance (m)','Speed (m/s)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'s',name:'Time'},
 force:{label:['Mass (kg)','Acceleration (m/s²)'],run:v=>v[0]*v[1],unit:'N',name:'Force'},
 acceleration:{label:['Resultant force (N)','Mass (kg)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'m/s²',name:'Acceleration'},
 weight:{label:['Mass (kg)','Gravity (m/s², usually 9.8)'],run:v=>v[0]*v[1],unit:'N',name:'Weight'},
 density:{label:['Mass (kg)','Volume (m³)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'kg/m³',name:'Density'},
 pressure:{label:['Force (N)','Area (m²)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'Pa',name:'Pressure'},
 work:{label:['Force (N)','Distance in force direction (m)'],run:v=>v[0]*v[1],unit:'J',name:'Work done'},
 power:{label:['Work / energy (J)','Time (s)'],run:v=>v[1]===0?null:v[0]/v[1],unit:'W',name:'Power'},
 kinetic:{label:['Mass (kg)','Speed (m/s)'],run:v=>0.5*v[0]*v[1]*v[1],unit:'J',name:'Kinetic energy'},
 potential:{label:['Mass (kg)','Height (m)','Gravity (m/s², usually 9.8)'],run:v=>v[0]*v[1]*v[2],unit:'J',name:'Gravitational potential energy'},
 momentum:{label:['Mass (kg)','Velocity (m/s; include direction with sign)'],run:v=>v[0]*v[1],unit:'kg·m/s',name:'Momentum'},
 ohm:{label:['Current (A)','Resistance (Ω)'],run:v=>v[0]*v[1],unit:'V',name:'Voltage'}
};
const calcType = document.getElementById('calc-type'), calcFields = document.getElementById('calc-fields'), calcResult = document.getElementById('calc-result');
function renderCalcFields(){calcFields.innerHTML='';calcDefinitions[calcType.value].label.forEach((label,i)=>{const wrap=document.createElement('div');wrap.className='calc-field';const lab=document.createElement('label');lab.htmlFor=`calc-${i}`;lab.textContent=label;const input=document.createElement('input');input.type='number';input.step='any';input.id=`calc-${i}`;input.placeholder='Enter a value';input.required=true;wrap.append(lab,input);calcFields.appendChild(wrap);});calcResult.textContent='Enter your values and select Calculate result.';}
calcType.addEventListener('change',renderCalcFields);renderCalcFields();
document.getElementById('calculate-btn').addEventListener('click',()=>{const def=calcDefinitions[calcType.value];const inputs=[...calcFields.querySelectorAll('input')];if(inputs.some(i=>i.value.trim()==='')){calcResult.textContent='Please enter every required value.';return;}const values=inputs.map(i=>Number(i.value));if(values.some(v=>!Number.isFinite(v))){calcResult.textContent='Please enter valid numbers.';return;}const result=def.run(values);if(result===null||!Number.isFinite(result)){calcResult.textContent='Cannot calculate this result: check that you have not divided by zero.';return;}calcResult.textContent=`${def.name} = ${Number(result.toPrecision(7)).toLocaleString()} ${def.unit}`;});

// Phase D: quiz
const quizQuestions = [
 {q:'What is the SI unit of force?',a:['Joule (J)','Newton (N)','Watt (W)','Pascal (Pa)'],correct:1,why:'Force is measured in newtons (N).'},
 {q:'Which formula gives average speed?',a:['Distance × time','Time ÷ distance','Distance ÷ time','Mass × acceleration'],correct:2,why:'Average speed = distance travelled ÷ time taken.'},
 {q:'A 2 kg object accelerates at 3 m/s². What is the resultant force?',a:['1.5 N','5 N','6 N','9 N'],correct:2,why:'F = ma = 2 × 3 = 6 N.'},
 {q:'What is the SI unit of energy?',a:['Joule (J)','Newton (N)','Ampere (A)','Metre (m)'],correct:0,why:'Energy is measured in joules (J).'},
 {q:'What does density equal?',a:['Volume ÷ mass','Mass ÷ volume','Mass × volume','Force ÷ area'],correct:1,why:'Density = mass ÷ volume.'},
 {q:'Which type of wave is sound in air?',a:['Electromagnetic','Mechanical','A vacuum wave','A light wave'],correct:1,why:'Sound needs a material medium, so it is a mechanical wave.'},
 {q:'What is the approximate gravitational acceleration near Earth’s surface?',a:['0.98 m/s²','3.0 m/s²','9.8 m/s²','98 m/s²'],correct:2,why:'The commonly used value is about 9.8 m/s².'},
 {q:'Which equation is Ohm’s law?',a:['V = IR','F = ma','p = mv','W = mg'],correct:0,why:'Ohm’s law states V = IR for an ohmic conductor under constant conditions.'},
 {q:'A wave has frequency 5 Hz and wavelength 2 m. What is its speed?',a:['2.5 m/s','7 m/s','10 m/s','20 m/s'],correct:2,why:'v = fλ = 5 × 2 = 10 m/s.'},
 {q:'What is the SI unit of power?',a:['Joule','Watt','Newton','Coulomb'],correct:1,why:'Power is measured in watts (W).'}
];
const quizContainer=document.getElementById('quiz-container'),quizResult=document.getElementById('quiz-result');
function renderQuiz(){quizContainer.innerHTML='';quizResult.textContent='';quizQuestions.forEach((q,i)=>{const card=document.createElement('div');card.className='quiz-question';const p=document.createElement('p');p.textContent=`${i+1}. ${q.q}`;card.appendChild(p);q.a.forEach((answer,j)=>{const label=document.createElement('label');label.className='quiz-option';const input=document.createElement('input');input.type='radio';input.name=`quiz-${i}`;input.value=String(j);label.append(input,document.createTextNode(answer));card.appendChild(label);});quizContainer.appendChild(card);});}
renderQuiz();
document.getElementById('check-quiz').addEventListener('click',()=>{let score=0;quizQuestions.forEach((q,i)=>{const selected=quizContainer.querySelector(`input[name="quiz-${i}"]:checked`);if(selected&&Number(selected.value)===q.correct)score++;});const percent=Math.round(score/quizQuestions.length*100);quizResult.textContent=`Your score: ${score}/${quizQuestions.length} (${percent}%). ${percent>=80?'Excellent work!':percent>=50?'Good effort — review the explanations and try again.':'Keep practising. Review the Physics Topic Library and Formula Library, then try again.'}`;quizResult.style.color=percent>=80?'#00ff9d':'#00d4ff';});
document.getElementById('reset-quiz').addEventListener('click',renderQuiz);
