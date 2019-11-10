export abstract class IEventData {
    abstract getName(): string;

    equals(e: IEventData) {
        return this === e;
    };
}
