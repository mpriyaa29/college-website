Feature Block Assets — Images
==============================

Place the three feature block fallback images here.
These are shown by default (before hover) and while videos load.

EXACT FILE NAMES AND PATHS
───────────────────────────
public/
└── images/
    └── features/
        ├── research.jpg           ← Research block image
        ├── sports.jpg             ← Sports block image
        └── edc.jpg                ← Entrepreneurship Development Cell image

NOTE ON EXTENSIONS
──────────────────
The component currently expects .jpg
If your images are .png or .webp, open:
  src/components/FeatureBlocks/FeatureBlocks.jsx
and update the `image` path in the FEATURES array accordingly.

REQUIREMENTS
────────────
- Format     : JPG (preferred for photos) or PNG
- Resolution : 1920×1080 minimum
- Orientation: Landscape or portrait both work — object-fit: cover is used

WHAT EACH IMAGE SHOULD SHOW
────────────────────────────
research.jpg  → Research lab, innovation, students at work
sports.jpg    → Stadium, athletes, sporting event on campus
edc.jpg       → Students in a startup/innovation environment

HOW TO REPLACE
──────────────
1. Copy your image here with the exact filename shown above
2. No code changes needed — FeatureBlocks.jsx will load it automatically

FALLBACK BEHAVIOR
─────────────────
If an image is missing or fails to load, the block shows a dark navy
gradient placeholder. Nothing will break.
