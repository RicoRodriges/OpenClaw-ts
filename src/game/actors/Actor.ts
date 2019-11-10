import ActorComponent from "./ActorComponent";

export default class Actor {
    private static GENERATOR = 0;
    public components: ActorComponent[] = [];
    public id: number;

    constructor(id: number | null = null) {
        this.id = (id !== null) ? id : Actor.GENERATOR++;
    }

    Update(diff: number) {
        this.components.forEach((c) => c.VUpdate(diff));
    }

    getComponent(name: string) {
        return this.components.find((c) => c.getName() === name);
    }
}
