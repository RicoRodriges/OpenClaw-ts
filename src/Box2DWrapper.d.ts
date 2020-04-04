export = Box2D;

declare namespace Box2D {
    interface B2Object {
    }

    interface Pointer {
    }

    /// B2Vector
    class b2Vec2 implements B2Object {
        public x: number;
        public y: number;

        constructor(x: number, y: number);

        get_x(): number;

        get_y(): number;

        Set(x: number, y: number): number;
    }

    /// B2World
    class b2World implements B2Object {
        constructor(gravity: b2Vec2);

        GetGravity(): b2Vec2;

        Step(time: number, a: number, b: number): void;

        SetContactListener(a: JSContactListener): void;

        DestroyBody(b: b2Body): void;

        IsLocked(): boolean;

        CreateBody(b: b2BodyDef): b2Body;

        GetBodyList(): b2BodyList;
    }


    /// B2Transform
    class b2Transform implements B2Object {
        constructor();

        SetIdentity(): void;
    }

    /// B2AABB
    class b2AABB implements B2Object {
        constructor();

        get_lowerBound(): b2Vec2;

        get_upperBound(): b2Vec2;
    }

    class JSContactListener implements B2Object {
        public BeginContact: (contactPtr: Pointer) => void;
        public EndContact: (contactPtr: Pointer) => void;
        public PreSolve: () => void;
        public PostSolve: () => void;
    }

    class b2Contact implements B2Object {
        GetFixtureA(): b2Fixture;

        GetFixtureB(): b2Fixture;
    }

    class b2Fixture implements B2Object {
        GetUserData(): any;

        GetBody(): b2Body;
    }

    class b2Body implements B2Object {
        GetType(): number;

        GetPosition(): b2Vec2;

        GetLinearVelocity(): b2Vec2;

        GetWorldCenter(): b2Vec2;

        CreateFixture(f: b2FixtureDef): void;

        SetUserData(d: any): void;

        SetLinearVelocity(v: b2Vec2): void;

        SetFixedRotation(r: boolean): void;

        SetGravityScale(g: number): void;

        SetTransform(p: b2Vec2, t: number): void;

        ApplyLinearImpulse(impulse: b2Vec2, center: b2Vec2): void;
    }

    class b2BodyDef implements B2Object {
        set_position(p: b2Vec2): void;

        set_type(t: number): void;
    }

    interface b2Shape {
        GetChildCount(): number;

        ComputeAABB(aabb: Pointer, t: b2Transform, child: number): void;
    }

    class b2CircleShape implements b2Shape {
        set_m_p(m_p: b2Vec2): void;

        set_m_radius(r: number): void;

        ComputeAABB(aabb: Box2D.Pointer, t: Box2D.b2Transform, child: number): void;

        GetChildCount(): number;
    }

    class b2PolygonShape implements b2Shape {
        SetAsBox(w: number, h: number, v: b2Vec2, n: number): void;
        SetAsBox(w: number, h: number): void;

        ComputeAABB(aabb: Box2D.Pointer, t: Box2D.b2Transform, child: number): void;

        GetChildCount(): number;
    }

    class b2FixtureDef implements B2Object {
        set_shape(s: b2Shape): void;

        set_density(d: number): void;

        set_friction(f: number): void;

        set_restitution(r: number): void;

        set_isSensor(s: boolean): void;

        set_filter(f: b2Filter): void;

        set_userData(d: any): void;
    }

    class b2Filter {
        set_categoryBits(v: number): void;

        set_maskBits(v: number): void;
    }

    class b2BodyList {
        GetFixtureList(): b2FixtureList;

        GetPosition(): b2Vec2;

        GetNext(): b2BodyList;
    }

    class b2FixtureList {
        GetType(): number;

        GetShape(): b2Shape;

        GetNext(): b2FixtureList;
    }


    /// Common function
    function getPointer(obj: B2Object): Pointer;

    function wrapPointer<T>(p: Pointer, clazz: new (...args: any[]) => T): T;

    function destroy(obj: B2Object): void;

    /// Constants
    const b2_staticBody: number;
    const b2_dynamicBody: number;
    const b2_kinematicBody: number;

    // Oh guys. Please let me do not continue declaring this module anymore. I'm tired
}
