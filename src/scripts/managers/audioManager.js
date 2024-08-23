import * as Phaser from 'phaser';
export class AudioManager
{
    constructor(scene){
        this.scene = scene;
    }

    load(){
        //main Themes
        //this.scene.load.audio(`mainTheme`, [ `./src/audios/menu_loop.ogg`, `./src/audios/menu_loop.m4a` ]);
        //this.scene.load.audio(`gameplayTheme`, [ `./src/audios/gameplay_loop.ogg`, `./src/audios/gameplay_loop.m4a` ]);
    }

    init(){
        this.scene.sound.pauseOnBlur = false

        //sfx
        this.sfx = [];
        this.driverSfx = [];
        this.addSFX();
        
        /*
        //menuTheme
        this.menuMusic = this.scene.sound.add(`mainTheme`, {
            volume: .5,
            loop: true
        });  

        //gameplayTheme
        this.gameplayMusic = this.scene.sound.add(`gameplayTheme`, {
            volume: .5,
            loop: true
        });      

        if (!this.scene.sound.locked)
        {
            // already unlocked so play
            this.getCurrentTheme().play();
            
            this.setAudioVolume(this.scene.data.get('musicVolume'));
        }
        else
        {
            // wait for `unlocked` to fire and then play
            this.scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.getCurrentTheme().play();
                
                this.setAudioVolume(this.scene.data.get('musicVolume'));
            })
        }

        this.scene.game.events.on(Phaser.Core.Events.BLUR, () => {
            this.handleLoseFocus();
        })
    
        document.addEventListener(`visibilitychange`, () => {
            if (!document.hidden)
            {
                return
            }
    
            this.handleLoseFocus();
        })
        */
    }

    addSFX(){
        /*
        let name = this.scene.sound.add(`name`, {
            volume: .5,
            loop: false
        });
        this.sfx.push(name);
        this.chaufaChopsticks.push(name);
        */
    }

    getCurrentTheme(){
        let currentScene;
        if (this.scene.currentScene != null) currentScene = this.scene.currentScene.scene.key;
        else currentScene = 'MenuScene'
        switch(currentScene){
            case `MenuScene`:
                return this.menuMusic;
            case `MainScene`:
                return this.gameplayMusic;
            default:
                break;
        }
    }
    
    handleLoseFocus()
    {
        if (this.scene.currentScene != null) {
            // assuming a Paused scene that has a pause modal
            if (this.scene.currentScene.isPaused)
            {
                return
            }
            // pause music or stop all sounds
            this.pauseMusic();
            this.scene.currentScene.pauseGame();
            this.scene.currentScene.isPaused = true;
        }
    }

    setAudioVolume(value){
        this.menuMusic.volume = value;
        this.gameplayMusic.volume = value;
        this.updateSFXVolume(value);
    }

    playMusic(){
        this.getCurrentTheme().play();
    }

    resumeMusic(){
        if (this.scene.currentScene.isPaused) {
            this.volumeDownTween?.remove();
            this.volumeDownTween = null;

            let audio = this.getCurrentTheme()
            audio.resume();
            let volumeUpTween = this.scene.tweens.add({
                targets: audio,
                ease: 'sine.inout',
                duration: 500,
                repeat: 0,
                volume: {
                    getStart: () => 0,
                    getEnd: () => this.scene.data.get('musicVolume')
                },
                onComplete: () => {
                    volumeUpTween?.remove();
                    volumeUpTween = null;
                }
            });
        }
    }

    pauseMusic(){
        let audio = this.getCurrentTheme();
        this.volumeDownTween = this.scene.tweens.add({
            targets: audio,
            ease: 'sine.inout',
            duration: 500,
            repeat: 0,
            volume: {
                getStart: () => this.scene.data.get('musicVolume'),
                getEnd: () => 0
            },
            onComplete: () => {
                this.volumeDownTween?.remove();
                this.volumeDownTween = null;
                audio.pause();
            }
        });
    }

    stopMusic(){
        this.getCurrentTheme().stop();
    }

    updateSFXVolume(value){
        for(let i = 0; i < this.sfx.length; i++){
            if (this.sfx[i].key != 'scoreMarkSound') this.sfx[i].volume = value;
            else this.sfx[i].volume = value >= 0.05 ? value + .2 : value;
        }
    }
}