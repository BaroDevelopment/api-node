# BaroBot Node Api

## Start a instance
`docker run --name barobot-node-api \ 
-e PG_CONNECTION_STRING=your_pg_connection_string \
-d barodev/barobot-api-node
`

## Usage with docker-compose
```
version: '3.1'

services:

  barobot-node-api:
    image: barobot-node-api
    restart: always
    environment:
      PG_CONNECTION_STRING: your_pg_connection_string
```