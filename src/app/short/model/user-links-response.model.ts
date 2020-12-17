import { StatusResponse } from './status-response.model';
import { Link } from './link.model';

export interface UserLinksResponse extends StatusResponse {
  links: Link[];
}
