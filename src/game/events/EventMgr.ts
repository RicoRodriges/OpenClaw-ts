import {IEventData} from "./IEventData";

export default class EventMgr {
    private static self = new EventMgr();
    eventListeners: Map<string, ((d: IEventData) => void)[]> = new Map<string, ((d: IEventData) => void)[]>();
    eventQueue: IEventData[] = [];

    static getInstance() {
        return EventMgr.self;
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

    VQueueEvent(event: IEventData) {
        const index = this.eventQueue.findIndex((v) => v.equals(event));
        if (index !== -1) {
            this.eventQueue = this.eventQueue.splice(index, 1);
        }
        this.eventQueue.push(event);
    }

    VOnUpdate(t: number) {
        if (this.eventQueue.length > 0) {
            this.eventQueue.forEach((e) => this.VTriggerEvent(e));
            this.eventQueue = [];
        }
    }
}
