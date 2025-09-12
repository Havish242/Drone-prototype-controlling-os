// script.js — DroneOS prototype interactions (static served by Django)
(() => {
  // Contact form submission to Django backend
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const payload = { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast('Message sent', 'success');
        contactForm.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        showToast('Send failed: ' + (err.error || res.statusText), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error — could not send', 'error');
    }
  });

  // Telemetry simulation
  let altitude = 0, speed = 0, battery = 100;
  const altEl = document.getElementById('altitude');
  const speedEl = document.getElementById('speed');
  const battEl = document.getElementById('battery');
  const gpsEl = document.getElementById('gps');
  const statusEl = document.getElementById('status');

  let flying = false;
  let telemetryInterval = null;

  function updateTelemetryUI(){
    if (altEl) altEl.textContent = Math.round(altitude);
    if (speedEl) speedEl.textContent = speed.toFixed(1);
    if (battEl) battEl.textContent = Math.round(battery);
    if (gpsEl) gpsEl.textContent = (Math.random()*180 - 90).toFixed(4)+','+(Math.random()*360-180).toFixed(4);
  }

  function startTelemetry(){
    if (telemetryInterval) return;
    telemetryInterval = setInterval(()=>{
      if (flying){
        altitude += Math.random()*1.5 + 0.5;
        speed = 5 + Math.random()*6;
        battery -= 0.2 + Math.random()*0.3;
        if (battery <= 10){
          // auto return
          statusEl.textContent = 'Returning (low battery)';
          flying = false;
        }
      } else {
        altitude = Math.max(0, altitude - (Math.random()*0.7 + 0.1));
        speed = Math.max(0, speed - (Math.random()*1));
      }
      updateTelemetryUI();
    }, 1000);
  }

  function stopTelemetry(){
    clearInterval(telemetryInterval); telemetryInterval = null;
  }

  // Controller buttons
  document.getElementById('takeoff')?.addEventListener('click', ()=>{
    if (battery < 15){ showToast('Battery too low for takeoff','error'); return; }
    flying = true; statusEl.textContent = 'Flying'; startTelemetry();
  });
  document.getElementById('land')?.addEventListener('click', ()=>{
    flying = false; statusEl.textContent = 'Landing';
  });
  document.getElementById('return')?.addEventListener('click', ()=>{
    flying = false; statusEl.textContent = 'Returning Home';
  });

  // Simulate battery drain even if not flying
  setInterval(()=>{
    battery = Math.max(0, battery - 0.01);
    updateTelemetryUI();
  }, 3000);

  // Start telemetry loop
  startTelemetry();

  // Start mission / video buttons
  document.querySelector('.start-mission')?.addEventListener('click', ()=>{
    showToast('Mission started (simulated)', 'info');
    statusEl.textContent = 'Mission running';
    flying = true;
  });
  document.querySelector('.start-video')?.addEventListener('click', ()=>{
    showToast('Starting simulated video feed', 'info');
  });

  // Toast helper
  function showToast(message, type='info', timeout=3500){
    const container = document.getElementById('toasts');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast ' + (type||'info');
    t.textContent = message;
    container.appendChild(t);
    setTimeout(()=>{ t.classList.add('fade'); t.remove(); }, timeout);
  }
})();
