export type Proxy = {
    ip: string,
    port: string
}

export type ProxyList = {
    http: Proxy[],
    https: Proxy[],
    socks4: Proxy[],
    socks5: Proxy[]
} | null