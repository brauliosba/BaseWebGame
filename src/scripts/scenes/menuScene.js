import * as Phaser from 'phaser';
export class MenuScene extends Phaser.Scene
{
    constructor(){
        super({key: 'MenuScene'});
    }

    preload(){
        //this.load.image(`square`, `src/images/square.png`);
        //this.load.image(`menuBG`, `src/images/ui/menu_background.png`);
        //this.load.atlas(`menuUI`, `src/images/ui/menu_ui.png`, `src/images/ui/menu_ui.json`);
        this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
    }

    init(data){
        this.data = data;
    }

    create(){
        this.gameWidth = this.game.config.width;
        this.nextSceneReady = false;

        //UI
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);

        /*
        this.loadingBG = this.add.image(this.gameWidth/2, this.gameWidth/2, 'loadingBG').setDisplaySize(this.gameWidth, this.gameWidth);
        this.loadingBG.setDepth(5).setInteractive().setVisible(false);

        this.loadingThumb = this.add.sprite(0,this.gameWidth/2,'loadingUI','bar_icon.png').setDepth(5.1).setVisible(false);
        this.loadingSlider = this.rexUI.add.slider({
            x: this.gameWidth/2,
            y: this.gameWidth/2,
            width: 650,
            height: 50,
            orientation: `x`,
            value: 0,
    
            track: this.add.sprite(0,0,`loadingUI`,`carga_contenedor.png`),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,`loadingUI`,`carga_barra.png`)),
            thumb: this.add.sprite(0,0,`loadingUI`,`carga_icono.png`).setScale(.9,.9),
    
            input: `none`,
            space: {
            top: 10,
            right: 0,
            left: -23,
            bottom: 4
            },
        }).layout().setDepth(5).setVisible(false);
        this.loadingSlider.value = 0;
        */

        this.isPaused = false;
       
        /*
        let bg = this.add.image(this.gameWidth/2, this.gameWidth/2, 'menuBG').setDisplaySize(this.gameWidth, this.gameWidth);
        bg.setInteractive().on('pointerdown', () => { this.uiScene.audioManager.resumeMusic(); this.isPaused = false; });
        if (this.data.get('sponsor')) {
            // agregar sponsor assets
            this.game.config.metadata.onDataSend({name:`turbo_delivery`, sponsorCounter:1});
        }

        this.add.image(140, 80, `menuUI`, `logo_pchujoy.png`).setScale(.72);
        */

        let playButton = this.add.text(this.gameWidth/2, 890, 'JUGAR', { fontFamily: 'Montserrat', fontSize : 60, color: '#FFFFFF' }).setScale(.72).setOrigin(.5);
        playButton.setInteractive().on('pointerup', () => {
            this.nextSceneReady = false;
            this.showLoading();
            //this.uiScene.audioManager.buttonPlay.play();
        });

        /*
        let optionsButton = this.add.image(this.gameWidth/2-250, 890, 'menuUI', 'boton_opciones.png').setScale(.72);
        optionsButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showOptions(); this.uiScene.audioManager.buttonClick.play(); });

        let turotialButton = this.add.image(this.gameWidth/2+250, 890, 'menuUI', 'boton_tutorial.png').setScale(.72);
        turotialButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showInstructions(() => null); this.uiScene.audioManager.buttonClick.play(); });

        let creditsButton = this.add.image(this.gameWidth-120, 105, `menuUI`, `boton_creditos.png`).setScale(.72);
        creditsButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showCredits(); this.uiScene.audioManager.buttonClick.play(); });
        */

        this.exposedVariables();
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
                    this.mainScene.startRunning = true;
                    this.uiScene.audioManager.menuMusic.stop();
                    sliderTween?.remove();
                    sliderTween = null;
                    this.scene.stop();
                }
            });
        }
        */
        if (this.nextSceneReady){
            this.mainScene.startRunning = true;
            this.scene.stop();
        }
    }

    showLoading(){
        /*
        this.loadingBG.setVisible(true);
        this.loadingSlider.setVisible(true);

        let sliderTween = this.tweens.add({
            targets: this.loadingSlider,
            ease: `sine.inout`,
            duration: 1500,
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

        this.scene.launch('MainScene', [this.data, true]);
        this.scene.sendToBack('MainScene');
        this.mainScene = this.scene.get("MainScene");
        this.scene.get(`MainScene`).events.once(`create`, () => {
            this.mainScene.startRunning = false;
            this.nextSceneReady = true;
        });
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    addVariable(y, label, key){
        this.add.text(200, y, label, {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 400,
            fixedHeight: 50,
            backgroundColor: '#333333',
        }).setOrigin(0.5)

        let printText = this.add.text(480, y, this.data.get(key), {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 150,
            fixedHeight: 50,
            backgroundColor: '#333333',
        }).setOrigin(0.5)

        this.plugins.get('rextexteditplugin').add(printText, {
            type: 'text',
            onTextChanged: (textObject, text) => { textObject.text = text; this.setData(key, text); },
            selectAll: true,
        });
    }

    exposedVariables(){
        let y = 80
        let space = 60;
        /*
        this.addVariable(y, `Modificador tamaño dish 1:`, 'sizeDish1');
        this.addVariable(y + space * 1, `Modificador tamaño dish 2:`, 'sizeDish2');
        */
    }

    setData(key, speed){
        this.data.set(key, parseFloat(speed))
    }

    pauseGame(){
        this.isPaused = true;
    }
}