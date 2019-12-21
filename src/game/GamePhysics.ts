import Box2D from '../Box2DWrapper';
import Actor from "./actors/Actor";
import PositionComponent from "./actors/components/PositionComponent";
import EventMgr from "./events/EventMgr";
import EventData_Move_Actor from "./events/EventData_Move_Actor";
import Rect from "./utils/Rect";
import {FixtureType, fixtureTypeToString} from "./enums/FixtureType";
import Point from "./utils/Point";
import {CollisionFlag} from "./enums/CollisionFlag";
import PhysicsComponent from "./actors/components/PhysicsComponent";
import AttackAIStateComponent from "./actors/components/enemy/AttackAIStateComponent";
import {BodyType} from "./enums/BodyType";
import TriggerComponent from "./actors/components/TriggerComponent";
import GameProperties from "./GameProperties";

export default class GamePhysics {
    public static METERS_TO_PIXELS = 75.0;

    world: any;
    contactListener: any;
    actorBodies = new Map<Actor, any>();
    toBeDestroyed: Actor[] = [];
    toBeCreated: ActorBodyDef[] = [];

    constructor() {
        const gravity = new Box2D.b2Vec2(0.0, 9.8);
        this.world = new Box2D.b2World(gravity);
        Box2D.destroy(gravity);

        this.contactListener = new Box2D.JSContactListener();
        this.contactListener.BeginContact = (contactPtr: any) => {
            const contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
            let pFixtureA = contact.GetFixtureA();
            let pFixtureB = contact.GetFixtureB();
            if (GameProperties.debug) {
                console.log(fixtureTypeToString(pFixtureA.GetUserData()),
                    fixtureTypeToString(pFixtureB.GetUserData()));
            }

            // Foot contact
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_FootSensor) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_FootSensor) {
                    if (pFixtureB.GetUserData() === FixtureType.FixtureType_Solid ||
                        pFixtureB.GetUserData() === FixtureType.FixtureType_Death) {
                        const pPhysicsComponent = this.GetPhysicsComponentFromB2Body(pFixtureA.GetBody());
                        if (pPhysicsComponent) {
                            pPhysicsComponent.OnBeginFootContact();
                        }
                    }
                }
            }
            // Trigger-like objects
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_Trigger) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_Trigger) {
                    const actor = this.GetActorFromB2Body(pFixtureB.GetBody());
                    if (actor) {
                        const triggerActor = this.GetActorFromB2Body(pFixtureA.GetBody());
                        if (triggerActor) {
                            const triggerComponent = triggerActor.getComponent(TriggerComponent.NAME) as TriggerComponent;
                            if (triggerComponent) {
                                triggerComponent.OnActorEntered(actor, FixtureType.FixtureType_Trigger);
                            }
                        }
                    }
                }
            }
            // Enemy agro area
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_EnemyAIMeleeSensor) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_EnemyAIMeleeSensor &&
                    pFixtureB.GetUserData() === FixtureType.FixtureType_Controller) {
                    const enemy = this.GetActorFromB2Body(pFixtureA.GetBody());
                    const claw = this.GetActorFromB2Body(pFixtureB.GetBody());
                    if (enemy && claw) {
                        const attackAIStateComponent = enemy.getComponent(AttackAIStateComponent.NAME) as AttackAIStateComponent;
                        if (attackAIStateComponent) {
                            attackAIStateComponent.OnEnemyEnterAgroRange(claw);
                        }
                    }
                }
            }
        };
        this.contactListener.EndContact = (contactPtr: any) => {
            const contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
            let pFixtureA = contact.GetFixtureA();
            let pFixtureB = contact.GetFixtureB();

            // Foot contact
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_FootSensor) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_FootSensor) {
                    if (pFixtureB.GetUserData() === FixtureType.FixtureType_Solid ||
                        pFixtureB.GetUserData() === FixtureType.FixtureType_Death) {
                        const pPhysicsComponent = this.GetPhysicsComponentFromB2Body(pFixtureA.GetBody());
                        if (pPhysicsComponent) {
                            pPhysicsComponent.OnEndFootContact();
                        }
                    }
                }
            }
            // Trigger-like objects
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_Trigger) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_Trigger) {
                    const actor = this.GetActorFromB2Body(pFixtureB.GetBody());
                    if (actor) {
                        const triggerActor = this.GetActorFromB2Body(pFixtureA.GetBody());
                        if (triggerActor) {
                            const triggerComponent = triggerActor.getComponent(TriggerComponent.NAME) as TriggerComponent;
                            if (triggerComponent) {
                                triggerComponent.OnActorLeft(actor, FixtureType.FixtureType_Trigger);
                            }
                        }
                    }
                }
            }
            // Enemy agro area
            {
                if (pFixtureB.GetUserData() === FixtureType.FixtureType_EnemyAIMeleeSensor) {
                    const t = pFixtureA;
                    pFixtureA = pFixtureB;
                    pFixtureB = t;
                }

                if (pFixtureA.GetUserData() === FixtureType.FixtureType_EnemyAIMeleeSensor &&
                    pFixtureB.GetUserData() === FixtureType.FixtureType_Controller) {
                    const enemy = this.GetActorFromB2Body(pFixtureA.GetBody());
                    const claw = this.GetActorFromB2Body(pFixtureB.GetBody());
                    if (enemy && claw) {
                        const attackAIStateComponent = enemy.getComponent(AttackAIStateComponent.NAME) as AttackAIStateComponent;
                        if (attackAIStateComponent) {
                            attackAIStateComponent.OnEnemyLeftAgroRange(claw);
                        }
                    }
                }
            }
        };
        this.contactListener.PreSolve = function () {
        };
        this.contactListener.PostSolve = function () {
        };

        this.world.SetContactListener(this.contactListener);
    }

    addStaticBody(a: Actor | undefined, pos: Rect) {
        const def = new ActorBodyDef();
        def.bodyType = BodyType.STATIC;
        def.fixtureType = FixtureType.FixtureType_Solid;
        def.collisionFlag = CollisionFlag.CollisionFlag_Solid;
        def.collisionMask = CollisionFlag.CollisionFlag_Controller | CollisionFlag.CollisionFlag_DynamicActor |
            CollisionFlag.CollisionFlag_Pickup | CollisionFlag.CollisionFlag_Crate;
        def.position.x = pos.x;
        def.position.y = pos.y;
        def.size.x = pos.w;
        def.size.y = pos.h;
        def.actor = a;
        this.VAddActorBody(def);
    }

    VOnUpdate(diff: number) {
        this.world.Step(diff / 1000.0, 8, 10);

        if (this.toBeDestroyed.length > 0) {
            this.toBeDestroyed.forEach((a) => {
                const body = this.actorBodies.get(a);
                if (this.world && body) {
                    this.world.DestroyBody(body);
                }
                this.actorBodies.delete(a);
            });
            this.toBeDestroyed = [];
        }

        if (this.toBeCreated.length > 0) {
            this.toBeCreated.forEach((a) => this.VAddActorBody(a));
            this.toBeCreated = [];
        }
    }

    VSyncVisibleScene() {
        this.actorBodies.forEach((pActorBody, pGameActor) => {
            if (pActorBody.GetType() === Box2D.b2_staticBody) {
                return;
            }
            const positionComponent = pGameActor.getComponent(PositionComponent.NAME) as PositionComponent;
            const pPhysicsComponent = pGameActor.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
            if (pGameActor && pActorBody && positionComponent && pPhysicsComponent) {
                const bpos = pActorBody.GetPosition();
                let bodyPixelPosition = new Point(bpos.get_x() * GamePhysics.METERS_TO_PIXELS,
                    bpos.get_y() * GamePhysics.METERS_TO_PIXELS);
                const actorPixelPosition = positionComponent.position;
                if (pActorBody.GetType() === Box2D.b2_dynamicBody) {
                    const wasFalling = pPhysicsComponent.isFalling;
                    const wasJumping = pPhysicsComponent.isJumping;
                    if (Math.abs(bodyPixelPosition.y - actorPixelPosition.y) > 0.01) {
                        // He might be on platform
                        if (pPhysicsComponent.IsOnGround()) {
                            pPhysicsComponent.fallHeight = 0;
                            pPhysicsComponent.setFalling(false);
                            pPhysicsComponent.setJumping(false);
                            if (pActorBody.GetLinearVelocity().y < -5) {
                                pPhysicsComponent.heightInAir += Math.abs(bodyPixelPosition.y - actorPixelPosition.y);
                            }
                        }
                        // Falling
                        else if ((bodyPixelPosition.y - actorPixelPosition.y) > 0.01) {
                            pPhysicsComponent.fallHeight += Math.abs(bodyPixelPosition.y - actorPixelPosition.y);
                            pPhysicsComponent.setFalling(true);
                            pPhysicsComponent.setJumping(false);
                        } else // Jumping
                        {
                            if (pPhysicsComponent.canJump) {
                                pPhysicsComponent.fallHeight = 0;
                                pPhysicsComponent.setFalling(false);
                                pPhysicsComponent.setJumping(true);
                                pPhysicsComponent.heightInAir += Math.abs(bodyPixelPosition.y - actorPixelPosition.y);
                            }
                        }
                    } else if (Math.abs(bodyPixelPosition.y - actorPixelPosition.y) < 0.01) {
                        // TODO: Check this. This causes animation glitches on connected ground platforms
                        // Should be fixed when all consecutive tiles are joined, but anyway, keep this in mind
                        if (!pPhysicsComponent.IsOnGround() && (bodyPixelPosition.y - actorPixelPosition.y) > 0.01) {
                            pPhysicsComponent.setFalling(true);
                        } else {
                            pPhysicsComponent.setFalling(false);
                        }
                        pPhysicsComponent.setJumping(false);
                    }

                    // Notify change of states
                    if (!wasFalling && pPhysicsComponent.isFalling) {
                        pPhysicsComponent.OnStartFalling();
                    }
                    if (!wasJumping && pPhysicsComponent.isJumping) {
                        pPhysicsComponent.OnStartJumping();
                    }
                }

                // Body moved by some portion
                if ((Math.abs(bodyPixelPosition.x - actorPixelPosition.x)) > 0.01 ||
                    (Math.abs(bodyPixelPosition.y - actorPixelPosition.y)) > 0.01) {
                    // Box2D has moved the physics object. Update actor's position and notify subsystems which care
                    positionComponent.position.x = bodyPixelPosition.x;
                    positionComponent.position.y = bodyPixelPosition.y;

                    const pEvent = new EventData_Move_Actor(pGameActor, bodyPixelPosition);
                    EventMgr.getInstance().VTriggerEvent(pEvent);
                }
            }
        });
    }

    VQueueAddActorBody(bDef: ActorBodyDef) {
        this.toBeCreated.push(bDef);
    }

    VAddActorBody(bDef: ActorBodyDef) {
        if (this.world.IsLocked()) {
            this.VQueueAddActorBody(bDef);
            return;
        }
        const bodyDef = new Box2D.b2BodyDef();
        const b2Vec2 = new Box2D.b2Vec2(0, 0);

        bodyDef.set_type(toBox2DType(bDef.bodyType));
        b2Vec2.Set(bDef.position.x / GamePhysics.METERS_TO_PIXELS, bDef.position.y / GamePhysics.METERS_TO_PIXELS);
        bodyDef.set_position(b2Vec2);

        const body = this.world.CreateBody(bodyDef);
        if (bDef.makeCapsule) {
            const bodyShape = new Box2D.b2CircleShape();
            b2Vec2.Set(0, bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2 - bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2);
            bodyShape.set_m_p(b2Vec2);
            bodyShape.set_m_radius(bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2);

            const fixtureDef = new Box2D.b2FixtureDef();
            fixtureDef.set_shape(bodyShape);
            fixtureDef.set_density(bDef.density);
            fixtureDef.set_friction(bDef.friction);
            fixtureDef.set_restitution(bDef.restitution);
            fixtureDef.set_isSensor(bDef.makeSensor);
            const filter = new Box2D.b2Filter();
            filter.set_categoryBits(bDef.collisionFlag);
            filter.set_maskBits(bDef.collisionMask);
            fixtureDef.set_filter(filter);
            body.CreateFixture(fixtureDef);

            b2Vec2.Set(0, bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2 - bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2);
            bodyShape.set_m_p(b2Vec2);
            fixtureDef.set_shape(bodyShape);
            body.CreateFixture(fixtureDef);

            const polygonShape = new Box2D.b2PolygonShape();
            polygonShape.SetAsBox((bDef.size.x / 2. - 2) / GamePhysics.METERS_TO_PIXELS, (bDef.size.y - bDef.size.x) / GamePhysics.METERS_TO_PIXELS / 2);
            fixtureDef.set_shape(polygonShape);
            body.CreateFixture(fixtureDef);
            Box2D.destroy(polygonShape);
            Box2D.destroy(filter);
            Box2D.destroy(fixtureDef);
            Box2D.destroy(bodyShape);
        } else {
            const shape = new Box2D.b2PolygonShape();
            //shape.SetUserData(bDef.fixtureType);
            shape.SetAsBox(bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2, bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2);
            const shapeDef = new Box2D.b2FixtureDef();
            shapeDef.set_density(bDef.density);
            shapeDef.set_friction(bDef.friction);
            shapeDef.set_restitution(bDef.restitution);
            shapeDef.set_isSensor(bDef.makeSensor);
            shapeDef.set_shape(shape);
            shapeDef.set_userData(bDef.fixtureType);
            const filter = new Box2D.b2Filter();
            filter.set_categoryBits(bDef.collisionFlag);
            filter.set_maskBits(bDef.collisionMask);
            shapeDef.set_filter(filter);
            body.CreateFixture(shapeDef);

            Box2D.destroy(shape);
            Box2D.destroy(filter);
            Box2D.destroy(shapeDef);
        }

        if (bDef.addFootSensor) {
            const footShape = new Box2D.b2PolygonShape();
            b2Vec2.Set(0, bDef.size.y / 2 / GamePhysics.METERS_TO_PIXELS);
            footShape.SetAsBox(
                (bDef.size.x / 2 - 2) / GamePhysics.METERS_TO_PIXELS,
                24 / 2 / GamePhysics.METERS_TO_PIXELS,
                b2Vec2,
                0);
            const footShapeDef = new Box2D.b2FixtureDef();
            footShapeDef.set_userData(FixtureType.FixtureType_FootSensor);
            footShapeDef.set_shape(footShape);
            footShapeDef.set_isSensor(true);
            const filter = new Box2D.b2Filter();
            filter.set_categoryBits(CollisionFlag.CollisionFlag_Controller);
            filter.set_maskBits(CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Ground);
            footShapeDef.set_filter(filter);
            body.CreateFixture(footShapeDef);

            Box2D.destroy(footShapeDef);
            Box2D.destroy(filter);
            Box2D.destroy(footShape);
        }

        bDef.fixtureList.forEach((f) => this.AddActorFixtureToBody(body, f));

        body.SetFixedRotation(true);
        if (bDef.actor) {
            this.actorBodies.set(bDef.actor, body);
            body.SetUserData(bDef.actor);
        }
        Box2D.destroy(b2Vec2);
        Box2D.destroy(bodyDef);

        if (bDef.actor) {
            if (bDef.setInitialSpeed) {
                this.VSetLinearSpeed(bDef.actor, bDef.initialSpeed);
            } else if (bDef.setInitialImpulse) {
                this.VApplyLinearImpulse(bDef.actor, bDef.initialSpeed);
            }
        }
    }

    AddActorFixtureToBody(body: any, pFixtureDef: ActorFixtureDef) {
        const fixture = new Box2D.b2FixtureDef();

        const rectangleShape = new Box2D.b2PolygonShape();
        rectangleShape.SetAsBox(
            pFixtureDef.size.x / GamePhysics.METERS_TO_PIXELS / 2,
            pFixtureDef.size.y / GamePhysics.METERS_TO_PIXELS / 2
        );
        fixture.set_shape(rectangleShape);

        fixture.set_density(pFixtureDef.density);
        fixture.set_friction(pFixtureDef.friction);
        fixture.set_restitution(pFixtureDef.restitution);
        fixture.set_userData(pFixtureDef.fixtureType);
        fixture.set_isSensor(pFixtureDef.isSensor);
        const filter = new Box2D.b2Filter();
        filter.set_categoryBits(pFixtureDef.collisionFlag);
        filter.set_maskBits(pFixtureDef.collisionMask);
        fixture.set_filter(filter);
        body.CreateFixture(fixture);
        Box2D.destroy(fixture);
        Box2D.destroy(rectangleShape);
        Box2D.destroy(filter);
    }

    VApplyLinearImpulse(a: Actor, impulse: Point) {
        const body = this.actorBodies.get(a);
        if (body) {
            const impulseV = new Box2D.b2Vec2(impulse.x / GamePhysics.METERS_TO_PIXELS, impulse.y / GamePhysics.METERS_TO_PIXELS);
            const center = body.GetWorldCenter();
            body.ApplyLinearImpulse(impulseV, center);
            Box2D.destroy(impulseV);
        }
    }

    VSetLinearSpeed(a: Actor, speed: Point) {
        const body = this.actorBodies.get(a);
        if (body) {
            const speedV = new Box2D.b2Vec2(speed.x, speed.y);
            body.SetLinearVelocity(speedV);
            Box2D.destroy(speedV);
        }
    }

    VGetVelocity(a: Actor) {
        const body = this.actorBodies.get(a);
        if (body) {
            const velocity = body.GetLinearVelocity();
            return new Point(velocity.get_x(), velocity.get_y());
        }
        return new Point(0, 0);
    }

    VSetGravityScale(a: Actor, gravityScale: number) {
        const body = this.actorBodies.get(a);
        if (body) {
            body.SetGravityScale(gravityScale);
        }
    }

    GetGravity() {
        const gravity = this.world.GetGravity();
        return new Point(gravity.get_x(), gravity.get_y());
    }

    private VSetPosition(a: Actor, position: Point) {
        const body = this.actorBodies.get(a);
        if (body) {
            const b2Position = new Box2D.b2Vec2(position.x / GamePhysics.METERS_TO_PIXELS, position.y / GamePhysics.METERS_TO_PIXELS);
            body.SetTransform(b2Position, 0);
            Box2D.destroy(b2Position);
        }
    }

    private GetPhysicsComponentFromB2Body(body: any) {
        const actor = this.GetActorFromB2Body(body);
        if (actor) {
            return actor.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
        }
        return null;
    }

    private GetActorFromB2Body(body: any) {
        let actor: Actor | undefined;
        this.actorBodies.forEach((b, a) => {
            if (b === body) {
                actor = a;
            }
        });
        return actor;
    }

    VRemoveActor(actor: Actor) {
        this.toBeDestroyed.push(actor);
    }
}

