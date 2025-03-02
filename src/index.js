import Phaser from 'phaser';
import gameConfig from './config/gameConfig';
import FamilyIssue from './scenes/FamilyIssue';
import BootScene from './scenes/BootScene';
import IntroScene from './scenes/IntroScene';
import GameScene from './scenes/GameScene';
import EndScene from './scenes/EndScene';
import UIScene from './scenes/UIScene';

gameConfig.scene = [BootScene, FamilyIssue, IntroScene, GameScene, EndScene, UIScene];

const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});