export enum FixtureType
{
    FixtureType_Min = -1,
    FixtureType_None = 0,
    // Tiles
    FixtureType_Solid,
    FixtureType_Ground,
    FixtureType_TopLadderGround,
    FixtureType_Climb,
    FixtureType_Death,
    // Sensors
    FixtureType_FootSensor,
    FixtureType_Controller,
    FixtureType_AmbientTrigger,
    FixtureType_Trigger,
    FixtureType_Projectile,
    FixtureType_Crate,
    FixtureType_PowderKeg,
    FixtureType_Pickup,
    FixtureType_Explosion,
    FixtureType_EnemyAI,
    FixtureType_EnemyAIMeleeSensor,
    FixtureType_EnemyAIDuckMeleeSensor,
    FixtureType_EnemyAIRangedSensor,
    FixtureType_EnemyAIDuckRangedSensor,
    FixtureType_EnemyAIDiveAreaSensor,
    FixtureType_DamageAura,
    FixtureType_RopeSensor,
    FixtureType_Trigger_SpawnArea,
    FixtureType_Trigger_GabrielButton,
    FixtureType_Trigger_ChaseEnemyAreaSensor,
    FixtureType_Trigger_RollAreaSensor,
    FixtureType_Max,
}

export function fixtureTypeToString(f: FixtureType) {
    switch (f) {
        case FixtureType.FixtureType_None:
            return "FixtureType_None";
        case FixtureType.FixtureType_Solid:
            return "FixtureType_Solid";
        case FixtureType.FixtureType_Death:
            return "FixtureType_Death";
        case FixtureType.FixtureType_FootSensor:
            return "FixtureType_FootSensor";
        case FixtureType.FixtureType_Controller:
            return "FixtureType_Controller";
        case FixtureType.FixtureType_Trigger:
            return "FixtureType_Trigger";
        case FixtureType.FixtureType_EnemyAI:
            return "FixtureType_EnemyAI";
        case FixtureType.FixtureType_EnemyAIMeleeSensor:
            return "FixtureType_EnemyAIMeleeSensor";
        default:
            return "What???";
    }
}
