import Box2D from '../Box2DWrapper';
import Actor from "./actors/Actor";
import PositionComponent from "./actors/components/PositionComponent";
import EventMgr from "./events/EventMgr";
import EventData_Move_Actor from "./events/EventData_Move_Actor";
import Rect from "./utils/Rect";
import {FixtureType} from "./enums/FixtureType";
import Point from "./utils/Point";
import {CollisionFlag} from "./enums/CollisionFlag";

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
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();
            // now do what you wish with the fixtures
        };
        this.contactListener.EndContact = function () {
        };
        this.contactListener.PreSolve = function () {
        };
        this.contactListener.PostSolve = function () {
        };

        //this.world.SetContactListener(this.contactListener);
    }

    addStaticBody(a: Actor | undefined, pos: Rect) {
        const def = new ActorBodyDef();
        def.bodyType = Box2D.b2_staticBody;
        def.position = new Point(pos.x, pos.y);
        def.size = new Point(pos.w, pos.h);
        def.actor = a;
        this.VAddActorBody(def);
    }

    VOnUpdate(diff: number) {
        this.world.Step(diff / 1000.0, 8, 10);
    }

    VSyncVisibleScene() {
        this.actorBodies.forEach((b, a) => {
            const positionComponent = a.getComponent(PositionComponent.NAME) as PositionComponent;
            if (positionComponent) {
                const bpos = b.GetPosition();
                const newX = bpos.get_x() * GamePhysics.METERS_TO_PIXELS;
                const newY = bpos.get_y() * GamePhysics.METERS_TO_PIXELS;
                if (Math.abs(newX - positionComponent.position.x) > this.eps ||
                    Math.abs(newY - positionComponent.position.y) > this.eps) {
                    positionComponent.position.x = newX;
                    positionComponent.position.y = newY;
                    EventMgr.getInstance().VTriggerEvent(new EventData_Move_Actor(a, positionComponent.position));
                }
            }
        });
    }

    VAddActorBody(bDef: ActorBodyDef) {
        const bodyDef = new Box2D.b2BodyDef();
        bodyDef.set_type(bDef.bodyType);
        bodyDef.set_position(new Box2D.b2Vec2(bDef.position.x / GamePhysics.METERS_TO_PIXELS, bDef.position.y / GamePhysics.METERS_TO_PIXELS));

        const shape = new Box2D.b2PolygonShape();
        shape.SetAsBox(bDef.size.x / GamePhysics.METERS_TO_PIXELS / 2, bDef.size.y / GamePhysics.METERS_TO_PIXELS / 2);
        const shapeDef = new Box2D.b2FixtureDef();
        shapeDef.set_density(bDef.density);
        shapeDef.set_friction(bDef.friction);
        shapeDef.set_restitution(bDef.restitution);
        shapeDef.set_shape(shape);

        const body = this.world.CreateBody(bodyDef);
        body.CreateFixture(shapeDef);
        body.SetFixedRotation(true);
        if (bDef.actor) {
            this.actorBodies.set(bDef.actor, body);
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
}


export class ActorBodyDef {
    actor?: Actor;
    bodyType = Box2D.b2_dynamicBody;
    addFootSensor = false;
    makeCapsule = false;
    makeBullet = false;
    makeSensor = true;
    fixtureType = FixtureType.FixtureType_None;
    position = new Point(0, 0);
    positionOffset = new Point(0, 0);
    collisionShape = 'Rectangle';
    size = new Point(0, 0);
    gravityScale = 1.0;
    setInitialSpeed = false;
    setInitialImpulse = false;
    initialSpeed = new Point(0, 0);
    collisionFlag = CollisionFlag.CollisionFlag_None;
    collisionMask = 0;
    friction = 1.0;
    density = 1.0;
    restitution = 0.0;
    prefabType = '';
    // TODO: This is a bit hacky - used for ducking
    isActive = true;

    // fixtureList: ActorFixtureDef[] = [];
}
