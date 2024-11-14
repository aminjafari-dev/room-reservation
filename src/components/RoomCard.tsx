import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onClick: () => void;
}

export function RoomCard({ room, isSelected, onClick }: RoomCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-blue-500 transform scale-[1.02]'
          : 'hover:shadow-lg'
      }`}
    >
      <div className="relative h-48">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
          {room.name}
        </h3>
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-600">{room.description}</p>
      </div>
    </div>
  );
}