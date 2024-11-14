import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Room, Reservation, rooms } from './types';
import { RoomCard } from './components/RoomCard';
import { TimeSelector } from './components/TimeSelector';
import { ReservationList } from './components/ReservationList';
import { format, isTimeConflict } from './utils';

function App() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleReservation = () => {
    if (!selectedRoom || !selectedDate || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }

    // Check for conflicts
    const conflictingReservation = reservations.find(
      (r) =>
        r.roomId === selectedRoom &&
        r.date === selectedDate &&
        isTimeConflict(r.startTime, r.endTime, startTime, endTime)
    );

    if (conflictingReservation) {
      alert('This time slot is already reserved');
      return;
    }

    const newReservation: Reservation = {
      id: Date.now().toString(),
      roomId: selectedRoom,
      date: selectedDate,
      startTime,
      endTime,
      createdAt: new Date().toISOString(),
    };

    setReservations([...reservations, newReservation]);
    resetForm();
  };

  const resetForm = () => {
    setSelectedRoom(null);
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Room Reservation System
          </h1>
          <p className="text-lg text-gray-600">
            Book our conference or podcast room for your next meeting or recording
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {rooms.map((room: Room) => (
            <RoomCard
              key={room.id}
              room={room}
              isSelected={selectedRoom === room.id}
              onClick={() => setSelectedRoom(room.id)}
            />
          ))}
        </div>

        {selectedRoom && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Make a Reservation</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <TimeSelector
                label="Start Time"
                value={startTime}
                onChange={setStartTime}
                disabled={!selectedDate}
              />

              <TimeSelector
                label="End Time"
                value={endTime}
                onChange={setEndTime}
                minTime={startTime}
                disabled={!startTime}
              />

              <div className="flex items-end">
                <button
                  onClick={handleReservation}
                  disabled={!selectedDate || !startTime || !endTime}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Reserve Room
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <ReservationList reservations={reservations} roomId="conference" />
          <ReservationList reservations={reservations} roomId="podcast" />
        </div>
      </div>
    </div>
  );
}

export default App;