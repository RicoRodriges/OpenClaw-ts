import Box2D from '../Box2DWrapper';
import Actor from "./actors/Actor";
import PositionComponent from "./actors/components/PositionComponent";
import EventMgr from "./events/EventMgr";
import EventData_Move_Actor from "./events/EventData_Move_Actor";
import Rect from "./utils/Rect";
import {FixtureType} from "./enums/FixtureType";
import Point from "./utils/Point";
import {CollisionFlag} from "./enums/CollisionFlag";
import PhysicsComponent from "./actors/components/PhysicsComponent";

export default class GamePhysics {
    public static METERS_TO_PIXELS = 75.0;
    eps = 0.001;

    world: any;
    contactListener: any;
    actorBodies = new Map<Actor, any>();

    constructor() {
        const gravity = new Box2D.b2Vec2(0.0, 9.8);
        this.world = new Box2D.b2World(gravity);

        const bodyDef = new Box2D.b2BodyDef();
        bodyDef.set_type(Box2D.b2_staticBody);
        this.world.CreateBody(bodyDef);

        this.contactListener = new Box2D.JSContactListener();
        this.contactListener.BeginContact = (contactPtr: any) => {
            const contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
            let pFixtureA = contact.GetFixtureA();
            let pFixtureB = contact.GetFixtureB();

            // Foot contact
            {
                // Make it in predictable order
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
        };
        this.contactListener.EndContact = (contactPtr: any) => {
            const contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
            let pFixtureA = contact.GetFixtureA();
            let pFixtureB = contact.GetFixtureB();

            {
                // Make it in predictable order
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
        };
        this.contactListener.PreSolve = function () {
        };
        this.contactListener.PostSolve = function () {
        };

        this.world.SetContactListener(this.contactListener);
    }

    addStaticBody(a: Actor | undefined, pos: Rect) {
        const def = new ActorBodyDef();
        def.bodyType = Box2D.b2_staticBody;
        def.fixtureType = FixtureType.FixtureType_Solid;
        def.position = new Point(pos.x, pos.y);
        def.size = new Point(pos.w, pos.h);
        def.actor = a;
        this.VAddActorBody(def);
    }

    VOnUpdate(diff: number) {
        this.world.Step(diff / 1000.0, 8, 10);
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

                                const jumpPixelsLeft = pPhysicsComponent.maxJumpHeight - pPhysicsComponent.heightInAir;

                                // Jumped past limit
                                if (pPhysicsComponent.isForcedUp && jumpPixelsLeft < 0) {
                                    // Set b2Body to its max height
                                    bodyPixelPosition = new Point(bodyPixelPosition.x, bodyPixelPosition.y + Math.abs(jumpPixelsLeft));
                                    this.VSetPosition(pGameActor, bodyPixelPosition);
                                    pPhysicsComponent.SetForceFall();
                                }
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
                    positionComponent.position = new Point(bodyPixelPosition.x, bodyPixelPosition.y);

                    const pEvent = new EventData_Move_Actor(pGameActor, bodyPixelPosition);
                    EventMgr.getInstance().VTriggerEvent(pEvent);
                }
            }
        });
    }

    VAddActorBody(bDef: ActorBodyDef) {
        const bodyDef = new Box2D.b2BodyDef();
        bodyDef.set_type(bDef.bodyType);
        bodyDef.set_position(new Box2D.b2Vec2(bDef.position.x / GamePhysics.METERS_TO_PIXELS, bDef.position.y / GamePhysics.METERS_TO_PIXELS));

        const body = this.world.CreateBody(bodyDef);
        if (bDef.makeCapsule) {
            const bodyShape = new Box2D.b2CircleShape();
            bodyShape.set_m_p(new Box2D.b2Vec2(0, bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2 - bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2));
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

            bodyShape.set_m_p(new Box2D.b2Vec2(0, bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2 - bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2));
            fixtureDef.set_shape(bodyShape);
            body.CreateFixture(fixtureDef);

            const polygonShape = new Box2D.b2PolygonShape();
            polygonShape.SetAsBox((bDef.size.x / 2. - 2) / GamePhysics.METERS_TO_PIXELS, (bDef.size.y - bDef.size.x) / GamePhysics.METERS_TO_PIXELS / 2);
            fixtureDef.set_shape(polygonShape);
            body.CreateFixture(fixtureDef);
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
        }

        if (bDef.addFootSensor) {
            const footShape = new Box2D.b2PolygonShape();
            //footShape.SetUserData(FixtureType.FixtureType_FootSensor);
            footShape.SetAsBox(
                (bDef.size.x / 2 - 2) / GamePhysics.METERS_TO_PIXELS,
                24 / 2 / GamePhysics.METERS_TO_PIXELS,
                new Box2D.b2Vec2(0, bDef.size.y / 2 / GamePhysics.METERS_TO_PIXELS),
                0);
            const footShapeDef = new Box2D.b2FixtureDef();
            footShapeDef.set_userData(FixtureType.FixtureType_FootSensor);
            footShapeDef.set_shape(footShape);
            footShapeDef.set_isSensor(true);
            body.CreateFixture(footShapeDef);
        }

        body.SetFixedRotation(true);
        if (bDef.actor) {
            this.actorBodies.set(bDef.actor, body);
            body.SetUserData(bDef.actor);
        }
    }

    VApplyLinearImpulse(a: Actor, impulse: Point) {
        const body = this.actorBodies.get(a);
        if (body) {
            body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse.x / GamePhysics.METERS_TO_PIXELS, impulse.y / GamePhysics.METERS_TO_PIXELS), body.GetWorldCenter());
        }
    }

    VSetLinearSpeed(a: Actor, speed: Point) {
        const body = this.actorBodies.get(a);
        if (body) {
            body.SetLinearVelocity(new Box2D.b2Vec2(speed.x, speed.y));
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
            body.SetTransform(b2Position, 0)
        }
    }

    private GetPhysicsComponentFromB2Body(body: any) {
        let actor: Actor | undefined;
        this.actorBodies.forEach((b, a) => {
            if (b === body) {
                actor = a;
            }
        });
        if (actor) {
            return actor.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
        }
        return null;
    }
}


export class ActorBodyDef {
    actor?: Actor;
    bodyType = Box2D.b2_dynamicBody;
    addFootSensor = false;
    makeCapsule = false;
    makeBullet = false;
    makeSensor = false;
    fixtureType = FixtureType.FixtureType_None;
    position = new Point(0, 0);
    positionOffset = new Point(0, 0);
    collisionShape = 'Rectangle';
    size = new Point(0, 0);
    gravityScale = 1.0;
    setInitialSpeed = false;
    setInitialImpulse = false;
    initialSpeed = new Point(0, 0);
    collisionFlag = CollisionFlag.CollisionFlag_All;
    collisionMask = 0xFFFF;
    friction = 1.0;
    density = 1.0;
    restitution = 0.0;
    prefabType = '';
    // TODO: This is a bit hacky - used for ducking
    isActive = true;

    // fixtureList: ActorFixtureDef[] = [];
}
