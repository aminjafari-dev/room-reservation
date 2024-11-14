export interface Reservation {
  id: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const rooms: Room[] = [
  {
    id: 'conference',
    name: 'Conference Room',
    description: 'Professional meeting space for team collaborations and presentations',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'podcast',
    name: 'Podcast Room',
    description: 'Soundproof studio perfect for podcast recording and audio production',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
  },
];