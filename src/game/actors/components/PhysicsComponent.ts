import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Point from "../../utils/Point";
import {Direction} from "../../enums/Direction";
import GamePhysics, {ActorBodyDef} from "../../GamePhysics";
import PositionComponent from "./PositionComponent";
import gameProperties from "../../GameProperties";
import ClawControllableComponent from "./ClawControllableComponent";
import {FixtureType} from "../../enums/FixtureType";
import {CollisionFlag} from "../../enums/CollisionFlag";
import {BodyType} from "../../enums/BodyType";

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

    hasConstantSpeed?: boolean;
    constantSpeed?: Point;

    currentSpeed = new Point(0, 0);
    externalSourceSpeed?: Point;
    externalConveyorBeltSpeed?: Point;

    climbingSpeed = new Point(0, 0);

    // Hackerino to prevent loop jumping with space pressed
    ignoreJump = false;

    controllableComponent: ClawControllableComponent | null;

    physics: GamePhysics;

    doNothingTimeout = 0;

    // Actor body definition for physics body creation
    actorBodyDef = new ActorBodyDef();
    clampToGround?: boolean;

    // Spring caused us to go up
    isForcedUp = false;
    forcedUpHeight = 0;

    topLadderB2Contact?: any;
    movingPlatformB2Contact?: any;

    overlappingKinematicBodiesList: any[] = [];
    overlappingLaddersList?: any[];
    overlappingGroundsList?: any[];

    constructor(public owner: Actor, canClimb: boolean, canBounce: boolean, canJump: boolean, maxJumpHeight: number,
                width: number, height: number, gravityScale: number, friction: number, density: number,
                physics: GamePhysics, fixtureType: FixtureType, controllableComponent: ClawControllableComponent | null = null, createFootSensor = false, makeCapsule = false,
                collisionFlag = CollisionFlag.CollisionFlag_All, collisionMask = 0xFFFF, bodyType = BodyType.DYNAMIC, makeSensor = false) {
        super(owner);
        this.canClimb = canClimb;
        this.canBounce = canBounce;
        this.canJump = canClimb;
        this.maxJumpHeight = maxJumpHeight;
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
        this.actorBodyDef.addFootSensor = createFootSensor;
        this.actorBodyDef.makeCapsule = makeCapsule;
        const posComp = owner.getComponent(PositionComponent.NAME) as PositionComponent;
        this.actorBodyDef.position.x = posComp.position.x;
        this.actorBodyDef.position.y = posComp.position.y;
        this.actorBodyDef.actor = owner;
        this.actorBodyDef.fixtureType = fixtureType;
        this.actorBodyDef.collisionFlag = collisionFlag;
        this.actorBodyDef.collisionMask = collisionMask;
        this.actorBodyDef.bodyType = bodyType;
        this.actorBodyDef.makeSensor = makeSensor;
        physics.VAddActorBody(this.actorBodyDef);
        this.controllableComponent = controllableComponent;
    }

    VUpdate(diff: number) {
        // Just move this to ClawControllerComponent update......................
        if (!this.controllableComponent) {
            return;
        }

        this.doNothingTimeout -= diff;
        if (this.doNothingTimeout > 0) {
            this.SetVelocity(new Point(0, 0));
            this.physics.VSetGravityScale(this.owner, 0);
            this.currentSpeed.SetZero();
            return;
        }

        if (!this.isJumping) {
            this.maxJumpHeight = this.controllableComponent.GetMaxJumpHeight();
        }

        if (this.isForcedUp) {
            if (this.isFalling) {
                this.isForcedUp = false;
                this.forcedUpHeight = 0;
                this.maxJumpHeight = gameProperties.player.maxJumpHeight;
            } else {
                this.maxJumpHeight = this.forcedUpHeight;
                this.currentSpeed.y = -10;
            }
        }


        if (this.overlappingKinematicBodiesList.length === 0 && this.externalSourceSpeed) {
            this.externalSourceSpeed.SetZero();
        }

        if (this.controllableComponent && !this.controllableComponent.InPhysicsCapableState()) {
            this.SetVelocity(new Point(0, 0));
            this.currentSpeed.SetZero();
            this.climbingSpeed.SetZero();
            this.isClimbing = false;

            return;
        }

        if (this.controllableComponent && !this.controllableComponent.CanMove()) {
            if (Math.abs(this.currentSpeed.x) > 0.01) {
                this.SetDirection(this.currentSpeed.x < 0 ? Direction.Direction_Left : Direction.Direction_Right);
            }

            const currSpeed = this.getVelocity();
            this.SetVelocity(new Point(0, currSpeed.y));

            this.currentSpeed.SetZero();
            this.climbingSpeed.SetZero();

            return;
        }

        // This should be available only to controlled actors
        if (this.canJump) {
            // "20" lets us skip uneven ground and therefore skip spamming transition between falling/jumping
            if (this.heightInAir > 20 && Math.abs(this.getVelocity().y) < 0.01) {
                this.ignoreJump = true;
                this.currentSpeed.y = 0;
            } else if (Math.abs(this.currentSpeed.y) < 0.01 && (this.getVelocity().y < 0.01) && this.IsInAir()) {
                this.ignoreJump = true;
                this.currentSpeed.y = 0;
            } else if (this.ignoreJump && Math.abs(this.currentSpeed.y) < 0.01 && this.numFootContacts > 0) {
                this.ignoreJump = false;
            } else if (this.ignoreJump) {
                this.currentSpeed.y = 0;
            } else if (this.isFalling && this.numFootContacts === 0) {
                this.ignoreJump = true;
                this.currentSpeed.y = 0;
            }
            if (this.heightInAir > this.maxJumpHeight) {
                this.ignoreJump = true;
                this.currentSpeed.y = 0;
            }

            //=====================================================================
            // Set velocity here
            //=====================================================================
            let velocity = this.getVelocity();

            const ySpeed = this.currentSpeed.y;
            if (ySpeed < 0) {
                this.SetVelocity(new Point(velocity.x, -8.8));

            } else if (velocity.y < -2 && ySpeed >= 0) {
                this.SetVelocity(new Point(velocity.x, -2));
            }
            velocity = this.getVelocity();

            if (Math.abs(this.currentSpeed.x) > 0.01) {
                const runSpeed = gameProperties.player.runSpeed;
                this.SetVelocity(new Point(this.currentSpeed.x < 0 ? -1.0 * runSpeed : runSpeed, velocity.y));
            } else {
                this.SetVelocity(new Point(0, velocity.y));
            }

            let applyForce = true;
            const disableGravity = false;
            const gravity = this.physics.GetGravity();
            velocity = this.getVelocity();

            const maxJumpSpeed = -1.0 * Math.abs(gameProperties.player.maxJumpSpeed);
            const maxFallSpeed = Math.abs(gameProperties.player.maxFallSpeed);

            if (velocity.y < maxJumpSpeed) {
                this.SetVelocity(new Point(velocity.x, maxJumpSpeed));
                applyForce = false;
            }
            if (velocity.y > maxFallSpeed) {
                this.SetVelocity(new Point(velocity.x, maxFallSpeed));
                applyForce = false;
            }
            if (applyForce) {
                this.physics.VSetGravityScale(this.owner, this.gravityScale);
            } else {
                this.physics.VSetGravityScale(this.owner, 0);
            }

            if (this.isForcedUp) {
                velocity = this.getVelocity();

                const springSpeed = -1.0 * Math.abs(gameProperties.player.springBoardSpringSpeed);
                this.SetVelocity(new Point(velocity.x, springSpeed));
            }

            //=====================================================================

            if (this.isJumping || this.isFalling) {
                this.isRunning = false;
                this.isStopped = false;
            }

            const wasRunning = this.isRunning;
            const wasStopped = this.isStopped;
            const prevDirection = this.direction;
            let currDirection = this.direction;

            velocity = this.getVelocity();
            if (Math.abs(velocity.x) > 0.01) {
                currDirection = velocity.x < 0 ? Direction.Direction_Left : Direction.Direction_Right;
                if (!this.IsInAir() && this.IsOnGround()) {
                    this.isRunning = true;
                    this.isStopped = false;
                }
            } else {
                if (!this.IsInAir() && this.IsOnGround()) {
                    this.isStopped = true;
                    this.isRunning = false;
                }
            }

            if (this.controllableComponent) {
                if (prevDirection !== currDirection) {
                    this.SetDirection(currDirection);
                }
                if (this.isRunning && this.IsOnGround()) // TODO: Dont poll here. State changing didnt work.
                {
                    this.controllableComponent.VOnRun();
                } else if (this.isStopped &&
                    (((Math.abs(this.getVelocity().y) < 0.01) && (Math.abs(this.getVelocity().x) < 0.01)) || this.overlappingKinematicBodiesList.length > 0) &&
                    this.IsOnGround()) {
                    this.controllableComponent.VOnStopMoving();
                }
            }

        }

        this.currentSpeed.SetZero();
    }

    getName(): string {
        return PhysicsComponent.NAME;
    }

    SetCurrentSpeed(move: Point) {
        this.currentSpeed = move;
    }

    private SetVelocity(velocity: Point) {
        this.physics.VSetLinearSpeed(this.owner, velocity);
    }

    private SetDirection(newDirection: Direction) {
        if (this.direction === newDirection) {
            return;
        }

        if (this.controllableComponent && this.controllableComponent.VOnDirectionChange(newDirection)) {
            this.direction = newDirection;
        }
    }

    private getVelocity() {
        return this.physics.VGetVelocity(this.owner);
    }

    private IsInAir() {
        return this.isFalling || this.isJumping;
    }

    IsOnGround() {
        return this.numFootContacts > 0;
    }

    setFalling(falling: boolean) {
        if (this.doNothingTimeout > 0) {
            return;
        }

        if (falling) {
            if (this.heightInAir < 5 && (this.getVelocity().y < 5)) {
                return;
            } else {
                this.isFalling = true;
            }
        } else {
            this.isFalling = false;
        }
    }

    setJumping(jumping: boolean) {
        if (this.doNothingTimeout > 0) {
            return;
        }

        if (jumping) {
            if (this.heightInAir < 2) {
                return;
            } else {
                this.isJumping = true;
            }
        } else {
            this.isJumping = false;
        }
    }

    SetForceFall() {
        this.isRunning = false;
        this.isForcedUp = false;
        this.isStopped = false;
        this.isFalling = true;
        this.isJumping = false;
        this.heightInAir = 0;
        this.ignoreJump = true;
        this.SetVelocity(new Point(this.getVelocity().x, 0));
        if (this.controllableComponent) {
            this.controllableComponent.VOnStartFalling();
        }
    }

    OnStartFalling() {
        if (this.doNothingTimeout > 0) {
            return;
        }

        if (this.controllableComponent && !this.controllableComponent.InPhysicsCapableState()) {
            return;
        }

        this.isFalling = true;
        if (this.controllableComponent) {
            this.controllableComponent.VOnStartFalling();
        }
    }

    OnStartJumping() {
        if (this.doNothingTimeout > 0) {
            return;
        }

        if (this.controllableComponent && !this.controllableComponent.InPhysicsCapableState()) {
            return;
        }

        this.isJumping = true;
        if (this.controllableComponent) {
            this.controllableComponent.VOnStartJumping();
        }
    }

    OnBeginFootContact() {
        if (this.numFootContacts === 0)
        {
            if (this.controllableComponent && (this.heightInAir > 2 /*|| !m_OverlappingKinematicBodiesList.empty()*/))
            {
                this.controllableComponent.VOnLandOnGround(this.fallHeight);
            }
        }

        this.numFootContacts++;
        //LOG(ToStr(m_HeightInAir));
        if (!this.isForcedUp)
        {
            this.heightInAir = 0;
        }
    }

    OnEndFootContact() {
        this.numFootContacts--;
    }

    RestoreGravityScale() {
        this.physics.VSetGravityScale(this.owner, this.gravityScale);
    }

    Destroy() {
        this.physics.VRemoveActor(this.owner);
    }
}
