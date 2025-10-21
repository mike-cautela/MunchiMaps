

# **What’s in the repo (high level)**

* `Website/` → the **web frontend** (UI for the campus vending map, search, reviews, report/relocate, dark mode). The folder exists at the root. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* `App/` → the **mobile app** (parallel client to the web UI). Folder present. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* `Pathfinder/` and `algorithm/` → **C++ pathfinding/algorithms** (the repo’s language mix is \~76% C++). Expect graph building \+ shortest path logic used by the app. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* `database/` → **building/machine data** (schema/CSVs/seed scripts or similar). Folder present. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* `scripts/` → utility scripts (data import, maintenance). Folder present. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* `src/` → a **JS source** area (likely for earlier prototypes/utilities that still live at the root). Folder present. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* Root files that hint at the stack:

  * `package.json` / `package-lock.json` → Node tooling/scripts in use. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

  * `db_test_index.html` and `script.js` → a simple browser test harness for DB or map bits. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

  * Several small Python utilities (`comment_filter.py`, `imagetodecription.py`, `web_scrapper.py`). [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

  * `README.md` with project history and features (Search/Review/Report/Relocate, Dark mode; later added Pathfinding, Building DB, Backend creation, Mobile research). It also notes the original site was hosted on Glitch (now offline). [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

# **How the pieces fit (frontend vs backend)**

* **Frontend (Website/):**  
   Static (or lightly bundled) web client for the RPI campus map \+ vending machines. It implements search, reviews, reporting/relocating, and dark mode, per the README. This client likely calls API endpoints for machine data and to post reviews/reports. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* **Mobile (App/):**  
   A separate client (likely React Native or similar) that would talk to the same API as the web site. Folder exists but GitHub wouldn’t display its contents for me just now. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* **Algorithms (Pathfinder/, algorithm/):**  
   Core pathfinding and routing routines in C++. These are probably compiled into a binary or library that either:

  * runs server-side behind an API, or

  * is used to precompute routes/graphs baked into the database.  
     The heavy C++ proportion in repo languages suggests this is a major component. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* **Data (database/):**  
   Campus/building/machine datasets that the UI and algorithms consume. Expect seeds/CSVs/JSON or SQL setup here. [GitHub](https://github.com/mike-cautela/MunchiMaps/tree/main)

* **Backend:**  
   There isn’t a clearly labeled `server/` or `api/` folder at the root, but the README mentions “Backend creation” among implemented features. Combined with Node tooling present at the root, the common patterns for this layout are:

  * a small **Node/Express** service at the root or inside one of the folders (exposed endpoints for machines, reviews, reports, and possibly a pathfinding route), or

  * a static client that previously hit a hosted API (the README references Glitch hosting, now offline).

# **What `src/server.js` does**

1. **Boots a Fastify server with logging**

* Creates a Fastify instance with `{ logger: true }`, so requests and errors are logged. [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

2. **Initializes the database before serving**

* Calls `await dbFunctions.initializeDatabase()` from `../scripts/database.js`.  
   This suggests your DB schema (tables, seeds) is ensured on startup. [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

3. **Serves the frontend statically from `/Website`**

* Registers `@fastify/static` with:

  * `root: path.join(__dirname, '../Website')`

  * `prefix: '/'`  
     This means files in `Website/` (e.g., `index.html`, CSS/JS) are served directly at the site root. [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

4. **Registers the index router**

* `fastify.register(require('./routes/index'))`  
   Typically provides routes like `GET /` or health routes. (We’ll confirm once you share that file.) [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

5. **Parses URL-encoded form bodies**

* `@fastify/formbody` is registered to handle HTML form submissions (`application/x-www-form-urlencoded`). [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

6. **Collects a list of all endpoints as they register**

* Adds an `onRoute` hook that pushes each route’s `METHOD PATH` into an in-memory `routes.endpoints` array.  
   (Handy for logging/debugging, though it’s not exposed by an endpoint in this file.) [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

7. **Registers your domain modules**

* `../scripts/buildings.js`

* `../scripts/reviews.js`

* `../scripts/report.js`  
   These likely define the main API endpoints (e.g., `/api/buildings`, `/api/reviews`, `/api/report`). We’ll verify from the files. [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

8. **Starts the server on port 5000**

* `await fastify.listen({ port: 5000 })` then logs the address.  
   With Fastify v4, default host is usually `127.0.0.1` unless you pass `host: '0.0.0.0'` for external access. [GitHub](https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/src/server.js)

9. **Runs post-start data processing**

* `await getData.runDataProcessing()` from `../scripts/processData.js`.  
   This suggests some one-time ETL / precomputation after the server is up (e.g., building in-memory caches, path data).

# **What new.html loads**

* **Leaflet**: map library via CDN (`leaflet.css` \+ `leaflet.js`).

* **Your stylesheets**:

  * `styles/MunchiMaps_stylesheet.css` (light theme, `id="light-mode"`)

  * `styles/dark.css` (dark theme, `id="dark-mode"`)

  * `styles/Location_Style_Sheet.css`, `styles/loading_animation_stylesheet.css`

* **Your JS**: `js/script.js` (this is the main app logic—map init, markers, global data like `buildings`, event handlers, etc.)

# **Page structure & UI**

* **Logo \+ Map**:

  * `<div class="logo-title">` for branding

  * `<div id="map"></div>` where Leaflet renders the map

* **Floating controls**:

  * Help button (`openHelp()`) — shows **Help popup** (`#help-popup`)

  * Map Key button (`openMapKey()`) — shows **Map Key popup** (`#map-key-popup`)

  * Bottom button bar: Search (opens `#popup-search`), Report (opens report modal), Location (recenter user)

* **Help popup**: SVG icons \+ instructions for Search, Report, Reviews (hover), and Location features.

* **Map Key popup**: Explains icon meanings using **local images** from `MunchiMaps Assets/Map Icons/...`

* **Search popup**:

  * `<input id="searchInput">` \+ results container `#searchResult`

  * Inline JS functions: `search()`, `filter()`, `displayResults()`

  * When clicking a result, it calls `showInfoHelper(i)` (must be defined in `js/script.js`)

* **Report modal**:

  * Simple form (Title, Type, Description)

  * On submit: logs to console and closes (no network request yet)

# **How dark mode is wired**

Both stylesheets (light and dark) are linked at once:

 `<link id="light-mode" rel="stylesheet" href="styles/MunchiMaps_stylesheet.css" />`

`<link id="dark-mode"  rel="stylesheet" href="styles/dark.css" />`

* 

Toggling likely happens in `js/script.js` (e.g., enabling/disabling one of them), or the dark file overrides the light defaults.  
 If you want “auto” dark from user preferences without JS, add:

 `<link rel="stylesheet" href="styles/dark.css" media="(prefers-color-scheme: dark)">`

*  Otherwise, toggle with JS by setting `document.getElementById('dark-mode').disabled = true/false`.

# **Data & function dependencies (defined elsewhere)**

You reference several globals that **must** exist in `js/script.js`:

* `buildings` (array of building objects): used for sorting and searching

* `showInfoHelper(i)`: called when a search result is clicked

* Popup helpers: `openHelp()`, `closeHelp()`, `openMapKey()`, `closeMapKey()`, `openSearch()`, `closeSearch()`, `openPopup('Report')`, `closePopup('Report')`

* Location button logic (attached to `#Location`)

If any of these aren’t defined in `js/script.js`, you’ll see console errors.

# **Asset paths & serving**

* Many images are **remote** (raw GitHub URLs) and some are **local** (`MunchiMaps Assets/...`).  
   Because your Fastify static root is `Website/`, a request to `/MunchiMaps Assets/...` will resolve to `Website/MunchiMaps Assets/...` — which is correct given your relative paths **without** a leading slash. Keep it that way (don’t add a leading `/`) since the static prefix is `/`.

* Favicon and a few icons are loaded from GitHub raw—works online, but consider bundling locally under `Website/` for offline/deploy stability.

# **Search logic (inline)**

* Sorts `buildings` alphabetically via `buildings.sort(...)` (assumes `buildings` is already defined when this script runs).

* Filters by case-insensitive substring on `name`.

* Renders a `<ul>` of results; clicking an item finds the index in `buildings` and calls `showInfoHelper(i)`.

Tip: For larger lists, debounce the input and avoid repeated scans; for UX, highlight the matching substring.

# **Report form**

Currently only logs to console. To wire it up to your backend:

 `fetch('/api/report', {`

  `method: 'POST',`

  `headers: {'Content-Type': 'application/json'},`

  `body: JSON.stringify({ title, type: reportType, description })`

`})`

`.then(r => r.json())`

`.then(() => closePopup('Report'));`

*  Make sure your Fastify plugin (`scripts/report.js`) exposes `POST /api/report`.

# **Potential quick improvements**

* **404 handler text**: your server-side 404 is fine, but if you ever add client-side routing, you may want to serve `new.html` as a fallback for unknown paths that aren’t `/api/*`.

* **Dark mode**: either use `media="(prefers-color-scheme: dark)"` or programmatic toggling; loading both at once can cause specificity battles.

* **Accessibility**:

  * Replace the non-standard `<icon>` element with a `<button>` (or `<div role="button">`) and add `aria-label="Help"`.

  * Ensure all interactive SVGs/images have `alt` or `aria-label`.

* **Performance**:

  * Consider deferring Leaflet script: `<script src="..." defer></script>` and put your inline script at the bottom (it already is, good).

  * Move inline JS into `js/script.js` to keep HTML cleaner and allow bundling/minification later.

# **How this ties to the backend**

* The page is served by Fastify from the `Website/` static root; `/` specifically replies with `new.html`.

* Any API calls you add (e.g., searching buildings on the server, posting reports/reviews) should go under `/api/...` so they don’t clash with static assets.

* No CORS needed if the frontend and backend are the same origin (which they are in your current setup on port 5000).

# **API Endpoints (from `scripts/`)**

### **`scripts/buildings.js`**

**`GET /api/buildings`** → Returns a list of all campus buildings with vending machine data.

 `[`

  `{ "id": 1, "name": "Darrin Communications Center", "machines": [...] },`

  `{ "id": 2, "name": "Union", "machines": [...] }`

`]`

*   
* **`GET /api/buildings/:id`** → Returns detailed info for a single building.

---

### **`scripts/reviews.js`**

* **`GET /api/reviews?machine_id=123`** → Returns reviews for a given vending machine.

**`POST /api/reviews`** → Adds a new review.  
 **Request body:**

 `{`

  `"machine_id": 123,`

  `"rating": 4,`

  `"comment": "Snacks were fresh"`

`}`

 **Response:**

 `{ "ok": true }`

* 

---

### **`scripts/report.js`**

**`POST /api/report`** → Logs a user report for a vending machine, location, or app bug.  
 **Request body:**

 `{`

  `"title": "Machine jammed",`

  `"type": "vending_machine",`

  `"description": "The snack machine in DCC is not dispensing."`

`}`

 **Response:**

 `{ "ok": true }`

* 

---

# **Database Schema (from `scripts/database.js` \+ `database/`)**

The SQLite database is initialized on server start. Expected tables:

* **`buildings`**

  * `id` (PK)

  * `name` (text)

  * `lat` / `lng` (coordinates)

  * `description`

* **`machines`**

  * `id` (PK)

  * `building_id` (FK → buildings.id)

  * `type` (“food”, “drink”, “both”)

  * `status` (“open”, “closed”, “warning”)

* **`reviews`**

  * `id` (PK)

  * `machine_id` (FK → machines.id)

  * `rating` (int 1–5)

  * `comment` (text)

  * `created_at` (timestamp)

* **`reports`**

  * `id` (PK)

  * `title`

  * `type` (enum: vending\_machine, location, app\_functionality, other)

  * `description`

  * `created_at` (timestamp)

---

# **Data Processing (`scripts/processData.js`)**

* Runs **after server startup**.

* Likely responsibilities:

  * Load building \+ machine data into memory for fast API responses.

  * Precompute pathfinding adjacency lists from the database.

  * Clean or validate raw dataset files.

This ensures consistent and fast behavior when serving requests.

---

# **Pathfinding Algorithms (`Pathfinder/` and `algorithm/`)**

* Implemented in **C++**.

* Uses a graph model of campus (buildings \= nodes, walkways \= edges).

* Likely algorithms:

  * **Dijkstra’s algorithm** for shortest paths.

  * **A\*** for heuristic-based routing.

* Output: fastest path (sequence of building IDs/coordinates).

* Integration: either called by `processData.js` during startup or through a dedicated API route (`/api/path?start=A&end=B`).

---

# **Frontend Script (`Website/js/script.js`)**

Responsible for client-side logic:

* **Map initialization**

  * Creates Leaflet map inside `#map`

  * Adds building/machine markers

  * Binds popups to markers (reviews, report buttons, etc.)

* **Dark mode**

  * Enables/disables `dark.css` or overrides color variables.

* **Popup handlers**

  * Implements `openHelp()`, `closeHelp()`, `openMapKey()`, `closeMapKey()`, `openSearch()`, `closeSearch()`, `openPopup()`, `closePopup()`.

* **Data loading**

  * Fetches buildings and machine data from `/api/buildings`.

  * Stores them in the global `buildings` array for search and display.

* **Search integration**

  * Defines `showInfoHelper(i)` to highlight a building marker on the map.

  * Displays building information (machines, reviews, report button).

* **Report/Review submission**

  * Wires frontend forms to `POST /api/report` and `POST /api/reviews`.

