export interface EndpointConfig {
  baseUrl: string;
  timeoutMs: number;
}

export interface PlatformConfig {
  cpWeb: EndpointConfig;
  cpDesktop: EndpointConfig;
  lifeguardMobile: EndpointConfig;
  api: EndpointConfig;
}
