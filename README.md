# 3D Schule

Technisches Grundgerüst für eine interaktive 3D-Schule im Browser. Die Szene nutzt Three.js und ist so vorbereitet, dass sie mit Maus und Touch bedient werden kann, damit sie später auch auf einem iPad in Safari nutzbar ist.

Three.js wird im Browser über ein Import Map von jsDelivr geladen. Dadurch bleibt das Projekt in diesem ersten Schritt sehr schlank und kann ohne Bundler direkt als statische Website ausgeliefert werden.

## Inhalt der ersten Testszene

- hellblauer Himmel
- große grüne Bodenfläche
- einfaches farbiges Testgebäude
- Perspektivkamera
- Beleuchtung mit Schatten
- Orbit-Steuerung für Maus und Touch

## Projektstruktur

```text
.
├── index.html          # Einstiegspunkt für den Browser und Three.js-Import-Map
├── package.json        # npm-Skripte für Entwicklung, Check und Build
├── scripts/
│   └── build.mjs       # einfacher Static-Build nach dist/
├── src/
│   ├── main.js         # Three.js-Szene, Kamera, Licht, Schatten, Steuerung
│   └── styles.css      # Vollbildlayout und iPad-/Touch-freundliche Basisstyles
└── README.md
```

## Starten

Entwicklungsserver starten:

```bash
npm run dev
```

Danach `http://localhost:5173` im Browser öffnen. Im selben Netzwerk kann die lokale Netzwerkadresse des Rechners später auch auf einem iPad in Safari getestet werden.

## Build Check

Syntax prüfen:

```bash
npm run check
```

Statische Dateien nach `dist/` bauen:

```bash
npm run build
```
