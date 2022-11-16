import RabbitMqConfig from './RabbitMqConfig';
import { config } from '../config/index';

export class RabbitMqConfigFactory {
    static createConfig(): RabbitMqConfig {
        return {
            host: config.get('rabbitMQ.host'),
            user: config.get('rabbitMQ.user'),
            password: config.get('rabbitMQ.password'),
            queue: config.get('rabbitMQ.queue'),
            exchange: config.get('rabbitMQ.exchange')
        }
    }
}