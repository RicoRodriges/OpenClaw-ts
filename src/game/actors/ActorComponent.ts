import Actor from "./Actor";
import Point from "../utils/Point";

export default abstract class ActorComponent {
    protected constructor(public owner: Actor) {
        this.owner = owner;
    }

    abstract getName(): string;

    VUpdate(diff: number) {
    }
}
