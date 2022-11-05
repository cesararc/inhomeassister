import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
//const env = process.env.NODE_ENV || 'dev';

try {
    loader.load(`${__dirname}/application.yaml`);
}
catch (error) {
    console.log({ error })
}

export default container;
