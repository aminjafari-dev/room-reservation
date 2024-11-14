import React from 'react';
import { Reservation, Room, rooms } from '../types';
import { format } from '../utils';

interface ReservationListProps {
  reservations: Reservation[];
  roomId: string;
}

export function ReservationList({ reservations, roomId }: ReservationListProps) {
  const roomReservations = reservations.filter(r => r.roomId === roomId);
  const room = rooms.find(r => r.id === roomId) as Room;

  if (roomReservations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reservations for this room yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{room.name} Reservations</h3>
      <div className="space-y-2">
        {roomReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  {format(new Date(reservation.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  {reservation.startTime} - {reservation.endTime}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                Reserved on {format(new Date(reservation.createdAt), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}