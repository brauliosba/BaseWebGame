export class Panel
{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        this.credits = 
        [['Programación', ''],
        ['Arte y animación', 'Edward Torres', 'Lephirea'],
        ['Marketing y diseño UI', 'Karoline Jiménez'],
        ['Música y sonido', 'Gunter Brenner'],
        ['Dirección', 'Jorge García'],
        ['Producción Ejecutiva', 'Phillip Chu Joy']]
    }

    create(dim){
        this.gameWidth = dim;
        let background = this.scene.add.image(dim/2, dim/2, 'fade').setDisplaySize(dim, dim).setInteractive();

        //this.panel = this.scene.add.image(dim/2, dim/2, 'panel').setScale(.72);

        //this.panelContainer = this.scene.add.container(0, 0, [background, this.panel]);
        //this.panelContainer.setDepth(10).setVisible(false);
    }

    /*
    createPausePanel(dim){
        //let pauseTitleContainer = this.scene.add.image(dim/2, 270, 'panelUI', 'cartel_titulo.png').setScale(.72);

        let pauseTitle = this.scene.add.text(dim/2, 245, 'PAUSA', { font: '400 50px Bungee', color: '#FFFFFF', align: 'center' });
        pauseTitle.setOrigin(0.5);

        let closeImage = this.scene.add.image(dim-120, 250, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.scene.audioManager.resumeMusic();
            this.scene.currentScene.pauseGame();
        });

        let continueButton = this.scene.add.image(dim/2, dim/2-125, 'panelUI', 'pausa_continuar_1.png').setInteractive().setScale(.72);
        continueButton.on('pointerdown', () => {
            continueButton.setTexture('panelUI', 'pausa_continuar_2.png');
        });
        continueButton.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            continueButton.setTexture('panelUI', 'pausa_continuar_1.png');
            this.scene.audioManager.resumeMusic();
            this.scene.currentScene.pauseGame();
            //this.scene.audioManager.buttonClick.play();
        });

        let optionsButton = this.scene.add.image(dim/2, dim/2, 'panelUI', 'pausa_opciones_1.png').setInteractive().setScale(.72);
        optionsButton.on('pointerdown', () => {
            
            optionsButton.setTexture('panelUI', 'pausa_opciones_2.png');
        });
        optionsButton.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            this.scene.audioManager.ui_click.play();
            optionsButton.setTexture('panelUI', 'pausa_opciones_1.png');
            //this.scene.audioManager.buttonClick.play();
            this.hidePause();
            this.showOptions();
        });

        let exitButton = this.scene.add.image(dim/2, dim/2+135, 'panelUI', 'pausa_salir_1.png').setInteractive().setScale(.72);
        exitButton.on('pointerdown', () => {
            exitButton.setTexture('panelUI', 'pausa_salir_2.png');
        });
        exitButton.on('pointerup', () => {
            exitButton.setTexture('panelUI', 'pausa_salir_1.png');
            this.scene.audioManager.ui_exit.play();
            //this.scene.audioManager.buttonExit.play();
            this.hidePause();
            this.scene.currentScene.backMenu();
        });

        this.pauseContainer = this.scene.add.container(0, 0, [pauseTitle, closeImage, continueButton, optionsButton, exitButton]);
        this.pauseContainer.setVisible(false).setDepth(10.1);
    }

    createFirstTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2-20, 310, 'TOCA LA PANTALLA, CLICK O BARRA ESPACIADORA\nTAN RÁPIDO COMO PUEDAS PARA AUMENTAR TU VELOCIDAD', { 
            font: '400 25px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#2C211F', 8).setLineSpacing(-5).setWordWrapWidth(this.panel.displayWidth);

        let image1 = this.scene.add.image(dim/2-235, 460, 'tutorialUI', 'run.png').setScale(.72);
        let image2 = this.scene.add.image(dim/2-30, 460, 'tutorialUI', 'tap.png').setScale(.72);
        let image3 = this.scene.add.image(dim/2+130, 460, 'tutorialUI', 'leftclick.png').setScale(.72);
        let image4 = this.scene.add.image(dim/2+295, 460, 'tutorialUI', 'spacebar.png').setScale(.72);
     
        let text2 = this.scene.add.text(dim/2-20, 650, 'ACELERA PARA QUE TU VELOCIDAD NO CAIGA EN LA ZONA\nROJA DE LA BARRA O TROPEZARÁS Y PERDERÁS\n¡LLEGA TAN LEJOS COMO PUEDAS!', { 
            font: '400 25px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#2C211F', 8).setLineSpacing(-5);

        let image5 = this.scene.add.image(dim/2, 760, 'tutorialUI', 'speedbar.png').setScale(.72);

        const textContainer1 = this.scene.add.container(0, 0, [text1, image1, image2, image3, image4, text2, image5]).setVisible(false);
        return textContainer1
    }

    createSecondTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2-20, 325, 'NO CHOQUES CON LOS OBSTÁCULOS O PERDERÁS UN CORAZÓN\nDESLIZA TU DEDO HACIA ARRIBA, PRESIONA EL BOTÓN DE SALTO\nO "ARRIBA" EN EL TECLADO PARA ESQUIVARLOS', { 
            font: '400 25px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#2C211F', 8).setLineSpacing(-5);

        let image1 = this.scene.add.image(dim/2-240, 490, 'tutorialUI', 'jumping.png').setScale(.72);
        let image2 = this.scene.add.image(dim/2+55, 485, 'tutorialUI', 'jumpbtn.png').setScale(.72);
        let image3 = this.scene.add.image(dim/2+240, 480, 'tutorialUI', 'upbtn.png').setScale(.72);
        
        let text2 = this.scene.add.text(dim/2-20, 645, 'APROVECHA LOS ZAPATOS TURBO PARA SUBIR TU VELOCIDAD\nO RECUPERA CORAZONES PARA NO PERDER', { 
            font: '400 25px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#2C211F', 8).setLineSpacing(-5);
        
        let image4 = this.scene.add.image(dim/2-130, 760, 'tutorialUI', 'pupturbo.png').setScale(.72);
        let image5 = this.scene.add.image(dim/2+125, 760, 'tutorialUI', 'pupheart.png').setScale(.72);

        const textContainer2 = this.scene.add.container(0, 0, [text1, image1, image2, image3, text2, image4, image5]).setVisible(false);
        return textContainer2
    }

    createInstructionsPanel(dim){      
        this.instructionIndex = 0;
        this.instructionTexts = [this.createFirstTutorialPage(dim), this.createSecondTutorialPage(dim)];

        let closeImage = this.scene.add.image(dim-110, 210, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideInstructions();
        });

        this.leftArrow = this.scene.add.image(dim/2-120, dim-200, 'panelUI', 'izq_1.png').setInteractive().setScale(.72);
        this.leftArrow.on('pointerdown', () => { this.leftArrow.setTexture('panelUI', 'izq_2.png') });
        this.leftArrow.on('pointerup', () => { this.leftArrow.setTexture('panelUI', 'izq_1.png'); this.leftArrowClicked(); this.scene.audioManager.page_click.play();});

        this.rightArrow = this.scene.add.image(dim/2+95, dim-200, 'panelUI', 'der_1.png').setInteractive().setScale(.72);
        this.rightArrow.on('pointerup', () => {this.rightArrowClicked(); this.scene.audioManager.page_click.play();});

        this.instructionsContainer = this.scene.add.container(0, 0, 
            [closeImage, this.instructionTexts[0], this.instructionTexts[1], this.leftArrow, this.rightArrow]);
        this.instructionsContainer.setVisible(false).setDepth(10.1);
    }

    createOptionsPanel(dim){
        let optionsTitle = this.scene.add.text(dim/2, 245, 'OPCIONES', { font: '400 55px Bungee', color: '#FFFFFF', align: 'center' });
        optionsTitle.setOrigin(0.5);

        let closeImage = this.scene.add.image(dim-120, 250, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideOptions();
        });

        let musicTitle = this.scene.add.text(dim/2-235, dim/2-110, 'Música', { 
            font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);

        let musicThumb = this.scene.add.sprite(0,dim/2-115,'panelUI','slider_thumb.png').setScale(.72);
        let musicVolume = this.scene.data.get('musicVolume');
        let musicSlider;
        musicSlider = this.scene.rexUI.add.slider({
            x: dim/2+140,
            y: dim/2-115,
            width: 440,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','slider.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','slider_relleno.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                //this.scene.audioManager.ui_click.play();
                this.scene.audioManager.menuMusic.volume = value;
                this.scene.audioManager.gameplayMusic.volume = value;
                this.scene.data.set('musicVolume', value);
                if(musicSlider != null) musicThumb.x = musicSlider.getElement('thumb').x+5;
            },

        }).layout().setScale(1,.72);
        musicSlider.value = musicVolume;

        let sfxTitle = this.scene.add.text(dim/2-235, dim/2, 'Sonido', { 
            font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        
        let sfxThumb = this.scene.add.sprite(0,dim/2,'panelUI','slider_thumb.png').setScale(.72);
        let sfxVolume = this.scene.data.get('sfxVolume');
        let sfxSlider;
        sfxSlider = this.scene.rexUI.add.slider({
            x: dim/2+140,
            y: dim/2,
            width: 440,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','slider.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','slider_relleno.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                //this.scene.audioManager.ui_click.play();
                this.scene.audioManager.updateSFXVolume(value);
                this.scene.data.set('sfxVolume', value);
                if(sfxSlider != null) sfxThumb.x = sfxSlider.getElement('thumb').x+5;
            },

        }).layout().setScale(1,.72);
        sfxSlider.value = sfxVolume;

        if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            musicTitle.y = dim/2-50;
            musicThumb.y = dim/2-55;
            musicSlider.y = dim/2-55;
            sfxTitle.y = dim/2+50;
            sfxThumb.y = dim/2+50;
            sfxSlider.y = dim/2+50;

            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb]);
        } else {
            let fullscreenTitle = this.scene.add.text(dim/2-70, dim/2+100, 'Pantalla completa', { 
                font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            
            let fullscreenToggleContainer = this.scene.add.image(dim/2+305, dim/2+105, 'panelUI', 'toggle.png').setInteractive();
            fullscreenToggleContainer.on('pointerdown', () => { this.toggle(this.fullscreenToggleBall, dim/2); this.scene.audioManager.ui_click.play();}).setScale(.72);
    
            this.fullscreenToggleBall = this.scene.add.image(dim/2+325, dim/2+105, 'panelUI', 'toggle_off.png').setScale(.72);
            this.setToggleFullscreen(this.scene.scale.isFullscreen, dim/2);
    
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb, fullscreenTitle, fullscreenToggleContainer, this.fullscreenToggleBall]);
        }
        
        this.optionsContainer.setVisible(false).setDepth(10.1);
    }

    createCreditsPanel(dim){
        let closeImage = this.scene.add.image(dim-190, 210, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            this.scene.audioManager.ui_click.play();
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideCredits();
        });

        let labels = []
        let previousChildCount = 0;
        for (let i = 0; i < this.credits.length; i++){
            let label, newH, fontSize, containerSize;
            if (i < 3) {
                newH = 330+150*i;
                fontSize = i != 2 ? '23px' : '17px'
                containerSize = i == 0 ? .72 : .8,
                label = this.addCreditsLabel(dim/2-180, newH, i, containerSize, fontSize);
            } else {
                if (i == 3) previousChildCount = 0;
                newH = 330+150*(i-3);
                fontSize = i != 5 ? '23px' : '17px'
                containerSize = i == 3 ? .78 : i == 4 ? .55 : .8,
                label = this.addCreditsLabel(dim/2+150, newH, i, containerSize, fontSize);
            }
            if (previousChildCount < label.list.length - 1) previousChildCount = label.list.length - 1;
            labels.push(label);
        }

        let logo = this.scene.add.image(dim/2-20, dim-305, 'leapLogo').setScale(.15);

        this.creditsContainer = this.scene.add.container(0, 0, [closeImage, logo]);
        for(let i = 0; i < labels.length; i++){ this.creditsContainer.add(labels[i]); }
        this.creditsContainer.setVisible(false).setDepth(10.1);
    }

    addCreditsLabel(x, y, index, containerSize, fontSize){
        let img = this.scene.add.image(x, y, 'panelUI', 'creditos_container.png').setScale(containerSize, .72);
        let title = this.scene.add.text(x, y, this.credits[index][0], {
            font: '400 23px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        title.setFontSize(fontSize);
        
        y+=35
        let names = [];
        for(let i = 1; i < this.credits[index].length; i++){
            let name = this.scene.add.text(x, y+20*i, this.credits[index][i], { 
                font: '400 18px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            name.setStroke('#2C211F', 9);
            names.push(name);
        }

        let labelContainer = this.scene.add.container(0, 0, [img, title]);
        for(let i = 0; i < names.length; i++){ labelContainer.add(names[i]); }
        labelContainer.setDepth(10);
        return labelContainer
    }

    createScorePanel(dim){
        let scoreImage = this.scene.add.image(dim/2-10, dim/2-120, 'panelUI', 'puntaje.png').setScale(.72);

        this.scoreText = this.scene.add.text(dim/2-10, dim/2-110, '10000000', { font: '400 40px Bungee', color: '#FBEAAF' });
        this.scoreText.setStroke('#2C211F', 5).setOrigin(.5);

        let timeLabel = this.scene.add.text(dim/2-220, dim/2+5, 'Tiempo:', { font: '400 38px Bungee', color: '#FFFFFF' });
        timeLabel.setStroke('#2C211F', 5);

        this.timeText = this.scene.add.text(dim/2+200, dim/2+50, '00:08:25', { font: '400 38px Bungee', color: '#FFFFFF' });
        this.timeText.setStroke('#2C211F', 5).setOrigin(1);
        
        let recordLabel = this.scene.add.text(dim/2-220, dim/2+85, 'Récord:', { font: '400 38px Bungee', color: '#FFFFFF' });
        recordLabel.setStroke('#2C211F', 5);

        this.recordText = this.scene.add.text(dim/2+210, dim/2+130, '10000000', { font: '400 38px Bungee', color: '#FBEAAF' });
        this.recordText.setStroke('#2C211F', 5).setOrigin(1);

        let restartButton = this.scene.add.image(dim/2-175, dim/2+320, 'panelUI', 'reiniciar_1.png').setInteractive();
        restartButton.setScale(.72);
        restartButton.on('pointerdown', () => { restartButton.setTexture('panelUI', 'reiniciar_2.png') });
        restartButton.on('pointerup', () => {
            restartButton.setTexture('panelUI', 'reiniciar_1.png');
            this.hideScore();
            //this.scene.audioManager.buttonPlay.play();
            this.scene.currentScene.restartGame();
        });

        let menuButton = this.scene.add.image(dim/2+230, dim/2+320, 'panelUI', 'salir_1.png').setInteractive();
        menuButton.setScale(.72);
        menuButton.on('pointerdown', () => { menuButton.setTexture('panelUI', 'salir_2.png') });
        menuButton.on('pointerup', () => {
            menuButton.setTexture('panelUI', 'salir_2.png');
            this.hideScore();
            //this.scene.audioManager.buttonExit.play();
            this.scene.currentScene.backMenu();
        });

        this.scoreContainer = this.scene.add.container(0, 0, 
            [scoreImage, this.scoreText, timeLabel, this.timeText, recordLabel, this.recordText, restartButton, menuButton]);
        this.scoreContainer.setVisible(false).setDepth(10.1);
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    toggle(target, center){
        let start = center+285
        let end = center+325
        if (target.x != start) {
            start = center+325
            end = center+285
        }
        let toggleTween = this.scene.tweens.add({
            targets: target,
            ease: 'sine.inout',
            duration: 250,
            repeat: 0,
            x: {
              getStart: () => start,
              getEnd: () => end
            },
            onComplete: () => {
                if (start == center+285){
                    target.setTexture('panelUI', 'toggle_on.png');
                    this.scene.scale.startFullscreen();
                } else {
                    target.setTexture('panelUI', 'toggle_off.png');
                    this.scene.scale.stopFullscreen();
                }
                toggleTween?.remove()
                toggleTween = null;
            }
        });
    }

    setToggleFullscreen(isFullscreen, center){
        if (!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            if (isFullscreen) this.fullscreenToggleBall.setTexture('panelUI', 'toggle_on.png').setPosition(center+325, this.fullscreenToggleBall.y);
            else this.fullscreenToggleBall.setTexture('panelUI', 'toggle_off.png').setPosition(center+285, this.fullscreenToggleBall.y);
        }
    }

    leftArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionIndex = this.instructionIndex - 1 >= 0 ? this.instructionIndex - 1 : 0;
        this.setInstructionsText();
    }

    rightArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        if (this.instructionIndex + 1 < this.instructionTexts.length) this.instructionIndex = this.instructionIndex + 1;
        else this.hideInstructions();
        this.setInstructionsText();
    }

    setInstructionsText(){
        for (let i = 0; i < this.instructionTexts.length; i++){
            this.instructionTexts[i].setVisible(false);
        }
        this.leftArrow.setVisible(this.instructionIndex != 0);
        if (this.instructionIndex != this.instructionTexts.length - 1) {
            this.rightArrow.setTexture('panelUI', 'der_1.png');
            this.rightArrow.on('pointerdown', () => { this.rightArrow.setTexture('panelUI', 'der_2.png'); });
        } else {
            this.rightArrow.setTexture('panelUI', 'x_1.png');
            this.rightArrow.on('pointerdown', () => { this.rightArrow.setTexture('panelUI', 'x_2.png'); });
        }

        this.instructionTexts[this.instructionIndex].setVisible(true);
    }

    showInstructions(callback){
        this.panel.setTexture('panelInstructions').setPosition(this.gameWidth/2, this.gameWidth/2-20);
        this.instructionIndex = 0;
        this.setInstructionsText();
        if (callback != null) this.hideInstructions.callback = callback;

        //this.scene.audioManager.pageOpen.play();
        this.instructionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideInstructions(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
        this.panel.setTexture('panel').setPosition(this.gameWidth/2, this.gameWidth/2);
        if (this.hideInstructions.callback) this.hideInstructions.callback();
    }

    showOptions(){
        this.panel.setTexture('panel');
        //this.scene.audioManager.pageOpen.play();
        this.optionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideOptions(){
        //this.scene.audioManager.buttonClick.play();
        this.optionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);

        if (this.scene.currentScene.scene.key === 'MainScene') this.showPause();
    }

    showCredits(){
        this.panel.setTexture('panelCredits');
        //this.scene.audioManager.pageOpen.play();
        this.creditsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideCredits(){
        //this.scene.audioManager.buttonClick.play();
        this.creditsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showPause(){
        this.panel.setTexture('panel');
        //this.scene.audioManager.pageOpen.play();
        this.pauseContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hidePause(){
        //this.scene.audioManager.buttonClick.play();
        this.pauseContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showScore(score, newHighScore, gameplayTime){
        this.panel.setTexture('panelScore').setPosition(this.gameWidth/2-10, this.gameWidth/2-20);
        this.scoreText.setText(score);
        this.recordText.setText(newHighScore);
        this.timeText.setText(this.secondsToString(gameplayTime));
        this.scoreContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideScore(){
        this.scoreContainer.setVisible(false);
        this.panelContainer.setVisible(false);
        this.panel.setTexture('panel').setPosition(this.gameWidth/2, this.gameWidth/2);
    }

    secondsToString(seconds) {
        const time = Math.floor(seconds)
        let hour = Math.floor(time / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        let minute = Math.floor((time / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        let second = time % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }
    */
}
