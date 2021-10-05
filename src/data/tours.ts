import { Tour } from "../types/tourType";

const tours: Tour[] = [
  {
    id: "1",
    title: "Demo title",
    reference: "https://google.com",
    eventStatus: "UPCOMING",
    startAt: new Date().toISOString(),
    details: {
      content: "Hello there !!!",
    },
    metaData: {
      hostedBy: "Host name",
      budget: 2222,
    },
  },
];

export const getTours = () => tours;

export const getTour = (id: string) => tours.find((m) => m.id === id);
