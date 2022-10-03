import { Server } from "./server";

export class BackendApp {
    server?: Server;

    async start() {
        const port = process.env.PORT || '5000';
        this.server = new Server(port);

        await this.registerSubscribers();

        return this.server.listen();
    }

    private async registerSubscribers() {
        // register subscribers here...
    }
}