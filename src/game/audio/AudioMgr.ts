import EventMgr from "../events/EventMgr";
import EventData_Request_Play_Sound from "../events/EventData_Request_Play_Sound";
import {IEventData} from "../events/IEventData";
import ResourceMgr from "../ResourceMgr";

export default class AudioMgr {
    private static self = new AudioMgr();

    static getInstance() {
        return AudioMgr.self;
    }

    private constructor() {
        EventMgr.getInstance().VAddListener((e) => this.playSound(e), EventData_Request_Play_Sound.NAME);
    }

    private playSound(e: IEventData) {
        const event = e as EventData_Request_Play_Sound;
        const audio = ResourceMgr.getInstance().getSound(event.sound);
        if (audio) {
            audio.play();
        }
    }
}
