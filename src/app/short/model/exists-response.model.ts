export interface ExistsResponse {
  status: 'ok' | 'error';
  exists: boolean;
  url?: string;
  user?: string;
}
