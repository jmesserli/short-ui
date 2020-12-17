import { StatusResponse } from './status-response.model';

export interface ExistsResponse extends StatusResponse {
  exists: boolean;
  url?: string;
  user_id?: string;
  user_name?: string;
}
