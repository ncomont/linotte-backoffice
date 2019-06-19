import { EventEmitter, Injectable } from '@angular/core';


class Emitter {
    [index: string]: EventEmitter<any>;
}

@Injectable()
export class EventService {
    private emitters: Emitter = new Emitter();

    createEmitter(key: string) {
        if (!this.emitters[key]) {
            this.emitters[key] = new EventEmitter();
        }
        return this.emitters[key];
    }

    emit(key: string, payload: any = null) {
        if (this.emitters[key]) {
            this.emitters[key].emit(payload);
        }
    }
}
