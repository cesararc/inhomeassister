export class ServiceProviderNotFound extends Error {
  constructor() {
    super('Service provider not found.')
  }
}
