import { Link } from './link.model';
import { StatusResponse } from './status-response.model';

export interface CreateLinkResponse extends StatusResponse {
  existed: boolean;
  link: Link;
}
