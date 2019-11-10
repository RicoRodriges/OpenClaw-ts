import SceneNode from "./scene/SceneNode";
import {ActionType} from "./enums/ActionType";
import EventData_Actor_Fire from "./events/EventData_Actor_Fire";
import EventMgr from "./events/EventMgr";
import EventData_Actor_Attack from "./events/EventData_Actor_Attack";
import EventData_Request_Change_Ammo_Type from "./events/EventData_Request_Change_Ammo_Type";
import EventData_Actor_Fire_Ended from "./events/EventData_Actor_Fire_Ended";
import EventData_Start_Climb from "./events/EventData_Start_Climb";
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
        if (e.altKey) {
            this.handleAction(ActionType.FIRE);
            return true;
        } else if (e.ctrlKey) {
            this.handleAction(ActionType.ATTACK);
            return true;
        } else if (e.shiftKey) {
            this.handleAction(ActionType.CHANGE_AMMO);
            return true;
        }

        if (e.key) {
            this.inputKeys.add(e.key);
        }

        return false;
    }

    onKeyUp(e: KeyboardEvent) {
        e.preventDefault();
        if (e.altKey) {
            this.handleAction(ActionType.FIRE_ENDED);
            return true;
        }

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

            let climbY = 0.0;

            if (this.inputKeys.has(ActorController.RIGHT)) {
                moveX += this.speed * msDiff;
            }
            if (this.inputKeys.has(ActorController.LEFT)) {
                moveX -= this.speed * msDiff;
            }

            // CLimbing
            if (this.inputKeys.has(ActorController.DOWN)) {
                climbY += 5.0;
            }
            if (this.inputKeys.has(ActorController.UP)) {
                climbY -= 5.0;
            }

            // Jumping
            if (this.inputKeys.has(ActorController.SPACE)) {
                moveY -= this.speed * msDiff;
            }


            if (Math.abs(climbY) > ActorController.EPSILON) {
                const event = new EventData_Start_Climb(actor.id, new Point(0, climbY));
                EventMgr.getInstance().VQueueEvent(event)
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
            const actorId = actor.id;
            switch (actionType) {
                case ActionType.FIRE: {
                    const event = new EventData_Actor_Fire(actorId);
                    EventMgr.getInstance().VQueueEvent(event);
                    break;
                }
                case ActionType.ATTACK: {
                    const event = new EventData_Actor_Attack(actorId);
                    EventMgr.getInstance().VQueueEvent(event);
                    break;
                }
                case ActionType.CHANGE_AMMO: {
                    const event = new EventData_Request_Change_Ammo_Type(actorId);
                    EventMgr.getInstance().VQueueEvent(event);
                    break;
                }
                case ActionType.FIRE_ENDED: {
                    const event = new EventData_Actor_Fire_Ended(actorId);
                    EventMgr.getInstance().VQueueEvent(event);
                    break;
                }
            }
        }
    }
}
