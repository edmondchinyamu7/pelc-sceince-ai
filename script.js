(() => {
  "use strict";

  // The splash lasts 10 seconds. The page remains usable if JavaScript is delayed.
  const splash = document.getElementById("splash-screen");
  window.addEventListener("load", () => {
    window.setTimeout(() => splash?.classList.add("hide"), 10000);
  });

  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  menuToggle?.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
    menuToggle.textContent = opened ? "✕" : "☰";
  });
  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open navigation"); }
  }));

  // Demo science assistant. This is not a live AI connection.
  const responseBank = [
    { keys:["newton","second law","force"], answer:"Newton's second law states that the resultant force on an object equals its mass multiplied by its acceleration.\n\nFormula: F = ma\nF is force in newtons (N), m is mass in kilograms (kg), and a is acceleration in metres per second squared (m/s²).\n\nExample: a 2 kg object accelerating at 3 m/s² has a resultant force of 2 × 3 = 6 N." },
    { keys:["ohm","voltage","resistance","current"], answer:"Ohm's law describes the relationship between voltage, current and resistance for an ohmic conductor when physical conditions are constant.\n\nFormula: V = IR\nV = voltage (volts), I = current (amperes), R = resistance (ohms).\n\nExample: 2 A through a 5 Ω resistor gives V = 2 × 5 = 10 V." },
    { keys:["photosynthesis","plant"], answer:"Photosynthesis is the process by which green plants use light energy to make glucose from carbon dioxide and water. Oxygen is released as a by-product.\n\nWord equation: carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll)." },
    { keys:["speed","velocity","motion"], answer:"Speed tells us how much distance is travelled per unit time. Average speed = total distance ÷ total time. Its SI unit is metres per second (m/s).\n\nVelocity is speed in a specified direction, so velocity includes direction but speed does not." },
    { keys:["energy","kinetic"], answer:"Energy is the ability to do work. Kinetic energy is energy due to motion: KE = ½mv², where m is mass in kilograms and v is speed in metres per second. The SI unit of energy is the joule (J)." },
    { keys:["atom","chemistry"], answer:"An atom is a basic unit of a chemical element. It has a nucleus containing protons and usually neutrons, with electrons occupying regions around the nucleus. The number of protons identifies the element." },
    { keys:["gravity","gravitational"], answer:"Gravity is an attractive interaction between masses. Near Earth's surface, objects in free fall accelerate at approximately 9.8 m/s² when air resistance is small. Weight is the gravitational force on an object: W = mg." },
    { keys:["wave","frequency","wavelength"], answer:"A wave transfers energy from place to place without a net transfer of matter. Wave speed = frequency × wavelength (v = fλ). Frequency is measured in hertz (Hz) and wavelength in metres (m)." },
    { keys:["biology","cell"], answer:"A cell is the basic structural and functional unit of life. Many cells contain a cell membrane, cytoplasm and genetic material. Plant cells also have structures such as a cell wall, and typically chloroplasts and a large central vacuole." },
    { keys:["math","algebra"], answer:"A useful problem-solving habit is to write down what is known, choose the correct formula, rearrange it if needed, substitute values with units, and check whether the final answer makes sense." }
  ];
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  function addMessage(text, type, heading = "") {
    const message = document.createElement("div");
    message.className = `chat-message ${type === "user" ? "user-message" : "bot-message"}`;
    const icon = document.createElement("span"); icon.className = "message-icon"; icon.textContent = type === "user" ? "You" : "✦";
    const content = document.createElement("div");
    if (heading) { const strong = document.createElement("strong"); strong.textContent = heading; content.appendChild(strong); }
    const p = document.createElement("p"); p.textContent = text; content.appendChild(p);
    message.append(icon, content); chatWindow.appendChild(message); chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  function answerQuestion(question) {
    const normalized = question.toLowerCase();
    const match = responseBank.find(item => item.keys.some(key => normalized.includes(key)));
    return match ? match.answer : "I can help with a few built-in science examples in this demo, but I don't have a live AI connection yet. Try asking about Newton's second law, speed, Ohm's law, waves, energy, atoms or photosynthesis. A future Node.js backend can connect this assistant to a real AI model.";
  }
  function askAssistant(question) {
    const clean = question.trim(); if (!clean) return;
    addMessage(clean, "user");
    addMessage(answerQuestion(clean), "bot", "PELC Science Assistant");
  }
  chatForm?.addEventListener("submit", event => {
    event.preventDefault(); askAssistant(chatInput.value); chatInput.value = ""; chatInput.focus();
  });
  document.querySelectorAll(".suggestion-chip").forEach(button => button.addEventListener("click", () => askAssistant(button.dataset.question || button.textContent)));

  // PHASE A: topic library
  const topics = [
    {id:"motion",name:"Mechanics & Motion",definition:"Mechanics studies how objects move and how forces affect their motion.",sections:[["Key ideas",["Distance is the total path travelled; displacement is the change in position in a direction.","Speed is distance per time. Velocity is displacement per time and includes direction.","Acceleration is the rate of change of velocity.","A resultant force can change an object's speed, direction or shape."]],["Newton's laws",["First law: an object stays at rest or moves at constant velocity unless acted on by a non-zero resultant force.","Second law: resultant force equals mass multiplied by acceleration (F = ma).","Third law: interacting objects exert equal and opposite forces on each other."]]],fact:"SI units: distance (m), time (s), speed (m/s), acceleration (m/s²), force (N), mass (kg)."},
    {id:"energy",name:"Work, Energy & Power",definition:"Energy is the ability to do work. Work is done when a force moves an object through a distance in the force's direction.",sections:[["Key ideas",["Work done = force × distance along the force direction.","Kinetic energy is energy due to motion: KE = ½mv².","Near Earth's surface, gravitational potential energy change = mgh.","Power is the rate of doing work or transferring energy: P = W/t.","Energy can be transferred between stores; the total energy is conserved."]],["Everyday examples",["A raised book has gravitational potential energy.","A moving bicycle has kinetic energy.","A powerful machine transfers energy faster than a less powerful one doing the same work."]]],fact:"SI units: work and energy (joule, J), power (watt, W)."},
    {id:"electricity",name:"Electricity & Magnetism",definition:"Electric circuits use moving electric charges to transfer energy. Magnetism is associated with magnets and electric currents.",sections:[["Key ideas",["Current is the rate of flow of electric charge: I = Q/t.","Voltage is energy transferred per unit charge.","Resistance describes how strongly a component opposes current.","Ohm's law: V = IR, when physical conditions such as temperature are constant.","A series circuit has one path; a parallel circuit has branches."]],["Circuit safety",["Use correctly rated components and follow teacher instructions.","Never experiment with household mains electricity.","A fuse or circuit breaker helps protect a circuit from excessive current."]]],fact:"SI units: current (A), voltage (V), resistance (Ω), charge (C), power (W)."},
    {id:"waves",name:"Waves, Sound & Light",definition:"Waves transfer energy from one place to another. Mechanical waves need a medium, while electromagnetic waves can travel through a vacuum.",sections:[["Key ideas",["Amplitude measures the maximum displacement from equilibrium.","Frequency is the number of complete cycles each second.","Wavelength is the distance between corresponding points on adjacent waves.","Wave speed = frequency × wavelength (v = fλ).","Reflection is bouncing; refraction is a change in direction caused by a change in wave speed."]],["Sound and light",["Sound is a mechanical wave and cannot travel through a vacuum.","Light is an electromagnetic wave and can travel through a vacuum.","A prism can separate white light into a spectrum of colours."]]],fact:"SI units: frequency (Hz), wavelength (m), wave speed (m/s)."},
    {id:"heat",name:"Heat & Temperature",definition:"Temperature relates to how hot or cold something is. Heat is energy transferred because of a temperature difference.",sections:[["Key ideas",["Conduction transfers thermal energy through particle interactions, especially in solids.","Convection occurs when moving fluids transfer thermal energy.","Thermal radiation transfers energy by electromagnetic waves and needs no medium.","Heating can raise temperature or change a substance's state.","During a pure substance's phase change, its temperature may remain constant while energy changes particle arrangement."]],["Everyday examples",["A metal spoon warms in hot tea by conduction.","Warm air rises in a room due to convection.","Sunlight warms Earth by radiation."]]],fact:"Temperature is commonly measured in °C; the SI unit is kelvin (K). Energy is measured in joules (J)."},
    {id:"matter",name:"Matter, Density & Pressure",definition:"Matter has mass and occupies space. Density compares mass with volume, while pressure measures force acting per unit area.",sections:[["Key ideas",["Density = mass ÷ volume (ρ = m/V).","Pressure = force ÷ area (P = F/A).","For the same force, a smaller contact area produces greater pressure.","In a fluid at rest, pressure generally increases with depth.","An object may float when the upthrust balances its weight."]],["Applications",["A sharp blade cuts more easily because its edge applies force over a small area.","A wide snowshoe reduces pressure on snow.","Buoyancy explains why many objects float in water."]]],fact:"SI units: density (kg/m³), pressure (pascal, Pa), force (N), area (m²)."},
    {id:"momentum",name:"Momentum & Collisions",definition:"Momentum describes the motion carried by an object and depends on its mass and velocity.",sections:[["Key ideas",["Momentum = mass × velocity (p = mv).","Momentum is a vector, so its direction matters.","In an isolated system, total momentum is conserved.","Impulse equals the change in momentum and can be expressed as force × time when force is constant."]],["Applications",["Seat belts and other safety features increase the time over which a person slows down, reducing average force for a given momentum change.","Collisions can transfer momentum between objects."]]],fact:"SI unit of momentum: kg·m/s. Always account for direction when solving momentum problems."},
    {id:"space",name:"Space & Gravity",definition:"Gravity is an attractive interaction between masses. Astronomy uses physics to understand planets, stars and the wider universe.",sections:[["Key ideas",["Mass measures the amount of matter and is measured in kilograms.","Weight is gravitational force: W = mg.","An object's mass stays approximately the same when moved, but its weight can change with gravitational field strength.","Planets orbit stars due to gravity and their motion."]],["Explore further",["The Moon reflects sunlight; it does not produce its own visible light.","The Solar System contains the Sun, planets and many smaller bodies."]]],fact:"Weight is measured in newtons (N); gravitational field strength near Earth's surface is approximately 9.8 N/kg."}
  ];
  const topicList = document.getElementById("topic-list");
  const topicDetail = document.getElementById("topic-detail");
  function renderTopic(topic) {
    topicList.querySelectorAll("button").forEach(button => button.classList.toggle("active", button.dataset.topic === topic.id));
    topicDetail.replaceChildren();
    const title = document.createElement("h4"); title.textContent = topic.name;
    const definition = document.createElement("p"); definition.className = "topic-definition"; definition.textContent = topic.definition;
    topicDetail.append(title, definition);
    topic.sections.forEach(([heading, points]) => {
      const h = document.createElement("h5"); h.textContent = heading; topicDetail.appendChild(h);
      const ul = document.createElement("ul");
      points.forEach(point => { const li = document.createElement("li"); li.textContent = point; ul.appendChild(li); });
      topicDetail.appendChild(ul);
    });
    const fact = document.createElement("div"); fact.className = "fact-strip"; fact.textContent = topic.fact; topicDetail.appendChild(fact);
  }
  topics.forEach((topic, index) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "topic-button";
    button.dataset.topic = topic.id; button.textContent = `${String(index + 1).padStart(2,"0")}  ${topic.name}`;
    button.addEventListener("click", () => renderTopic(topic)); topicList.appendChild(button);
  });
  renderTopic(topics[0]);

  // PHASE B: formula library
  const formulas = [
    {category:"Motion",name:"Average speed",equation:"speed = distance ÷ time",symbols:"s = d/t · s: speed, d: distance, t: time",units:"m/s · m · s",example:"A journey of 100 m in 20 s has speed 100 ÷ 20 = 5 m/s."},
    {category:"Motion",name:"Acceleration",equation:"a = (v − u) ÷ t",symbols:"a: acceleration, v: final velocity, u: initial velocity, t: time",units:"m/s² · m/s · s",example:"Velocity changes from 2 to 10 m/s in 4 s: a = (10 − 2) ÷ 4 = 2 m/s²."},
    {category:"Motion",name:"Newton's second law",equation:"F = ma",symbols:"F: resultant force, m: mass, a: acceleration",units:"N · kg · m/s²",example:"A 3 kg object accelerates at 2 m/s²: F = 3 × 2 = 6 N."},
    {category:"Motion",name:"Momentum",equation:"p = mv",symbols:"p: momentum, m: mass, v: velocity",units:"kg·m/s · kg · m/s",example:"A 2 kg ball moving at 4 m/s has momentum 8 kg·m/s."},
    {category:"Energy",name:"Work done",equation:"W = Fd",symbols:"W: work, F: force, d: distance in direction of force",units:"J · N · m",example:"A 10 N force moves an object 3 m in its direction: W = 30 J."},
    {category:"Energy",name:"Power",equation:"P = W ÷ t",symbols:"P: power, W: work/energy transferred, t: time",units:"W · J · s",example:"600 J transferred in 10 s gives P = 60 W."},
    {category:"Energy",name:"Kinetic energy",equation:"KE = ½mv²",symbols:"KE: kinetic energy, m: mass, v: speed",units:"J · kg · m/s",example:"A 2 kg object moving at 3 m/s has KE = 0.5 × 2 × 3² = 9 J."},
    {category:"Energy",name:"Gravitational potential energy",equation:"GPE = mgh",symbols:"m: mass, g: gravitational field strength, h: height change",units:"J · kg · N/kg · m",example:"A 2 kg object raised 3 m where g = 9.8 N/kg gains 58.8 J."},
    {category:"Electricity",name:"Ohm's law",equation:"V = IR",symbols:"V: voltage, I: current, R: resistance",units:"V · A · Ω",example:"A 2 A current through 5 Ω gives V = 10 V."},
    {category:"Electricity",name:"Electrical power",equation:"P = VI",symbols:"P: power, V: voltage, I: current",units:"W · V · A",example:"A device using 3 A at 12 V has power 36 W."},
    {category:"Waves & Matter",name:"Wave speed",equation:"v = fλ",symbols:"v: wave speed, f: frequency, λ: wavelength",units:"m/s · Hz · m",example:"A 5 Hz wave with 2 m wavelength travels at 10 m/s."},
    {category:"Waves & Matter",name:"Density",equation:"ρ = m ÷ V",symbols:"ρ: density, m: mass, V: volume",units:"kg/m³ · kg · m³",example:"A 6 kg object with volume 2 m³ has density 3 kg/m³."},
    {category:"Waves & Matter",name:"Pressure",equation:"P = F ÷ A",symbols:"P: pressure, F: perpendicular force, A: area",units:"Pa · N · m²",example:"A 20 N force on 4 m² gives pressure 5 Pa."},
    {category:"Waves & Matter",name:"Charge and current",equation:"Q = It",symbols:"Q: charge, I: current, t: time",units:"C · A · s",example:"A 2 A current flowing for 5 s transfers 10 C."}
  ];
  const formulaGrid = document.getElementById("formula-grid");
  const formulaFilters = document.getElementById("formula-filters");
  const categories = ["All", ...new Set(formulas.map(formula => formula.category))];
  let currentFormulaCategory = "All";
  function renderFormulas() {
    formulaGrid.replaceChildren();
    formulas.filter(item => currentFormulaCategory === "All" || item.category === currentFormulaCategory).forEach(item => {
      const card = document.createElement("article"); card.className = "formula-card";
      const title = document.createElement("h4"); title.textContent = item.name;
      const equation = document.createElement("div"); equation.className = "formula-equation"; equation.textContent = item.equation;
      const symbols = document.createElement("p"); symbols.textContent = item.symbols;
      const units = document.createElement("p"); units.textContent = `Units: ${item.units}`;
      const example = document.createElement("p"); example.className = "example"; example.textContent = `Example: ${item.example}`;
      card.append(title, equation, symbols, units, example); formulaGrid.appendChild(card);
    });
  }
  categories.forEach(category => {
    const button = document.createElement("button"); button.type = "button"; button.className = `filter-button${category === "All" ? " active" : ""}`; button.textContent = category;
    button.addEventListener("click", () => {
      currentFormulaCategory = category;
      formulaFilters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
      renderFormulas();
    });
    formulaFilters.appendChild(button);
  });
  renderFormulas();

  // PHASE C: calculators. Each calculation includes the correct formula and SI output unit.
  const calculatorDefinitions = {
    speed:{title:"Average speed = distance ÷ time",fields:[["distance","Distance","m"],["time","Time","s"]],unit:"m/s",calc:v=>v.distance/v.time,steps:v=>`speed = ${v.distance} m ÷ ${v.time} s`},
    distance:{title:"Distance = speed × time",fields:[["speed","Speed","m/s"],["time","Time","s"]],unit:"m",calc:v=>v.speed*v.time,steps:v=>`distance = ${v.speed} m/s × ${v.time} s`},
    time:{title:"Time = distance ÷ speed",fields:[["distance","Distance","m"],["speed","Speed","m/s"]],unit:"s",calc:v=>v.distance/v.speed,steps:v=>`time = ${v.distance} m ÷ ${v.speed} m/s`},
    acceleration:{title:"Acceleration = (final velocity − initial velocity) ÷ time",fields:[["finalVelocity","Final velocity","m/s"],["initialVelocity","Initial velocity","m/s"],["time","Time","s"]],unit:"m/s²",calc:v=>(v.finalVelocity-v.initialVelocity)/v.time,steps:v=>`a = (${v.finalVelocity} − ${v.initialVelocity}) ÷ ${v.time}`},
    force:{title:"Resultant force = mass × acceleration",fields:[["mass","Mass","kg"],["acceleration","Acceleration","m/s²"]],unit:"N",calc:v=>v.mass*v.acceleration,steps:v=>`F = ${v.mass} kg × ${v.acceleration} m/s²`},
    mass:{title:"Mass = force ÷ acceleration",fields:[["force","Resultant force","N"],["acceleration","Acceleration","m/s²"]],unit:"kg",calc:v=>v.force/v.acceleration,steps:v=>`m = ${v.force} N ÷ ${v.acceleration} m/s²`},
    work:{title:"Work done = force × distance",fields:[["force","Force","N"],["distance","Distance","m"]],unit:"J",calc:v=>v.force*v.distance,steps:v=>`W = ${v.force} N × ${v.distance} m`},
    power:{title:"Power = work done ÷ time",fields:[["work","Work done","J"],["time","Time","s"]],unit:"W",calc:v=>v.work/v.time,steps:v=>`P = ${v.work} J ÷ ${v.time} s`},
    kinetic:{title:"Kinetic energy = ½ × mass × speed²",fields:[["mass","Mass","kg"],["speed","Speed","m/s"]],unit:"J",calc:v=>0.5*v.mass*v.speed**2,steps:v=>`KE = ½ × ${v.mass} × ${v.speed}²`},
    potential:{title:"Gravitational potential energy = mass × g × height",fields:[["mass","Mass","kg"],["g","Gravitational field strength","N/kg (use 9.8 on Earth)"],["height","Height change","m"]],unit:"J",calc:v=>v.mass*v.g*v.height,steps:v=>`GPE = ${v.mass} × ${v.g} × ${v.height}`},
    ohm:{title:"Voltage = current × resistance",fields:[["current","Current","A"],["resistance","Resistance","Ω"]],unit:"V",calc:v=>v.current*v.resistance,steps:v=>`V = ${v.current} A × ${v.resistance} Ω`},
    current:{title:"Current = voltage ÷ resistance",fields:[["voltage","Voltage","V"],["resistance","Resistance","Ω"]],unit:"A",calc:v=>v.voltage/v.resistance,steps:v=>`I = ${v.voltage} V ÷ ${v.resistance} Ω`},
    resistance:{title:"Resistance = voltage ÷ current",fields:[["voltage","Voltage","V"],["current","Current","A"]],unit:"Ω",calc:v=>v.voltage/v.current,steps:v=>`R = ${v.voltage} V ÷ ${v.current} A`},
    electricPower:{title:"Electrical power = voltage × current",fields:[["voltage","Voltage","V"],["current","Current","A"]],unit:"W",calc:v=>v.voltage*v.current,steps:v=>`P = ${v.voltage} V × ${v.current} A`},
    wave:{title:"Wave speed = frequency × wavelength",fields:[["frequency","Frequency","Hz"],["wavelength","Wavelength","m"]],unit:"m/s",calc:v=>v.frequency*v.wavelength,steps:v=>`v = ${v.frequency} Hz × ${v.wavelength} m`},
    density:{title:"Density = mass ÷ volume",fields:[["mass","Mass","kg"],["volume","Volume","m³"]],unit:"kg/m³",calc:v=>v.mass/v.volume,steps:v=>`ρ = ${v.mass} kg ÷ ${v.volume} m³`},
    pressure:{title:"Pressure = force ÷ area",fields:[["force","Force perpendicular to surface","N"],["area","Area","m²"]],unit:"Pa",calc:v=>v.force/v.area,steps:v=>`P = ${v.force} N ÷ ${v.area} m²`}
  };
  const calculatorSelect = document.getElementById("calculator-select");
  const calculatorFields = document.getElementById("calculator-fields");
  const calculatorDescription = document.getElementById("calculator-description");
  const calculatorResult = document.getElementById("calculator-result");
  function renderCalculatorFields() {
    const definition = calculatorDefinitions[calculatorSelect.value];
    calculatorFields.replaceChildren(); calculatorDescription.textContent = definition.title;
    definition.fields.forEach(([key,label,unit]) => {
      const group = document.createElement("div"); group.className = "field-group";
      const fieldLabel = document.createElement("label"); fieldLabel.htmlFor = `calc-${key}`; fieldLabel.textContent = `${label} (${unit})`;
      const input = document.createElement("input"); input.id = `calc-${key}`; input.name = key; input.type = "number"; input.step = "any"; input.min = "0"; input.required = true; input.placeholder = "Enter value";
      group.append(fieldLabel, input); calculatorFields.appendChild(group);
    });
    calculatorResult.innerHTML = "<h3>Ready when you are</h3><p>Enter your known values and select Calculate answer to see the solution.</p>";
  }
  calculatorSelect.addEventListener("change", renderCalculatorFields);
  document.getElementById("physics-calculator-form").addEventListener("submit", event => {
    event.preventDefault();
    const definition = calculatorDefinitions[calculatorSelect.value];
    const values = {};
    for (const [key,label] of definition.fields) {
      const input = document.getElementById(`calc-${key}`);
      if (!input || input.value.trim() === "" || !Number.isFinite(Number(input.value)) || Number(input.value) < 0) {
        calculatorResult.innerHTML = `<h3>Check your values</h3><p>Please enter a valid non-negative number for ${label.toLowerCase()}.</p>`; return;
      }
      values[key] = Number(input.value);
    }
    const denominatorKeys = {speed:["time"],time:["speed"],mass:["acceleration"],power:["time"],current:["resistance"],resistance:["current"],density:["volume"],pressure:["area"]};
    const zeros = denominatorKeys[calculatorSelect.value] || [];
    if (zeros.some(key => values[key] === 0)) {
      calculatorResult.innerHTML = "<h3>Cannot divide by zero</h3><p>Enter a value greater than zero for the quantity used as the divisor.</p>"; return;
    }
    const answer = definition.calc(values);
    if (!Number.isFinite(answer)) { calculatorResult.innerHTML = "<h3>Unable to calculate</h3><p>Check the values and try again.</p>"; return; }
    const formatted = Number(answer.toPrecision(8)).toLocaleString(undefined,{maximumFractionDigits:6});
    calculatorResult.replaceChildren();
    const heading = document.createElement("h3"); heading.textContent = "Calculated answer";
    const value = document.createElement("div"); value.className = "answer-value"; value.textContent = `${formatted} ${definition.unit}`;
    const formula = document.createElement("p"); formula.className = "solution-line"; formula.textContent = `Formula: ${definition.title}`;
    const steps = document.createElement("p"); steps.className = "solution-line"; steps.textContent = `Substitution: ${definition.steps(values)}`;
    calculatorResult.append(heading, value, formula, steps);
  });
  document.getElementById("calculator-reset").addEventListener("click", () => {
    window.setTimeout(() => { calculatorResult.innerHTML = "<h3>Ready when you are</h3><p>Enter your known values and select Calculate answer to see the formula and result.</p>"; }, 0);
  });
  renderCalculatorFields();

  // PHASE D: 10-question quiz, instant feedback, score and retry.
  const quizQuestions = [
    {topic:"Motion",q:"What is the SI unit of speed?",options:["Kilogram (kg)","Metre per second (m/s)","Newton (N)","Joule (J)"],correct:1,why:"Speed is distance divided by time, so its SI unit is metres per second (m/s)."},
    {topic:"Motion",q:"A 4 kg object accelerates at 3 m/s². What is the resultant force?",options:["1.33 N","7 N","12 N","24 N"],correct:2,why:"Newton's second law gives F = ma = 4 × 3 = 12 N."},
    {topic:"Energy",q:"Which type of energy does a moving object have because of its motion?",options:["Kinetic energy","Chemical energy","Gravitational potential energy only","Nuclear energy"],correct:0,why:"Kinetic energy is the energy an object has because it is moving."},
    {topic:"Electricity",q:"A 2 A current flows through a 6 Ω resistor. What is the voltage?",options:["3 V","8 V","12 V","24 V"],correct:2,why:"Using V = IR: voltage = 2 A × 6 Ω = 12 V."},
    {topic:"Waves",q:"A wave has frequency 4 Hz and wavelength 3 m. What is its speed?",options:["1.33 m/s","7 m/s","12 m/s","24 m/s"],correct:2,why:"Wave speed v = fλ = 4 × 3 = 12 m/s."},
    {topic:"Matter",q:"A mass of 10 kg occupies 2 m³. What is its density?",options:["5 kg/m³","12 kg/m³","20 kg/m³","0.2 kg/m³"],correct:0,why:"Density = mass ÷ volume = 10 ÷ 2 = 5 kg/m³."},
    {topic:"Heat",q:"Which method of heat transfer can occur through a vacuum?",options:["Conduction","Convection","Radiation","All three equally"],correct:2,why:"Thermal radiation travels as electromagnetic waves and does not need a material medium."},
    {topic:"Motion",q:"What does acceleration describe?",options:["Distance only","Change in velocity per unit time","Mass per unit volume","Force per unit area"],correct:1,why:"Acceleration is the rate at which velocity changes with time."},
    {topic:"Electricity",q:"What is the SI unit of electrical resistance?",options:["Ampere","Volt","Ohm","Watt"],correct:2,why:"Electrical resistance is measured in ohms, symbol Ω."},
    {topic:"Forces",q:"Which statement best describes Newton's third law?",options:["Force equals mass divided by time","Every action force has an equal and opposite reaction force on another object","Energy is always destroyed by friction","Objects must always be moving"],correct:1,why:"Forces between two interacting objects are equal in magnitude and opposite in direction, acting on different objects."}
  ];
  const quizTopic = document.getElementById("quiz-topic"), quizProgress = document.getElementById("quiz-progress");
  const quizProgressBar = document.getElementById("quiz-progress-bar"), quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options"), quizFeedback = document.getElementById("quiz-feedback");
  const quizScore = document.getElementById("quiz-score"), quizNext = document.getElementById("quiz-next");
  let quizIndex = 0, score = 0, answered = false, quizFinished = false;
  function renderQuiz() {
    const item = quizQuestions[quizIndex]; answered = false; quizFinished = false;
    quizTopic.textContent = item.topic.toUpperCase(); quizProgress.textContent = `Question ${quizIndex+1} of ${quizQuestions.length}`;
    quizProgressBar.style.width = `${(quizIndex+1)/quizQuestions.length*100}%`;
    quizQuestion.textContent = item.q; quizOptions.replaceChildren(); quizFeedback.textContent = ""; quizFeedback.className = "quiz-feedback";
    quizScore.textContent = `Score: ${score}`; quizNext.disabled = true; quizNext.textContent = quizIndex === quizQuestions.length-1 ? "See results →" : "Next question →";
    item.options.forEach((option,index) => {
      const button = document.createElement("button"); button.type = "button"; button.className = "quiz-option";
      const letter = document.createElement("span"); letter.className = "option-letter"; letter.textContent = String.fromCharCode(65+index);
      const label = document.createElement("span"); label.textContent = option; button.append(letter,label);
      button.addEventListener("click", () => selectQuizAnswer(index)); quizOptions.appendChild(button);
    });
  }
  function selectQuizAnswer(selected) {
    if (answered || quizFinished) return;
    answered = true; const item = quizQuestions[quizIndex]; const buttons = [...quizOptions.querySelectorAll("button")];
    buttons.forEach((button,index) => { button.disabled = true; if (index === item.correct) button.classList.add("correct"); if (index === selected && index !== item.correct) button.classList.add("incorrect"); });
    const isCorrect = selected === item.correct; if (isCorrect) score++;
    quizFeedback.textContent = `${isCorrect ? "Correct! " : "Not quite. "}${item.why}`;
    quizFeedback.className = `quiz-feedback ${isCorrect ? "correct-text" : "incorrect-text"}`;
    quizScore.textContent = `Score: ${score}`; quizNext.disabled = false;
  }
  quizNext.addEventListener("click", () => {
    if (!answered && !quizFinished) return;
    if (quizIndex < quizQuestions.length-1 && !quizFinished) { quizIndex++; renderQuiz(); return; }
    if (!quizFinished) {
      quizFinished = true; quizQuestion.textContent = `Quiz complete: ${score} out of ${quizQuestions.length}`;
      quizOptions.replaceChildren();
      const percentage = Math.round(score/quizQuestions.length*100);
      const result = document.createElement("p"); result.textContent = percentage >= 80 ? "Excellent work! You have a strong grasp of these topics." : percentage >= 50 ? "Good effort! Review the explanations and try again to improve." : "Keep practising! Review the Physics Topic Library and Formula Library, then retry.";
      quizOptions.appendChild(result); quizFeedback.textContent = `Final score: ${percentage}%`; quizFeedback.className = "quiz-feedback";
      quizNext.disabled = false; quizNext.textContent = "Try again ↻"; quizProgress.textContent = "Quiz complete"; quizProgressBar.style.width = "100%";
    } else { quizIndex = 0; score = 0; renderQuiz(); }
  });
  renderQuiz();

  // Switch between the four Physics Lab panels.
  const tabs = [...document.querySelectorAll(".physics-tab")];
  const panels = {
    notes:document.getElementById("panel-notes"), formulas:document.getElementById("panel-formulas"),
    calculator:document.getElementById("panel-calculator"), quiz:document.getElementById("panel-quiz")
  };
  tabs.forEach(tab => tab.addEventListener("click", () => {
    const selected = tab.dataset.tab;
    tabs.forEach(item => { const active = item === tab; item.classList.toggle("active",active); item.setAttribute("aria-selected",String(active)); });
    Object.entries(panels).forEach(([key,panel]) => { const active = key === selected; panel.hidden = !active; panel.classList.toggle("active",active); });
  }));
})();
