import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import IntroScene from './scenes/IntroScene';
import GameScene from './scenes/GameScene';
import EndScene from './scenes/EndScene';
import UIScene from './scenes/UIScene';
import gameConfig from './config/gameConfig';

const config = {
    ...gameConfig,
    scene: [BootScene, IntroScene, GameScene, EndScene, UIScene]
};

const game = new Phaser.Game(config);