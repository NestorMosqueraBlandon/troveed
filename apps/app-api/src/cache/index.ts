import { createClient } from "redis";

const redisUrl = 'redis://127.0.0.1:6379'
const client = createClient({url: redisUrl});

export const getFromCache = async <R>(key: string) => {
    const res = await client.hGet('api-cache', key);

    return res ? (JSON.parse(res) as R) : null;
}

export const setCache = async (key: string, value: unknown) => {
    await client.hSet('api-cache', key, JSON.stringify(value))
};

export const invalidateCache = async (key: string) => {
    const res = await client.hDel('api-cache', key);

    if(res < 1) throw new Error('Could not invalidate cache')
}