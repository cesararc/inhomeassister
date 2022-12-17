import { BackendApp } from './BackendApp';

try {
    new BackendApp().start().catch(handleError);
} catch (e) {
    handleError(e);
}

function handleError(e: any) {
    process.exit(1);
}