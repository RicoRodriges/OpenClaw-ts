import Actor from "./Actor";

export default abstract class ActorComponent {
    protected constructor(public owner: Actor) {
        this.owner = owner;
    }

    abstract getName(): string;

    VUpdate(diff: number) {
    }
}
