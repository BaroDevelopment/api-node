import axios, {AxiosRequestConfig} from 'axios'
import express from "express";
import {Request, Response} from "express";
import {ProxyList, Proxy} from "../types/proxy";
import Redis from "../database/Redis";

const router = express.Router();

const REDIS_KEY = 'proxy'

router.get('/', async (req: Request, res: Response) => {

    const cache = Redis.getInstance().get('proxy', (async (err, data) => {
        if (err || !data) {
            const http = await getProxyArray(`https://www.proxy-list.download/api/v1/get?type=http`)
            const https = await getProxyArray(`https://www.proxy-list.download/api/v1/get?type=https`)
            const socks4 = await getProxyArray(`https://www.proxy-list.download/api/v1/get?type=socks4`)
            const socks5 = await getProxyArray(`https://www.proxy-list.download/api/v1/get?type=socks5`)
            const proxyList: ProxyList = {http, https, socks4, socks5}

            res.json(proxyList)
            const encoded = Buffer.from(JSON.stringify(proxyList)).toString('base64')
            Redis.getInstance().set(REDIS_KEY, encoded, 'EX', 60 * 60 * 24)
        }
        else {
            const decoded = Buffer.from(data, 'base64').toString('utf8')
            res.status(201).json(JSON.parse(decoded))
        }
    }))
})

async function getProxyArray(url: string) {
    const result: Proxy[] = []
    const options: AxiosRequestConfig = {
        method: 'GET',
        url,
    };
    try {
        const data = await axios(options).then(res => res.data)
        for (let i = 0; i < data.length; i++) {
            if (data && data.split('\n')[i]) {
                const ip = data.split('\n')[i].split(':')[0]
                const port = data.split('\n')[i].split(':')[1].replace('\r', '')
                result.push({ip, port})
            }
        }
        return result
    } catch (e) {
        return result
    }
}

export default router