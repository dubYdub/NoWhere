/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameRuleInfo() {
    //this.kUIButton = "assets/UI/button.png";
    this.kLogo = "assets/test.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mLogo = null;
    this.mMsg = null;
    this.mMsg = null;
    this.msg = "";
}

gEngine.Core.inheritPrototype(GameRuleInfo, Scene);

GameRuleInfo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kLogo);
    
};

GameRuleInfo.prototype.unloadScene = function () {
//    gEngine.Textures.unloadTexture(this.kLogo);
    gEngine.Core.startScene(new StartUI());
};


GameRuleInfo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
//  
//    // logo2
    this.mLogo = new TextureRenderable(this.kLogo);
    this.mLogo.getXform().setPosition(50,40);
    this.mLogo.getXform().setSize(100,100);
    
//    // the message on the screen
//    this.mMsg = new FontRenderable("@404");
//    this.mMsg.setColor([0,0,0,1]);
//    this.mMsg.getXform().setPosition(80, 1);
//    this.mMsg.setTextHeight(4);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, -5  );
    this.mMsg.setTextHeight(3);
        
};

GameRuleInfo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0.8, 0.6, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();
    this.mLogo.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);

};

// this function will judge if the mouse clicks in the area of buttons.
GameRuleInfo.prototype.updateButton = function(posX, posY, radius) {
    var mouseX = gEngine.Input.getMousePosX();
    var mouseY = gEngine.Input.getMousePosY();
    
    var distance = (mouseX-posX)*(mouseX-posX) + (mouseY-posY)*(mouseY-posY);   
    if (radius*radius > distance) {
        return 1;
    }

}

GameRuleInfo.prototype.update = function () {
       
    var msg = "";
    
    this.mCamera.update();  // for smoother camera movements
           
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        msg += "[L Down]"; 
        if (this.updateButton(300, 84, 80) == 1) {
            gEngine.GameLoop.stop();   
        }
    }
   
    msg += " X=" + gEngine.Input.getMousePosX() + " Y=" + gEngine.Input.getMousePosY();
    this.mMsg.setText(msg);
};
