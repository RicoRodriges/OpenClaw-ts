import ActorComponent from "../../ActorComponent";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import Actor from "../../Actor";

export abstract class EnemyAIStateComponent extends ActorComponent {
    public static NAME = 'EnemyAIStateComponent';
    isActive = true;
    priority = 0;

    protected constructor(owner: Actor, isActive = true, priority = 0) {
        super(owner);
        this.isActive = isActive;
        this.priority = priority;
    }

    VUpdate(diff: number) {
    }

    abstract VOnStateEnter(pPreviousState: EnemyAIStateComponent): void;

    abstract VOnStateLeave(pNextState: EnemyAIStateComponent | null): void;

    abstract VGetStateType(): EnemyAIState;

    abstract VCanEnter(): boolean;

    getName(): string {
        return EnemyAIStateComponent.NAME;
    }
}
