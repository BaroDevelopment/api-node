# BaroBot Node Api

## Local development
### Postgres
Start your local postgres using
```
docker run -d -v barobot_node_api_postgres:/var/lib/postgresql/data -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=BaroBot postgres
```

### Redis
Start your local redis server using

```
docker run -d  -p 6379:6379 --name redis -v redis-data:/data redis
```

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
      PG_CONNECTION_STRING: <your_pg_connection_string>
      PORT: <express_port>
      REDIS_PORT: <REDIS_PORT>
      REDIS_HOST: <REDIS_HOST>
```


## Environment Variables
| Environment Variable |    Description   |                        Default                        |
|:--------------------:|:----------------:|:-----------------------------------------------------:|
|         PORT         | Express API Port |                          5000                         |
|      REDIS_PORT      |                  |                          6379                         |
| PG_CONNECTION_STRING |                  | postgresql://postgres:postgres@localhost:5432/BaroBot |
|      REDIS_HOST      |                  |                       127.0.0.1                       |