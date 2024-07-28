# Booking Management Project

This project is a booking management system for different flats, built using Django for the backend and React.js for the frontend. It uses Docker Compose to manage the different services required for the project.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Docker installed on your machine.
- Docker Compose installed on your machine.

## Setup

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Create a `.env` file:**

    In the root directory of the project, create a file named `.env` and add the following environment variables with your configurations:

    ```plaintext
    SECRET_KEY=django-insecure-.....
    POSTGRES_DB=.....
    POSTGRES_USER=.....
    POSTGRES_PASSWORD=.....
    POSTGRES_PORT=5432
    DEBUG=True
    ADMIN_USERNAME=admin
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=admin123
    ```

3. **Build and run the Docker containers:**

    Navigate to the root directory of the project and run:

    ```sh
    docker-compose up --build -d
    ```

    This command will build the Docker images and start the containers in detached mode.


## Usage

- The project will automatically create an admin user with the following credentials:
    - **Username:** admin
    - **Email:** admin@example.com
    - **Password:** admin123

- It will also create some sample flat and booking data.

- To access the Django admin panel, navigate to `http://localhost:8000/admin` and log in using the admin credentials.

## Stopping the Containers

To stop the running containers, navigate to the root directory of the project and run:

```sh
docker-compose down
