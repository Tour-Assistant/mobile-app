export type EVENT_STATUS = "UPCOMING" | "CLOSED";

export interface Tour {
  id: string;
  title: string;
  reference: string;
  eventStatus: EVENT_STATUS;
  startAt: string;
  details?: {
    content: string;
  };
  metaData: {
    hostedBy: string;
    budget: number;
  };
}
