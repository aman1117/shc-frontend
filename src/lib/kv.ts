import { Redis } from "ioredis";
const redis = new Redis(process.env.REDIS_URL!);

export namespace KV {
  export async function get(key: string) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  export async function set(key: string, value: any, expiry: number = 3600) {
    const serializedValue = JSON.stringify(value);
    return await redis.set(key, serializedValue, "EX", expiry);
  }

  export async function del(key: string) {
    return await redis.del(key);
  }
}
