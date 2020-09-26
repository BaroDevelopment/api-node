import LOGGER from '../Logger'
import redis, {RedisClient} from 'redis'

/**
 * Singleton class
 */
export default class Redis {

    private static instance: RedisClient

    private constructor() {
    }

    static getInstance(): RedisClient {

        if (!Redis.instance){
            const port = Number(process.env.REDIS_PORT) || 6379
            const host = process.env.REDIS_HOST || "127.0.0.1"
            Redis.instance = redis.createClient(port, host);

            Redis.instance.on("error", function(error : Error) {
                LOGGER.getInstance().error(error)
            });

            Redis.instance.on("connect", () => {
                LOGGER.getInstance().info('Connected to redis server')
            });
        }

        return Redis.instance
    }
}