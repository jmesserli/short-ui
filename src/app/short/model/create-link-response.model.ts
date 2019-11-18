export interface CreateLinkResponse {
  existed: boolean;
  link: {
    short: string;
    long: string;
    user: string;
  };
  status: 'ok' | 'error';
}
