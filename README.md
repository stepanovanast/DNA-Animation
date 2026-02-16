# DNA Animation 

## Overview
This is an ExtendScript (JSX) project for Adobe After Effects — an individual assignment for the Video Technologies course in Year 4 of my bachelor's studies at VilniusTech. It automates the creation of a randomized hexagonal grid, which is then transformed into a DNA chain structure. The animation can be scaled based on the hexagon radius, which the user can modify.

## Features
- Automatic calculation of hexagon spacing and offsets based on user input.
- Each hexagon contains a scale pulse (90% to 110%) for smoother animation.
- Generates a variety of purple and blue hues, aiming for a "vaporwave" aesthetic.
- Automatically sets up a Final Composition with pre-comps and a "CC Ball Action" effect applied.

## How It Works
The script calculates the hexagonal tiling using the geometric properties of a regular hexagon:

- **Width:** `sqrt(3) * R`
- **Vertical Spacing:** `1.5 * R` (plus gutters)

## Technologies Used
- **Language**: ExtendScript (Javascript ES3)
- **Host**: Adobe After Effects

## Installation & Setup

### Prerequisites
- Adobe After Effects (CC 2020 or newer recommended)

### Running the Script
1. Open Adobe After Effects.
2. Go to **File > Scripts > Run Script File.**
3. Select the `DNA.jsx` file.
4. When prompted, enter a radius value between 100 and 200.
5. The script will automatically:
   - Close the current project (if one is open).
   - Create a "hexagons" composition.
   - Generate the grid.
   - Create a "Final Composition" and open it in your viewer.

## Controls & Customization
To modify the behavior of the grid, edit these variables in the code:
- `compFPS` — Change from 25 to 30 or 60 for smoother animation.
- `baseR` / `baseB` — Adjust these values to change the primary color theme.
- `scale.expression` — Modify the `Math.sin` parameters to speed up or slow down the pulsing effect.

## Script Structure
```
Project/
├── hexagons (Comp)          # Contains the individual shape layers
│   └── hex 1-X              # Shape layers with Polystar & Stroke properties
└── Final Composition (Comp) # Pre-comp of 'hexagons' with effects applied
    └── CC Ball Action       # Scatter, Twist, and Rotation animations

```

## Credits
- **Developer**: Anastasia Stepanova

## Contact
- anastasija.stepanova777@gmail.com
- https://github.com/stepanovanast

---

*Last updated: 05/01/2026*
