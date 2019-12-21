import SceneNode from "./scene/SceneNode";
import {ActionType} from "./enums/ActionType";
import EventMgr from "./events/EventMgr";
import EventData_Actor_Attack from "./events/EventData_Actor_Attack";
import Point from "./utils/Point";
import EventData_Actor_Start_Move from "./events/EventData_Actor_Start_Move";

export default class ActorController {
    private static readonly UP = 'ArrowUp';
    private static readonly DOWN = 'ArrowDown';
    private static readonly LEFT = 'ArrowLeft';
    private static readonly RIGHT = 'ArrowRight';
    private static readonly SPACE = ' ';
    private static readonly EPSILON = 0.0001;

    inputKeys: Set<string>;

    constructor(private controlledObject: SceneNode, private speed: number = .36) {
        this.inputKeys = new Set<string>();
    }

    onKeyDown(e: KeyboardEvent) {
        e.preventDefault();
        if (e.ctrlKey) {
            this.handleAction(ActionType.ATTACK);
            return true;
        }

        if (e.key) {
            this.inputKeys.add(e.key);
        }

        return false;
    }

    onKeyUp(e: KeyboardEvent) {
        e.preventDefault();

        if (e.key) {
            this.inputKeys.delete(e.key);
        }

        return false;
    }

    onUpdate(msDiff: number) {
        const actor = this.controlledObject.properties.actor;
        if (actor) {
            let moveX = 0.0;
            let moveY = 0.0;

            if (this.inputKeys.has(ActorController.RIGHT)) {
                moveX += this.speed * msDiff;
            }
            if (this.inputKeys.has(ActorController.LEFT)) {
                moveX -= this.speed * msDiff;
            }

            // Jumping
            if (this.inputKeys.has(ActorController.SPACE)) {
                moveY -= this.speed * msDiff;
            }

            if (Math.abs(moveX) > ActorController.EPSILON || Math.abs(moveY) > ActorController.EPSILON) {
                const event = new EventData_Actor_Start_Move(actor, new Point(moveX, moveY));
                EventMgr.getInstance().VQueueEvent(event)
            }
        }
    }

    handleAction(actionType: ActionType) {
        const actor = this.controlledObject.properties.actor;
        if (actor) {
            if (actionType === ActionType.ATTACK) {
                EventMgr.getInstance().VQueueEvent(new EventData_Actor_Attack(actor));
            }
        }
    }
}
