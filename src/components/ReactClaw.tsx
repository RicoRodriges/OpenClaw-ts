import React from "react";
import GameApp from "../game/GameApp";
import ResourceMgr from "../game/ResourceMgr";

export default class ReactClaw extends React.Component {
    maxFps = 60;
    game = new GameApp();
    state = {dt: ~~(1000 / this.maxFps)};

    static defaultProps = {
        w: 800,
        h: 640
    };

    constructor(props: Readonly<{ w: number, h: number }>) {
        super(props);
    }

    componentDidMount() {
        const width = (this.props as any).w;
        const height = (this.props as any).h;
        const canvas = document.getElementById('clawGame') as HTMLCanvasElement;
        const resource = ResourceMgr.getInstance();

        resource.context = canvas.getContext('2d');
        resource.canvasWidth = width;
        resource.canvasHeight = height;
        this.game.loadGame(width, height);

        this.loop();
    }

    loop() {
        window.requestAnimationFrame(this.loop.bind(this));
        this.game.onUpdate(1000 / 60);
        //this.setState({dt: dt});
    }

    render() {
        return (
            <canvas id="clawGame"
                    width={(this.props as any).w}
                    height={(this.props as any).h}
                    style={{border: '1px solid black'}}>
                Oooops
            </canvas>
        );
    }
}
