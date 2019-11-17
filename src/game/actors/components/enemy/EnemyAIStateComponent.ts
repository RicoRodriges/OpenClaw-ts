import ActorComponent from "../../ActorComponent";
import {EnemyAIState} from "../../../enums/EnemyAIState";

export abstract class EnemyAIStateComponent extends ActorComponent {
    public static NAME = 'EnemyAIStateComponent';
    isActive = true;
    priority = 0;

    VUpdate(diff: number) {
    }

    abstract VOnStateEnter(pPreviousState: EnemyAIStateComponent): void;
    abstract VOnStateLeave(pNextState: EnemyAIStateComponent): void;
    abstract VGetStateType(): EnemyAIState;

    abstract VCanEnter(): boolean;

    getName(): string {
        return EnemyAIStateComponent.NAME;
    }

}
