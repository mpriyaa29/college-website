Feature Block Assets — Videos
===============================

Place the three feature block videos here.
Each file is referenced directly from the FeatureBlocks component.

EXACT FILE NAMES AND PATHS
───────────────────────────
public/
└── videos/
    └── features/
        ├── research.mp4           ← Research block video
        ├── sports.mp4             ← Sports block video
        └── edc.mp4                ← Entrepreneurship Development Cell video

REQUIREMENTS
────────────
- Format  : MP4 (H.264), optionally also .webm for wider browser support
- Resolution: 1920×1080 minimum
- Duration : 15–45 seconds recommended (loops automatically)
- Audio    : Mute or remove audio track — videos play muted on hover
- Size     : Aim for under 20 MB per video (compress with HandBrake or ffmpeg)

WHAT EACH VIDEO SHOULD SHOW
────────────────────────────
research.mp4   → Lab equipment, students working, research projects, publications
sports.mp4     → Athletics, stadium, students competing, campus sporting events
edc.mp4        → Students presenting ideas, startup activities, innovation lab

HOW TO REPLACE
──────────────
1. Compress your video to MP4
2. Copy it here with the exact filename shown above
3. No code changes needed — FeatureBlocks.jsx will load it automatically

FALLBACK BEHAVIOR
─────────────────
If a video is missing or fails to load, the block silently falls back
to the static image. Nothing will break.
