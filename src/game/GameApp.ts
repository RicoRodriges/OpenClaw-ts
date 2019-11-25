import GameLogic from "./GameLogic";
import EventMgr from "./events/EventMgr";
import GameProperties from "./GameProperties";
import ResourceMgr from "./ResourceMgr";
import Box2D from "../Box2DWrapper"
import ScreenElementScene from "./user-interface/ScreenElementScene";
import GamePhysics from "./GamePhysics";

export default class GameApp {
    gameLogic = new GameLogic();

    loadGame(w: number, h: number) {
        this.gameLogic.VLoadGame(w, h);
    }

    onUpdate(diff: number) {
        // Read keyboard events
        // Call this.gameLogic.gameView.onKey*(event)

        // Update game
        EventMgr.getInstance().VOnUpdate(30);
        this.gameLogic.VOnUpdate(diff);

        // Render game
        if (this.gameLogic.gameView) {
            this.gameLogic.gameView.VOnRender(diff);
        }

        // Render debug info
        if (GameProperties.debug) {
            if (this.gameLogic.gamePhysics && this.gameLogic.gameView && this.gameLogic.gamePhysics.world &&
                this.gameLogic.gameView.screenElements.length > 0) {
                const scene = this.gameLogic.gameView.screenElements[0] as ScreenElementScene;
                const camera = scene.camera;
                const resources = ResourceMgr.getInstance();
                const k = GamePhysics.METERS_TO_PIXELS;
                if (camera && resources.context) {
                    const world = this.gameLogic.gamePhysics.world;
                    const t = new Box2D.b2Transform();
                    const shapeAABB = new Box2D.b2AABB();
                    let bodies = world.GetBodyList();
                    while (Box2D.getPointer(bodies)) {
                        let F = bodies.GetFixtureList();
                        while (Box2D.getPointer(F)) {
                            switch (F.GetType()) {
                                case 0://b2Shape::e_circle:
                                {
                                    const circle = F.GetShape();
                                    const childCount = circle.GetChildCount();
                                    for (let child = 0; child < childCount; ++child) {
                                        t.SetIdentity();
                                        const lb = shapeAABB.get_lowerBound();
                                        const ub = shapeAABB.get_upperBound();
                                        circle.ComputeAABB(Box2D.getPointer(shapeAABB), t, child);

                                        resources.context.beginPath();
                                        resources.context.rect(
                                            (bodies.GetPosition().get_x() + lb.get_x()) * k - camera.x,
                                            (bodies.GetPosition().get_y() + lb.get_y()) * k - camera.y,
                                            Math.abs(lb.get_x() - ub.get_x()) * k,
                                            Math.abs(lb.get_y() - ub.get_y()) * k);
                                        resources.context.stroke();
                                    }
                                }
                                    break;
                                case 2://b2Shape::e_polygon:
                                {
                                    const poly = F.GetShape();
                                    const childCount = poly.GetChildCount();
                                    for (let child = 0; child < childCount; ++child) {
                                        t.SetIdentity();
                                        const lb = shapeAABB.get_lowerBound();
                                        const ub = shapeAABB.get_upperBound();
                                        poly.ComputeAABB(Box2D.getPointer(shapeAABB), t, child);

                                        resources.context.beginPath();
                                        resources.context.rect(
                                            (bodies.GetPosition().get_x() + lb.get_x()) * k - camera.x,
                                            (bodies.GetPosition().get_y() + lb.get_y()) * k - camera.y,
                                            Math.abs(lb.get_x() - ub.get_x()) * k,
                                            Math.abs(lb.get_y() - ub.get_y()) * k);
                                        resources.context.stroke();
                                    }
                                }
                                    break;
                                default:
                                    console.log('Undefined shape type');
                            }
                            F = F.GetNext();
                        }

                        bodies = bodies.GetNext();
                    }
                    Box2D.destroy(shapeAABB);
                    Box2D.destroy(t);
                    //GameProperties.debug = false;
                }
            }
        }
        //debugger;
    }
}
