# Drone Software Prototype Website (DroneOS style)
This prototype provides a DroneOS-like web interface that combines a dashboard, mission library, live video placeholder, telemetry, and a right-side controller panel for quick drone actions.

New UI highlights
- Left sidebar for navigation (Dashboard, Flights, Missions, Drones, Logs, Settings)
- Right-side Controller panel with Takeoff, Land, and Return Home buttons
- Simulated telemetry: altitude, speed, battery, GPS shown live

How to try the controller (local Django server)
1. Start the Django dev server 
2. Open http://127.0.0.1:8000/
3. Use the Controller panel: Takeoff, Land, Return Home. Telemetry will update automatically.
4. Click "Start Mission" to simulate a mission.

Notes:
- Contact form still posts to `/api/contact` (Django endpoint) and will echo back submitted data.

## How to use

- The static prototype is at `index.html` and can be opened directly in a browser for quick viewing.
- A minimal Django backend serves `index.html` and provides a POST endpoint at `/api/contact` to receive the contact form data.

## Files of interest
- `index.html`: Main landing page (served by Django in prototype)
- `style.css`: Styles for the website
- `script.js`: JS that POSTs the form to `/api/contact`
- `manage.py`, `drone_site/`, `contact_app/`: Django backend files
- `requirements.txt`: Python dependencies
- `package.json`: (optional) previously added Node info — not required for Django

## Run the Django backend (Windows PowerShell)

1. Create and activate a virtual environment (recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install Python dependencies:

```powershell
python -m pip install -r requirements.txt
```

3. Run the Django development server:

```powershell
python manage.py runserver
```

🛠️ Development Notes:-

Hot reload / static preview: Since index.html is static, you can open it directly in the browser during UI development without running Django. Use the Django backend only when testing form submissions or simulating telemetry.

Extending telemetry: Current telemetry values are simulated in script.js. To connect to a real drone (e.g., via MAVLink), replace the mock telemetry generator with a WebSocket or REST API call.

🚀 Future Features (Ideas):-

User authentication: Use Django’s built-in auth system so each user has their own missions, flight history, and settings.

Mission planning UI: Add a map (e.g., Leaflet.js, Mapbox, or Google Maps) for selecting waypoints.

Logs & analytics: Store flight logs in Django models, then display charts with Chart.js or Recharts.

Admin panel: Django Admin is already included — could be extended to manage drones, missions, and users.

API expansion: Add endpoints for /api/telemetry, /api/missions, /api/drone-control to support real hardware.

4. Open http://127.0.0.1:8000/ in your browser. The contact form will POST to http://127.0.0.1:8000/api/contact and show a success alert on success.

## Notes
- This is a prototype: contact submissions are not stored or emailed — the server simply echoes the received data.
- For production, replace the DEBUG settings, add real storage/email handling, and secure the secret key.

Tech Stack Recap

Frontend: Vanilla HTML, CSS, JS (easy to extend with Tailwind, Bootstrap, or React later).

Backend: Django (serves static files + API endpoints).

APIs: Currently only /api/contact, expandable for drone telemetry and missions.

BY,
Havish Munagala
