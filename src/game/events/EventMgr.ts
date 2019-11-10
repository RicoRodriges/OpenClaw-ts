import {IEventData} from "./IEventData";

export default class EventMgr {
    private static self = new EventMgr();
    eventListeners: Map<string, ((d: IEventData) => void)[]> = new Map<string, ((d: IEventData) => void)[]>();

    static getInstance() {
        return EventMgr.self;
    }

    constructor() {
    }

    VAddListener(f: (d: IEventData) => void, name: string) {
        let listeners = this.eventListeners.get(name);
        if (!listeners) {
            listeners = [];
            this.eventListeners.set(name, listeners);
        }
        listeners.push(f);
    }

    VRemoveListener(f: (d: IEventData) => void, e: IEventData) {
        let listeners = this.eventListeners.get(e.getName());
        if (listeners) {
            this.eventListeners.set(e.getName(), listeners.filter((l) => l !== f));
        }
    }

    VTriggerEvent(event: IEventData) {
        const listeners = this.eventListeners.get(event.getName());
        if (listeners) {
            listeners.forEach((l) => l(event));
        }
    }

    VOnUpdate(t: number) {
        // TODO: queue execution
    }
}
