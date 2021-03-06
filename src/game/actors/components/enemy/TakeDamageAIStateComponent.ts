import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import Actor from "../../Actor";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import Animation from "../../../graphics/Animation";
import AnimationComponent, {AnimationObserver} from "../AnimationComponent";
import Frame from "../../../graphics/Frame";
import EnemyAIComponent from "./EnemyAIComponent";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Play_Sound from "../../../events/EventData_Request_Play_Sound";
import {popRandomItem} from "../../../utils/Util";

export default class TakeDamageAIStateComponent extends EnemyAIStateComponent implements AnimationObserver {
    public static NAME = 'TakeDamageAIStateComponent';

    anims: Animation[] = [];
    sounds: Sounds[] = [];
    animationComponent: AnimationComponent;
    enemyAIComponent: EnemyAIComponent;

    constructor(owner: Actor, anims: Animation[], sounds: Sounds[], animationComponent: AnimationComponent,
                enemyAIComponent: EnemyAIComponent) {
        super(owner, false, 100);
        this.anims = anims;
        this.sounds = sounds;
        this.animationComponent = animationComponent;
        this.enemyAIComponent = enemyAIComponent;
        animationComponent.animationObservers.push(this);
        enemyAIComponent.states.push(this);
    }

    // EnemyAIComponent call it manually
    VCanEnter(): boolean {
        return false;
    }

    VGetStateType() {
        return EnemyAIState.EnemyAIState_TakingDamage;
    }

    VOnStateEnter(pPreviousState: EnemyAIStateComponent) {
        if (this.anims.length === 0) {
            console.warn('Take damage component has to have animations');
            this.enemyAIComponent.EnterBestState(true);
            return;
        }
        this.isActive = true;

        const anim = popRandomItem(this.anims);
        if (anim !== null) {
            this.animationComponent.setAnimation(anim);
        }

        const sound = popRandomItem(this.sounds);
        if (sound) {
            EventMgr.getInstance().VQueueEvent(new EventData_Request_Play_Sound(sound));
        }
    }

    VOnStateLeave(pNextState: EnemyAIStateComponent) {
        this.isActive = false;
    }

    VOnAnimationLooped(animation: Animation) {
        if (!this.isActive) {
            return;
        }
        this.enemyAIComponent.EnterBestState(true);
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
    }

    getName() {
        return TakeDamageAIStateComponent.NAME;
    }
}
