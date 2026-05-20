document.addEventListener('DOMContentLoaded', () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // --- 1. INTERACTIVE TABS FOR "HOW IT WORKS" ---
  window.switchVisualTab = function(index) {
    document.querySelectorAll('.hiw-tab').forEach((tab, i) => {
      if (i + 1 === index) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    document.querySelectorAll('.hiw-vis-panel').forEach((panel, i) => {
      if (i + 1 === index) panel.classList.add('active');
      else panel.classList.remove('active');
    });
  };

  // --- 2. BATTLE OF THE CURSORS HERO ANIMATION ---
  const heroTextMain = document.getElementById('text-main');
  const heroCursor1 = document.getElementById('cursor-1');
  const heroTextFinale = document.getElementById('text-finale');
  const heroCursor2 = document.getElementById('cursor-2');

  async function runHeroAnimation() {
    if (!heroTextMain || !heroCursor1 || !heroTextFinale || !heroCursor2) return;

    while (true) {
      // Reset state
      heroTextMain.textContent = "";
      heroTextFinale.textContent = "";
      heroCursor1.classList.remove("hidden");
      heroCursor2.classList.add("hidden");
      heroCursor1.classList.remove("is-typing");
      heroCursor2.classList.remove("is-typing");

      await sleep(1000);

      // A. Type competitor 1 name: "Obsidian Sync"
      const competitor1 = "Obsidian Sync";
      heroCursor1.classList.add("is-typing");
      for (let char of competitor1) {
        heroTextMain.textContent += char;
        await sleep(70 + Math.random() * 50);
      }
      heroCursor1.classList.remove("is-typing");
      await sleep(1500);

      // Delete competitor 1 name
      heroCursor1.classList.add("is-typing");
      for (let i = 0; i < competitor1.length; i++) {
        heroTextMain.textContent = heroTextMain.textContent.slice(0, -1);
        await sleep(35);
      }
      heroCursor1.classList.remove("is-typing");
      await sleep(600);

      // B. Type competitor 2 name: "Google Docs"
      const competitor2 = "Google Docs";
      heroCursor1.classList.add("is-typing");
      for (let char of competitor2) {
        heroTextMain.textContent += char;
        await sleep(70 + Math.random() * 50);
      }
      heroCursor1.classList.remove("is-typing");
      await sleep(1500);

      // Delete competitor 2 name
      heroCursor1.classList.add("is-typing");
      for (let i = 0; i < competitor2.length; i++) {
        heroTextMain.textContent = heroTextMain.textContent.slice(0, -1);
        await sleep(35);
      }
      heroCursor1.classList.remove("is-typing");
      await sleep(600);

      // C. Type prefix "Collaborative "
      const prefix = "Collaborative ";
      heroCursor1.classList.add("is-typing");
      for (let char of prefix) {
        heroTextMain.textContent += char;
        await sleep(70 + Math.random() * 50);
      }
      heroCursor1.classList.remove("is-typing");
      await sleep(1000);

      // D. Simultaneous typing phase!
      heroCursor2.classList.remove("hidden");

      const wordLeft = "Real-Time Sync";
      const wordRight = " Directly Inside Obsidian";

      async function typeLeft() {
        heroCursor1.classList.add("is-typing");
        for (let char of wordLeft) {
          heroTextMain.textContent += char;
          await sleep(80 + Math.random() * 60);
        }
        heroCursor1.classList.remove("is-typing");
      }

      async function typeRight() {
        heroCursor2.classList.add("is-typing");
        for (let char of wordRight) {
          heroTextFinale.textContent += char;
          await sleep(95 + Math.random() * 70);
        }
        heroCursor2.classList.remove("is-typing");
      }

      // Run both simultaneously
      await Promise.all([typeLeft(), typeRight()]);

      await sleep(6000); // Admire the final output
    }
  }

  // --- 3. DYNAMIC OBSIDIAN EDITOR MOCKUP COLLABORATION ---
  const cAnna = document.getElementById('cursor-anna');
  const caretAnna = cAnna ? cAnna.querySelector('.cursor-caret') : null;
  const tAnna = document.getElementById('text-anna');
  
  const cPanos = document.getElementById('cursor-panos');
  const caretPanos = cPanos ? cPanos.querySelector('.cursor-caret') : null;
  const tPanos = document.getElementById('text-panos');
  
  const logsContainer = document.getElementById('logs-container');
  const startTime = Date.now();

  function addLog(msg, type = '') {
    if (!logsContainer) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const sec = String(elapsed % 60).padStart(2, '0');
    const timeStr = `[00:${min}:${sec}]`;

    const div = document.createElement('div');
    div.className = `log-line${type ? ' ' + type : ''}`;
    div.innerHTML = `<span>${timeStr}</span> ${msg}`;
    
    logsContainer.appendChild(div);
    
    while (logsContainer.children.length > 10) {
      logsContainer.removeChild(logsContainer.firstChild);
    }
    
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  function updatePos(cursor, prefixId, textId) {
    const prefixEl = document.getElementById(prefixId);
    const textEl = document.getElementById(textId);
    if (!cursor || !prefixEl || !textEl) return;
    const prefixW = prefixEl.getBoundingClientRect().width;
    const textW = textEl.getBoundingClientRect().width;
    cursor.style.transform = `translateX(${prefixW + textW}px)`;
  }

  async function runAnna() {
    if (!tAnna || !cAnna || !caretAnna) return;

    while (true) {
      tAnna.textContent = "";
      updatePos(cAnna, 'prefix-anna', 'text-anna');
      
      await sleep(1500);
      cAnna.style.opacity = '1';
      addLog("PEER: Anna joined active collaborative session", "anna");
      await sleep(800);
      
      addLog("PEER: Anna started typing at line 14...", "anna");
      const text1 = "Conflict-free merges";
      caretAnna.classList.add("is-typing");
      for (let char of text1) {
        tAnna.textContent += char;
        updatePos(cAnna, 'prefix-anna', 'text-anna');
        await sleep(60 + (Math.random() * 40));
      }
      caretAnna.classList.remove("is-typing");
      addLog("SYNC: Recv delta update (+20 chars) from Anna", "sync");
      
      await sleep(1200);
      
      addLog("PEER: Anna backspacing last word...", "anna");
      caretAnna.classList.add("is-typing");
      for (let i = 0; i < 6; i++) {
        tAnna.textContent = tAnna.textContent.slice(0, -1);
        updatePos(cAnna, 'prefix-anna', 'text-anna');
        await sleep(40);
      }
      caretAnna.classList.remove("is-typing");
      addLog("SYNC: Recv delta update (-6 chars) from Anna", "sync");
      
      await sleep(400);
      
      addLog("PEER: Anna typing correction...", "anna");
      const text2 = "offline architecture";
      caretAnna.classList.add("is-typing");
      for (let char of text2) {
        tAnna.textContent += char;
        updatePos(cAnna, 'prefix-anna', 'text-anna');
        await sleep(60 + (Math.random() * 40));
      }
      caretAnna.classList.remove("is-typing");
      addLog("SYNC: Recv delta update (+20 chars) from Anna", "sync");
      addLog("SYNC: State converged (0 conflicts)", "sync");
      
      await sleep(3500);
      cAnna.style.opacity = '0';
      addLog("PEER: Anna disconnected (session idle)", "anna");
      await sleep(2000);
    }
  }

  async function runPanos() {
    if (!tPanos || !cPanos || !caretPanos) return;

    while (true) {
      tPanos.textContent = "single click";
      tPanos.className = "";
      updatePos(cPanos, 'prefix-panos', 'text-panos');
      
      await sleep(3000);
      cPanos.style.opacity = '1';
      addLog("PEER: Panos joined active collaborative session", "panos");
      await sleep(1000);
      
      addLog("PEER: Panos selected range [118-130] \"single click\"", "panos");
      tPanos.className = "select-span cyan";
      await sleep(800);
      
      tPanos.className = "";
      tPanos.textContent = "";
      updatePos(cPanos, 'prefix-panos', 'text-panos');
      addLog("SYNC: Recv delta update (-12 chars) from Panos", "sync");
      await sleep(500);
      
      addLog("PEER: Panos replacing selected text...", "panos");
      const newText = "simple toggle";
      caretPanos.classList.add("is-typing");
      for (let char of newText) {
        tPanos.textContent += char;
        updatePos(cPanos, 'prefix-panos', 'text-panos');
        await sleep(70 + (Math.random() * 50));
      }
      caretPanos.classList.remove("is-typing");
      addLog("SYNC: Recv delta update (+13 chars) from Panos", "sync");
      addLog("SYNC: State converged (0 conflicts)", "sync");
      
      await sleep(4000);
      cPanos.style.opacity = '0';
      addLog("PEER: Panos disconnected (session idle)", "panos");
      await sleep(3000);
    }
  }

  // --- 4. START ALL ANIMATION LOOPS ---
  runHeroAnimation();
  runAnna();
  runPanos();
});
