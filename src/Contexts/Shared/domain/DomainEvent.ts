
export abstract class DomainEvent {
    static EVENT_NAME: string;
    static fromPrimitives: (...args: any[]) => any;
    readonly occurredOn: Date;
    readonly eventName: string;

    constructor(eventName: string, occurredOn?: Date) {
        this.occurredOn = occurredOn || new Date();
        this.eventName = eventName;
    }

    abstract toPrimitive(): Object;
}

export type DomainEventClass = { EVENT_NAME: string, fromPrimitives(...args: any[]): DomainEvent; };
