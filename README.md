
<h1 align="center">
  In Home Assister
</h1>

## 🚀 Configuración del entorno

### 🐳 Herramientas necesarias

1. [Instalar Docker](https://www.docker.com/get-started)
2. Clona este proyecto: `git clone https://github.com/inhomeassister/inhomeassister.git`
3. Moverse al directorio raíz del proyecto.

### 🛠️ Configuración de entorno

1. Instala las dependencias del proyecto utilizando el comando de docker: `docker-compose up --build -d`
   
### 🔨 Arquitectura Hexagonal

Esta estructura de carpetas sigue los principios de arquitectura hexagonal y principios SOLID.

```
src
|-- Apps // Puntos de entrada a la aplicación (endpoints)
|-- Contexts // Contexto relacionado a la compañía
`-- Customer // Modulo de compradores
|       |-- Application
|       |   |-- Create // Inside the application layer all is structured by actions
|       |   |   |-- CustomerCreate.ts
|       |   |
|       |   |
|       |   |
|       |   `-- Search
|       |-- Domain
|       |   |-- Customer.ts // The Aggregate of the Module
|       |   |-- CustomerUid.ts 
|       |   |-- CustomerEmail.ts
|       |   |-- CustomerRepository.ts // Interface to inject
|       |
|       |
|       `-- Infrastructure // The infrastructure of our module
|           |
|           `-- Persistence
|               `--CustomerRepositoryFirebase.php // Una implementación del repositorio
|
|   `-- Contract ...
|
|   `-- Backoffice ...
|
`-- Shared // Shared Kernel: Infraestructura compartida como drivers de bases de datos y persistencia.
    |-- Domain
    `-- Infrastructure
```
