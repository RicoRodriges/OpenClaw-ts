import React from "react";
import Rect from "../game/utils/Rect";

export default class SvgSpriteDefinitionComponent extends React.Component<{ sprites: SpriteDefinition[] }> {

    constructor(props: Readonly<{ sprites: SpriteDefinition[] }>) {
        super(props);
    }

    shouldComponentUpdate(nextProps: any, nextState: any, context: any) {
        return false;
    }

    render() {
        return (
            <defs>
                {
                    (this.props as { sprites: SpriteDefinition[] }).sprites.map((d) => {
                        return (
                            <pattern key={d.id}
                                     id={d.id}
                                     x="0"
                                     y="0"
                                     width={d.rect.w}
                                     height={d.rect.h}
                                     patternUnits="objectBoundingBox">
                                <image x={-d.rect.x}
                                       y={-d.rect.y}
                                       width={d.srcWidth}
                                       height={d.srcHeight}
                                       href={d.src}/>
                            </pattern>
                        );
                    })
                }
            </defs>
        )
    }
}

export interface SpriteDefinition {
    id: string;
    rect: Rect;
    srcWidth: number;
    srcHeight: number;
    src: string;
}
