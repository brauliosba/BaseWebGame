export class GameplayUI
{
    constructor(scene, gameWidth){
        this.scene = scene
        this.gameWidth = gameWidth
    }

    create(){
        //Image UI
        
        //Text UI
        this.scoreText = this.scene.add.text(this.gameWidth/2, 40, '0', { fontFamily: 'Montserrat', fontSize: 45, color: '#FFFBE7' });
        this.scoreText.setDepth(8).setOrigin(.5);

        /*
        //Feedback UI
        this.bombMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_bomb.png').setScale(.72).setDepth(8).setVisible(false);
        this.chopsticksMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_palillos.png').setScale(.72).setDepth(8).setVisible(false);
        this.feedbackScoreDict = {};
        */
    }

    updateScore(){
        this.scoreText.setText(this.scene.score);
    }

    showMessage(x, y){
        this.bombMessage.setPosition(x, y - 100);
        this.feedbackFadeAnim(this.bombMessage);
    }

    feedbackFadeAnim(target, key){
        target.setVisible(true);
        let feedbackTween = this.scene.tweens.add({
            targets: target,
            ease: 'sine.inout',
            duration: 1000,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            },
            onComplete: () => {
                if (key == null ) target.setVisible(false);
                else {
                    this.feedbackScoreDict[key].setVisible(false)
                    this.feedbackScoreDict[key].destroy();
                    this.feedbackScoreDict[key] = null;
                    delete this.feedbackScoreDict[key];
                }
                target.setAlpha(1);
                feedbackTween?.remove();
                feedbackTween = null;
            }
        });
    }
}