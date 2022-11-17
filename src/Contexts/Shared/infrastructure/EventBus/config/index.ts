import convict from 'convict';

export const config = convict({
    rabbitMQ: {
        host: {
            doc: 'The RabbitMQ connection host',
            format: String,
            env: 'RABBITMQ_HOST',
            default: '5672'
        },
        user: {
            doc: 'The RabbitMQ connection user',
            format: String,
            env: 'RABBITMQ_DEFAULT_USER',
            default: 'guest'
        },
        password: {
            doc: 'The RabbitMQ connection password',
            format: String,
            env: 'RABBITMQ_DEFAULT_PASS',
            default: 'guest'
        },
        queue: {
            doc: 'Queue where subscribers listen on',
            format: String,
            env: 'RABBITMQ_QUEUE',
            default: 'inhomeassister-queue'
        },
        exchange: {
            doc: 'Exchange where events are published',
            format: String,
            env: 'RABBITMQ_EXCHANGE',
            default: 'DomainEvents'
        }
    }
});