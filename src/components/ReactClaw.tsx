import React from "react";
import GameApp from "../game/GameApp";

export default class ReactClaw extends React.Component {
    maxFps = 10;
    game = new GameApp();
    state = {dt: 1000 / this.maxFps};

    static defaultProps = {
        w: 600,
        h: 610
    };

    // anim = {count: 8, src: 'sprites/claw_idle.png', w: 592, h: 116};

    constructor(props: Readonly<{w: number, h: number}>) {
        super(props);
        this.game.loadGame(props.w, props.h);
    }

    componentDidMount() {
        this.loop(this.state.dt);
    }

    loop(dt: number) {
        setTimeout(() => this.loop(dt), dt);
        this.game.onUpdate(dt);
        this.setState({dt: dt});
    }

    render() {
        return (
            <svg width={(this.props as any).w}
                 height={(this.props as any).h}
                 style={{border: '1px solid black'}}>
                {
                    this.game.onRender(this.state.dt)
                }
            </svg>
        );
    }
}
