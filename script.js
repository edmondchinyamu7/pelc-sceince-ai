/* ==========================================
   PELC SCIENCE AI
   Complete Updated JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. SPLASH SCREEN - 10 SECONDS
  // ==========================================

  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  if (splash && app) {
    setTimeout(() => {
      app.classList.remove("hidden");
      splash.classList.add("fade-out");

      setTimeout(() => {
        splash.style.display = "none";
      }, 800);

    }, 10000);
  }

  // ==========================================
  // 2. AI ASSISTANT ELEMENTS
  // ==========================================

  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  // ==========================================
  // 3. DISPLAY CHAT MESSAGES
  // ==========================================

  function addMessage(text, sender) {
    if (!chatLog) return;

    const message = document.createElement("div");
    message.className = `msg ${sender}`;
    message.textContent = text;

    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // ==========================================
  // 4. SCIENCE ASSISTANT RESPONSES
  // ==========================================

  function getBotReply(question) {
    const q = question.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|yo)\b/.test(q)) {
      return "Hello! 👋 Welcome to PELC Science AI. Ask me a science question about physics, chemistry, biology, or mathematics.";
    }

    // Photosynthesis
    if (q.includes("photosynthesis")) {
      return "🌱 Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and release oxygen. Chlorophyll helps capture the light energy.";
    }

    // Gravity
    if (q.includes("gravity")) {
      return "🌍 Gravity is the attractive force between objects with mass. Near Earth's surface, gravitational acceleration is approximately 9.81 m/s².";
    }

    // Atoms
    if (q.includes("atom") || q.includes("atomic structure")) {
      return "⚛️ An atom is made of a nucleus containing protons and usually neutrons, surrounded by electrons. The number of protons determines the chemical element.";
    }

    // DNA
    if (q.includes("dna")) {
      return "🧬 DNA stands for deoxyribonucleic acid. It carries genetic information used in the growth, development, functioning, and reproduction of living organisms.";
    }

    // Water
    if (q.includes("water") || q.includes("h2o")) {
      return "💧 Water has the chemical formula H₂O. Each molecule contains two hydrogen atoms and one oxygen atom.";
    }

    // Newton's laws
    if (q.includes("newton")) {
      return "📐 Newton's three laws describe motion:\n1. An object maintains its state of motion unless acted on by a net external force.\n2. The net force equals mass multiplied by acceleration: F = ma.\n3. Forces between interacting objects occur in equal and opposite pairs.";
    }

    // Force
    if (q.includes("force")) {
      return "💪 A force is a push or pull that can change an object's motion or shape. The SI unit of force is the newton (N). For a constant mass, F = ma.";
    }

    // Energy
    if (q.includes("energy")) {
      return "⚡ Energy is the capacity to do work or cause change. Common forms include kinetic, potential, chemical, thermal, and electrical energy. Energy is measured in joules (J).";
    }

    // Electricity
    if (q.includes("electricity") || q.includes("electric current")) {
      return "🔌 Electric current is the rate of flow of electric charge. It is measured in amperes (A). For a simple circuit, Ohm's law states V = IR.";
    }

    // Periodic table
    if (q.includes("periodic table") || q.includes("element")) {
      return "🧪 The periodic table organizes chemical elements by increasing atomic number. Elements in the same group often have similar chemical properties.";
    }

    // Acids and bases
    if (q.includes("acid") || q.includes("base") || q.includes("ph scale")) {
      return "🧪 The pH scale describes how acidic or basic an aqueous solution is. At about 25°C, pH 7 is neutral, values below 7 are acidic, and values above 7 are basic.";
    }

    // Cells
    if (q.includes("cell") || q.includes("organelles")) {
      return "🔬 Cells are the basic structural and functional units of living organisms. Many cells contain a membrane, cytoplasm, and genetic material. Plant cells also have a cell wall and usually chloroplasts.";
    }

    // Human body
    if (q.includes("human body") || q.includes("heart")) {
      return "🫀 The human body contains organ systems that work together. The heart pumps blood through the circulatory system, transporting oxygen and nutrients around the body.";
    }

    // Mathematics
    if (
      q.includes("mathematics") ||
      q.includes("maths") ||
      q.includes("algebra")
    ) {
      return "📐 Mathematics helps us solve problems using numbers, patterns, and logical reasoning. I can currently respond to selected science topics; broader mathematical solving will be added in a future version.";
    }

    // Speed formula
    if (q.includes("speed")) {
      return "🏎️ Speed is distance divided by time. Formula: speed = distance ÷ time. For example, travelling 100 metres in 20 seconds gives an average speed of 5 m/s.";
    }

    // Density
    if (q.includes("density")) {
      return "🧪 Density is mass per unit volume. Formula: density = mass ÷ volume. Its SI unit is kg/m³.";
    }

    // pH and chemistry are covered above.
    // Default response
    return "🔬 That's an interesting question! I'm currently a basic prototype with predefined answers, not a fully connected AI model. Try asking about photosynthesis, gravity, atoms, DNA, water, Newton's laws, force, energy, electricity, density, or the periodic table.";
  }

  // ==========================================
  // 5. SEND A QUESTION
  // ==========================================

  function handleSend() {
    if (!userInput || !chatLog) return;

    const question = userInput.value.trim();

    // Ignore empty messages
    if (!question) return;

    // Display the user's message
    addMessage(question, "user");

    // Clear input immediately
    userInput.value = "";
    userInput.focus();

    // Display assistant response
    setTimeout(() => {
      const reply = getBotReply(question);
      addMessage(reply, "bot");
    }, 500);
  }

  // ==========================================
  // 6. BUTTON AND ENTER-KEY SUPPORT
  // ==========================================

  if (sendBtn) {
    sendBtn.addEventListener("click", handleSend);
  }

  if (userInput) {
    userInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSend();
      }
    });
  }

  // ==========================================
  // 7. AUTOMATIC FOOTER YEAR
  // ==========================================

  const footer = document.querySelector("footer");

  if (footer) {
    const copyright = footer.querySelector("p");

    if (copyright && copyright.textContent.includes("©")) {
      copyright.textContent =
        copyright.textContent.replace(
          /©\s*\d{4}/,
          `© ${new Date().getFullYear()}`
        );
    }
  }

  // ==========================================
  // 8. SCIENCE TOOL CARD INTERACTIONS
  // ==========================================

  const toolCards = document.querySelectorAll(".tool-card");

  toolCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    function openTool() {
      const heading = card.querySelector("h3");
      const subject = heading
        ? heading.textContent.replace(/^[^\w]+/, "").trim()
        : "Science";

      if (userInput) {
        userInput.value =
          `Teach me about ${subject.toLowerCase()}.`;

        userInput.focus();

        document.getElementById("assistant")?.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        alert(`${subject} learning tools are coming soon!`);
      }
    }

    card.addEventListener("click", openTool);

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTool();
      }
    });
  });

  // ==========================================
  // 9. WELCOME MESSAGE IN CONSOLE
  // ==========================================

  console.log(
    "%cPELC SCIENCE AI",
    "color: #00d4ff; font-size: 22px; font-weight: bold;"
  );

  console.log(
    "Science learning starts here! 🚀"
  );

});
