import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Point from "../../utils/Point";
import {Direction} from "../../enums/Direction";
import GamePhysics, {ActorBodyDef} from "../../GamePhysics";
import PositionComponent from "./PositionComponent";

export default class PhysicsComponent extends ActorComponent {
    static NAME = 'PhysicsComponent';

    canClimb = false;
    canBounce = false;
    canJump = false;
    maxJumpHeight = 0;
    gravityScale = 0;
    friction = 0;
    density = 0;

    bodySize = new Point(0, 0);
    numFootContacts = 0;

    isClimbing = false;
    isStopped = false;
    isRunning = false;
    direction = Direction.Direction_Right;

    isFalling = false;
    isJumping = false;
    heightInAir = 20;

    fallHeight = 0;

    hasConstantSpeed = false;
    constantSpeed = new Point(0, 0);

    currentSpeed = new Point(0, 0);
    externalSourceSpeed?: Point;
    externalConveyorBeltSpeed?: Point;

    climbingSpeed = new Point(0, 0);

    // Hackerino to prevent loop jumping with space pressed
    ignoreJump = false;

    // controllableComponent?: ClawControllableComponent;

    physics: GamePhysics;

    doNothingTimeout = 0;

    // Actor body definition for physics body creation
    actorBodyDef = new ActorBodyDef();
    clampToGround = false;

    // Spring caused us to go up
    isForcedUp = false;
    forcedUpHeight = 0;

    topLadderB2Contact: any = null;
    movingPlatformB2Contact: any = null;

    overlappingKinematicBodiesList: any[] = [];
    overlappingLaddersList: any[] = [];
    overlappingGroundsList: any[] = [];

    constructor(public owner: Actor, canClimb: boolean, canBounce: boolean, canJump: boolean, maxJumpHeight: number,
                width: number, height: number, gravityScale: number, friction: number, density: number,
                physics: GamePhysics) {
        super(owner);
        this.canClimb = canClimb;
        this.canBounce = canBounce;
        this.canJump = canClimb;
        this.maxJumpHeight = maxJumpHeight;
        //XML_ADD_2_PARAM_ELEMENT("CollisionSize", "width", width, "height", height, elem);
        this.actorBodyDef.size.x = width;
        this.bodySize.x = width;
        this.actorBodyDef.size.y = height;
        this.bodySize.y = height;
        this.gravityScale = gravityScale;
        this.actorBodyDef.gravityScale = gravityScale;
        this.friction = friction;
        this.density = density;
        this.physics = physics;
        this.actorBodyDef.density = density;
        this.actorBodyDef.friction = friction;
        const posComp = owner.getComponent(PositionComponent.NAME) as PositionComponent;
        this.actorBodyDef.position.x = posComp.position.x;
        this.actorBodyDef.position.y = posComp.position.y;
        this.actorBodyDef.actor = owner;
        physics.VAddActorBody(this.actorBodyDef);
    }

    VUpdate(diff: number) {
        super.VUpdate(diff);
        // if (Math.abs(this.currentSpeed.x) > 0.0001 || Math.abs(this.currentSpeed.y) > 0.0001) {
        const speed = this.physics.VGetVelocity(this.owner);
        if (speed.y > 0.001) {
            this.currentSpeed.y = 8.8;
        }
        this.physics.VSetLinearSpeed(this.owner, this.currentSpeed);
        this.currentSpeed = new Point(0,0);
        // }
    }

    getName(): string {
        return PhysicsComponent.NAME;
    }

    SetCurrentSpeed(move: Point) {
        this.currentSpeed = move;
    }
}
