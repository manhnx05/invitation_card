export interface RSVP {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guestOf: 'groom' | 'bride';
  count: number;
  message: string;
  timestamp: string;
}

export interface Greeting {
  id: string;
  name: string;
  message: string;
  guestOf: 'groom' | 'bride';
  timestamp: string;
  likes: number;
}
