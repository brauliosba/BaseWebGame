import * as Phaser from 'phaser';
import { GameplayUI } from '../components/gameplayUI';
import { VisualEffectsManager } from '../managers/visualEffectsManager.js'

export class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key: `MainScene`,
        });
    }
    
    init(data){
        this.data = data[0]
        this.tutorial = data[1];
    }

    preload(){

    }

    create(){
        this.gameState = 'init';

        this.gameWidth = this.game.config.width;
        this.gameHeight = this.game.config.height;
        this.isPaused = false;
        this.startRunning = true;
        this.blockStart = true;

        //UI
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);
        this.animationsManager = this.uiScene.animationsManager;
        this.animationsManager.createGameplayObjects(this.gameWidth);
        
        this.panel = this.uiScene.panel;
        //this.panel.createPausePanel(this.gameWidth);
        //this.panel.createScorePanel(this.gameWidth);

        //Animations
        this.anims.resumeAll();

        //Instances
        this.gameplayUI = new GameplayUI(this, this.gameWidth);
        this.gameplayUI.create();
        this.visualEffectsManager = new VisualEffectsManager(this);
        this.visualEffectsManager.init();

        // inputs
        let keyPause = this.input.keyboard.addKey(`ESC`);
        keyPause.on(`down`, () => { this.pauseGame();})
        let keyPause2 = this.input.keyboard.addKey(`P`);
        keyPause2.on(`down`, () => { this.pauseGame();})
        //let keyPause3 = this.input.keyboard.addKey(`R`);
        //keyPause3.on(`down`, () => { this.restartGame();})

        if (this.data.get('IS_TOUCH')) {
            //Mobile stuff
        }
    }

    getTypePointer(pointer) {
        if (pointer.pointerType === 'touch') {
            return pointer.touches[0].worldX;
        } else {
            return pointer.worldX
        }
    }

    update(totalTime, deltaTime) {
        switch(this.gameState) {
            case `init`:
                this.gameState = 'restart';
                break;
            case `restart`:
                if (this.startRunning && this.tutorial) {
                    this.tutorial = false;
                    this.startRunning = false;
                    this.isPaused = true;
                    this.pauseTimeEvents();
                    this.startTutorial();
                }
                else if (!this.blockStart) {
                    this.startTime = this.time.now * 0.001;
                    //this.uiScene.audioManager.playMusic();
                    this.isPaused = false;
                    this.gameState = 'play';
                    this.game.config.metadata.onGameStart({state:`game_start`, name:`game_name`});
                }
                break;
            case `play`:
                if (!this.isPaused){
                    let dt = Math.min(1, deltaTime/1000);
                    this.gameplayUI.updateScore();
                }
                break;
            case `game_over`:
                if (!this.isPaused){
                    this.finishTime = this.time.now * 0.001;
                    this.isPaused = true;
                    this.finishGame();
                }
                break;
        }
    }
    
    toMeters(n) {
        return n / 10.8;
    }
    
    toPixels(n) {
        return n * 10.8;
    }

    pauseGame(){
        if (this.gameState == 'play'){
            this.isPaused = !this.isPaused
            this.pauseTimeEvents();
            
            if (this.isPaused){
                this.anims.pauseAll();
                //this.uiScene.audioManager.pauseMusic();
                //this.panel.showPause();
            }
            else{ 
                this.anims.resumeAll();
                //this.panel.hidePause();
            }
        }
    }

    pauseTimeEvents(){
        //pause created time events if necessary
    }

    restartGame(){
        //this.uiScene.audioManager.stopMusic();
        this.scene.restart([this.data, false]);
    }

    encrypt(data) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(process.env.GAME_PUBLIC_KEY);

        return encrypt.encrypt(data);
    }

    finishGame() {
        this.isPaused = true
        this.anims.pauseAll();

        const newScore = this.score;
        const highScore = parseInt(this.data.get(`highScore`));
        const gameplayTime = this.finishTime - this.startTime;

        if(newScore >= highScore) this.data.set(`highScore`, newScore);

        const payload = {
            score: newScore,
            game_id: this.data.get(`gameId`),
            season_id: this.data.get(`seasonId`)
        }
        let encryptedObject = this.encrypt(JSON.stringify(payload));

        setTimeout(() =>{
            this.panel.showScore(newScore, newScore, gameplayTime);
            this.game.config.metadata.onGameEnd(encryptedObject);
        }, 2000);
    }

    startTutorial(){
        this.blockStart = false;
        /*
        this.blockStart = true;

        this.panel.showInstructions(() => {
            this.isPaused = false;
            this.pauseTimeEvents();
        });
        */
    }

    startAnimation() {
        this.blockStart = true;
    }

    backMenu(){
        //this.uiScene.audioManager.stopMusic();
        this.scene.start(`MenuScene`, this.data);
    }
}   