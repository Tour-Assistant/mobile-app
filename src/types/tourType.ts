export type EVENT_STATUS = 'UPCOMING' | 'CLOSED';

export interface HostAuthority {
  name: string;
  phone: string;
}

export interface HostedBy {
  id: string;
  name: string;
  curatedName: string;
  isFavorite: string;
  isRunning: string;
  link: {
    page: string;
    group: string;
  };
  authorities: HostAuthority[];
}

export interface Tour {
  id: string;
  title: string;
  curatedTitle: string;
  reference: string;
  eventStatus: EVENT_STATUS;
  startAt: string;
  division: string;
  district: string;
  hostedBy: HostedBy;
  places: string[];
  budget: number;
  description: string;
  createdAt: string;
}
