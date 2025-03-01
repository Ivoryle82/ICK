# Phaser 2D Game: Immigrant Job Search

## Overview
This project is a 2D game developed using Phaser, centered around the story of an immigrant living in the U.S. who has just been laid off. The player has 60 days to find a new job while managing key stats: Health, Money, and Skills. The game features interactive scenario cards that influence the player's journey and lead to one of three possible endings.

## Project Structure
```
phaser-2d-game
├── src
│   ├── assets
│   │   ├── images
│   │   └── sounds
│   ├── scenes
│   │   ├── BootScene.js
│   │   ├── IntroScene.js
│   │   ├── GameScene.js
│   │   ├── EndScene.js
│   │   └── UIScene.js
│   ├── components
│   │   ├── CardComponent.js
│   │   └── StatsUI.js
│   ├── config
│   │   └── gameConfig.js
│   └── index.js
├── package.json
├── webpack.config.js
└── README.md
```

## Features
- **Game Intro Card**: Introduces the player to the scenario and displays initial stats (Health, Money, Skills).
- **Game Progression**: Players encounter various scenario cards that affect their stats and decisions.
- **Stats System**: Manage Health, Money, and Skills to navigate challenges.
- **Endings**: Three possible outcomes based on player performance: Good, Bad, or Open-ended.

## Getting Started
1. **Clone the Repository**: 
   ```
   git clone https://github.com/yourusername/phaser-2d-game.git
   ```
2. **Navigate to the Project Directory**:
   ```
   cd phaser-2d-game
   ```
3. **Install Dependencies**:
   ```
   npm install
   ```
4. **Run the Game**:
   ```
   npm start
   ```

## Development
- The game is structured into scenes, components, and assets for modular development.
- Use the `src/index.js` file to initialize the game and start the BootScene.
- Modify the scenario cards and game logic in the respective scene files to enhance gameplay.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.