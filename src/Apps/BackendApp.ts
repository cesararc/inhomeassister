import { Server } from "./server";
import container from './dependency-injection/index';
import { DomainEventSubscriber } from "../Contexts/Shared/domain/DomainEventSubscriber";
import { DomainEvent } from '../Contexts/Shared/domain/DomainEvent';
import { Definition } from "node-dependency-injection";
import { DomainEventMapping } from "../Contexts/Shared/infrastructure/EventBus/DomainEventMapping";

export class BackendApp {
    server?: Server;

    async start() {
        const port = process.env.PORT || '5000';
        this.server = new Server(port);

        await this.registerSubscribers();

        return this.server.listen();
    }

    private async registerSubscribers() {
        const eventBus = container.get('Shared.EventBus');
        const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
        const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

        subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
        const domainEventMapping = new DomainEventMapping(subscribers);

        eventBus.setDomainEventMapping(domainEventMapping);
        eventBus.addSubscribers(subscribers);
        await eventBus.start();
    }
}