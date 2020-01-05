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

    // anim = {count: 8, src: 'sprites/claw_idle.png', w: 592, h: 116};

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
        this.loop(this.state.dt);
    }

    loop(dt: number) {
        setTimeout(this.loop.bind(this, dt), dt);
        this.game.onUpdate(~~(dt * 1.2));
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
