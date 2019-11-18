import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import {Direction} from "../../../enums/Direction";
import GamePhysics from "../../../GamePhysics";
import Actor from "../../Actor";
import Point from "../../../utils/Point";
import PositionComponent from "../PositionComponent";
import AnimationComponent, {AnimationObserver} from "../AnimationComponent";
import Animation from "../../../graphics/Animation";
import {ActorRenderComponent} from "../RenderComponent";
import Frame from "../../../graphics/Frame";
import EnemyAIComponent from "./EnemyAIComponent";
import CameraNode from "../../../scene/CameraNode";
import {Sounds} from "../../../enums/Sounds";

export default class PatrolEnemyAIStateComponent extends EnemyAIStateComponent implements AnimationObserver {
    public static NAME = 'PatrolEnemyAIStateComponent';

    direction = Direction.Direction_Left;
    isWalking = true;
    physics: GamePhysics;
    positionComponent: PositionComponent;
    animationComponent: AnimationComponent;
    renderComponent: ActorRenderComponent;
    enemyAIComponent: EnemyAIComponent;
    leftBorder: number;
    rightBorder: number;
    speed: number;
    idle: Animation;
    run: Animation;
    camera: CameraNode;
    idleSounds: Sounds[];

    constructor(owner: Actor, physics: GamePhysics, positionComponent: PositionComponent, animationComponent: AnimationComponent,
                renderComponent: ActorRenderComponent, enemyAIComponent: EnemyAIComponent, speed: number,
                leftBorder: number, rightBorder: number, idle: Animation, run: Animation, camera: CameraNode,
                idleSounds: Sounds[] = [], private idleSpeechChance = 0.5, private idleSpeechRadius = 600) {
        super(owner, false, 0);
        this.physics = physics;
        this.positionComponent = positionComponent;
        this.animationComponent = animationComponent;
        this.renderComponent = renderComponent;
        this.enemyAIComponent = enemyAIComponent;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.idle = idle;
        this.run = run;
        this.speed = Math.abs(speed);
        this.camera = camera;
        this.idleSounds = idleSounds;
        animationComponent.animationObservers.push(this);
        enemyAIComponent.states.push(this);
    }

    VUpdate(diff: number) {
        if (!this.isActive) {
            return;
        }

        if (this.isWalking) {
            if (Math.abs(this.physics.VGetVelocity(this.owner).x) < 0.1) {
                this.CommenceIdleBehaviour();
            } else if ((this.positionComponent.position.x <= this.leftBorder && this.direction === Direction.Direction_Left) ||
                (this.positionComponent.position.x >= this.rightBorder && this.direction === Direction.Direction_Right)) {
                this.CommenceIdleBehaviour();
            }
        }
    }

    VCanEnter() {
        return true;
    }

    VGetStateType() {
        return EnemyAIState.EnemyAIState_Patrolling;
    }

    VOnStateEnter(pPreviousState: EnemyAIStateComponent) {
        this.isActive = true;
        this.ChangeDirection(this.direction);
    }

    VOnStateLeave(pNextState: EnemyAIStateComponent) {
        this.isActive = false;
        this.physics.VSetLinearSpeed(this.owner, new Point(0, 0));
    }

    private ChangeDirection(direction: Direction) {
        this.direction = direction;
        this.renderComponent.mirror = direction === Direction.Direction_Right;
        this.isWalking = true;
        this.animationComponent.setAnimation(this.run);

        if (direction === Direction.Direction_Left) {
            this.physics.VSetLinearSpeed(this.owner, new Point(-1.0 * this.speed, 0.0));
        } else {
            this.physics.VSetLinearSpeed(this.owner, new Point(this.speed, 0.0));
        }
    }

    private CommenceIdleBehaviour() {
        if (this.isWalking) {
            this.isWalking = false;
            this.animationComponent.setAnimation(this.idle);
            this.physics.VSetLinearSpeed(this.owner, new Point(0, 0));

            if (this.camera && this.idleSounds.length > 0) {
                if (Math.abs(this.positionComponent.position.x - (this.camera.x + this.camera.w / 2)) < this.idleSpeechRadius &&
                    Math.abs(this.positionComponent.position.y - (this.camera.y + this.camera.h / 2)) < this.idleSpeechRadius)
                    this.enemyAIComponent.TryPlaySpeechSound(this.idleSpeechChance, this.idleSounds);
            }
        }
    }

    private ToOppositeDirection(direction: Direction) {
        return direction === Direction.Direction_Left ? Direction.Direction_Right : Direction.Direction_Left;
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
    }

    VOnAnimationLooped(animation: Animation) {
        if (!this.isActive) {
            return;
        }
        if (!this.isWalking) {
            this.ChangeDirection(this.ToOppositeDirection(this.direction));
        }
    }

    getName() {
        return PatrolEnemyAIStateComponent.NAME;
    }
}
