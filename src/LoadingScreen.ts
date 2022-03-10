import { Container, Graphics, Loader } from "pixi.js";
import { assets } from "./assets";

export class LoaderScene extends Container{

    //make loader graphics
    private loaderBar: Container;
    private loaderBarBorder: Graphics;
    private loaderBarFill: Graphics;

    constructor(){
        super();
        //loader graphics
        const loaderBarWidth = screen.width*0.8;
        //loader filler
        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1)
        .drawRect(0,0, loaderBarWidth, 50)
        .endFill()
        .scale.x = 0;

        this.loaderBarBorder = new Graphics();
        this.loaderBarBorder.lineStyle(10,0x0, 1)
        .drawRect(0,0, loaderBarWidth, 50);

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill, this.loaderBarBorder);
        this.loaderBar.position.set((screen.width - this.loaderBar.width)/2, (screen.height - this.loaderBar.height)/2);
        this.addChild(this.loaderBar);

        Loader.shared.add(assets);

        Loader.shared.load();
    }
    // private gameLoaded(): void {
    //     Manager.changeScene(new GameScene());
    // }
}