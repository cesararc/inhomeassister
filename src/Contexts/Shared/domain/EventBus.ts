import { DomainEvent } from './DomainEvent';

export interface EventBus {
    setDomainEventMapping(domainEventMapping: any): void;
    publish(events: Array<DomainEvent>): Promise<void>;
    addSubscribers(subscribers: any): void;
    start(): Promise<void>;
}