function toBox2DType(bodyType: BodyType) {
    switch (bodyType) {
        case BodyType.DYNAMIC:
            return Box2D.b2_dynamicBody;
        case BodyType.KINEMATIC:
            return Box2D.b2_kinematicBody;
        case BodyType.STATIC:
        default:
            return Box2D.b2_staticBody;
    }
}

export class ActorBodyDef {
    actor?: Actor;
    bodyType = BodyType.DYNAMIC;
    addFootSensor = false;
    makeCapsule = false;
    // makeBullet = false;
    makeSensor = false;
    fixtureType = FixtureType.FixtureType_None;
    position = new Point(0, 0);
    // positionOffset = new Point(0, 0);
    // collisionShape = 'Rectangle';
    size = new Point(0, 0);
    gravityScale = 0;
    setInitialSpeed = false;
    setInitialImpulse = false;
    initialSpeed = new Point(0, 0);
    collisionFlag = CollisionFlag.CollisionFlag_All;
    collisionMask = 0xFFFF;
    friction = 1.0;
    density = 1.0;
    restitution = 0.0;
    fixtureList: ActorFixtureDef[] = [];
}

export class ActorFixtureDef {
    fixtureType = FixtureType.FixtureType_None;
    // collisionShape = 'Rectangle';
    isSensor = false;
    size = new Point(0, 0);
    // offset = new Point(0, 0);

    friction = 0;
    density = 0;
    restitution = 0;

    collisionFlag = CollisionFlag.CollisionFlag_All;
    collisionMask = 0xFFFF;
}
