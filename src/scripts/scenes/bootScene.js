export class BootScene extends Phaser.Scene
{
    constructor(){
        super({key: `BootScene`})
        this.ready = false;
    }

    preload(){
        this.load.rexWebFont({
            google: {
                families: ['Montserrat:800']
            },
        });

        //this.load.image(`loadingBG`, `./src/images/ui/pantalla_carga_fondo.png`);
        //this.load.atlas(`loadingUI`, `./src/images/ui/loading_ui.png`, `./src/images/ui/loading_ui.json`);
    }

    create(){
        let gameWidth = this.game.config.width;

        //this.data.set('seasonId', this.game.config.metadata.seasonId);
        //this.data.set('gameId', this.game.config.metadata.gameId);
        this.data.set(`highScore`, this.game.config.metadata.highScore);
        this.data.set('sponsor', this.game.config.metadata.sponsor);
        this.data.set(`musicVolume`, .2);
        this.data.set(`sfxVolume`, .2);
        let phaserDiv = document.getElementById(`phaser-div`);
        this.data.set(`parentSize`, phaserDiv.style.width);
        this.data.set('IS_TOUCH', false);
        window.addEventListener('touchstart', () => {this.data.set('IS_TOUCH', true); });
        
        /*
        this.bg = this.add.image(gameWidth/2, gameWidth/2, `loadingBG`).setDisplaySize(gameWidth, gameWidth).setDepth(5).setInteractive();
        this.playButton = this.add.image(gameWidth/2, gameWidth/2, `loadingUI`, `boton_jugar.png`).setDepth(5).setInteractive();
        this.playButton.setVisible(false).on(`pointerdown`, () => { 
            this.scene.stop();
            this.scene.get(`UIScene`).splashScreenAnim();
        });

        this.loadingThumb = this.add.sprite(0, gameWidth/2,'loadingUI','bar_icon.png').setDepth(5.1);
        this.loadingSlider = this.rexUI.add.slider({
            x: gameWidth/2,
            y: gameWidth/2,
            width: 650,
            height: 50,
            orientation: `x`,
            value: 0,
    
            track: this.add.sprite(0,0,`loadingUI`,`carga_contenedor.png`),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,`loadingUI`,`carga_barra.png`)),
            thumb: this.rexUI.add.roundRectangle(0, 0, 40, 50, 0),
    
            input: `none`,
            space: {
            top: 10,
            right: 0,
            left: -23,
            bottom: 4
            },
        }).layout().setDepth(5);

        let sliderTween = this.tweens.add({
            targets: this.loadingSlider,
            ease: `sine.inout`,
            duration: 2000,
            repeat: 0,
            value: {
            getStart: () => 0,
            getEnd: () => .9
            },
            onUpdate: () => {
                if(this.loadingSlider != null) this.loadingThumb.x = this.loadingSlider.getElement('thumb').x+10;
            },
            onComplete: () => {
                sliderTween?.remove();
                sliderTween = null;
            }
        });
        */
        
        this.nextSceneReady = false;
        this.scene.launch('UIScene', this.data);
        this.scene.get(`UIScene`).events.once(`create`, () => {
            this.scene.launch(`MenuScene`, this.data);
            this.scene.sendToBack(`MenuScene`);
            this.scene.get(`MenuScene`).events.once(`create`, () => {
                this.nextSceneReady = true
            });
        });
        this.uiScene = this.scene.get(`UIScene`);
    }

    update(){
        /*
        if (this.nextSceneReady && this.loadingSlider.value == .9) {
            this.nextSceneReady = false;
            let sliderTween = this.tweens.add({
                targets: this.loadingSlider,
                ease: `sine.inout`,
                duration: 500,
                repeat: 0,
                value: {
                  getStart: () => .9,
                  getEnd: () => 1
                },
                onComplete: () => {
                    sliderTween?.remove();
                    sliderTween = null;
                    this.loadingSlider.setVisible(false);
                    this.loadingThumb.setVisible(false);
                    this.playButton.setVisible(true);
                }
            });
        }
        */
        if (this.nextSceneReady) {
            this.scene.stop();
        }
    }  

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }
}