import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export function getRedis() {
  if (!redisClient) {
    redisClient = Redis.fromEnv();
  }

  return redisClient;
}

export const redis = new Proxy({} as Redis, {
  get(_target, prop) {
    const client = getRedis();
    const value = client[prop as keyof Redis];

    return typeof value === "function" ? value.bind(client) : value;
  },
});
