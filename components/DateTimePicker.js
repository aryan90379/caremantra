import React, { useState, useEffect } from "react";

// Define time slots for selection
const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export default function DateTimePicker({ value, onChange }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showTimes, setShowTimes] = useState(false);

  // Convert backend UTC ISO format to IST for UI display
  const parseBackendValue = (backendValue) => {
    if (!backendValue) return { formattedDate: "", formattedTime: "" };

    const dateObj = new Date(backendValue); // Convert ISO string to Date object
    const istOffset = 5.5 * 60 * 60 * 1000; // Convert UTC to IST (UTC+5:30)
    const localDateTime = new Date(dateObj.getTime() + istOffset);

    const formattedDate = localDateTime.toISOString().split("T")[0]; // Extract YYYY-MM-DD

    // Convert 24-hour time to 12-hour format with AM/PM
    let hours = localDateTime.getHours();
    let minutes = localDateTime.getMinutes();
    let meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12-hour format
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${meridian}`;

    return { formattedDate, formattedTime };
  };

  useEffect(() => {
    if (value) {
      const { formattedDate, formattedTime } = parseBackendValue(value);
      setDate(formattedDate);
      setTime(formattedTime);
    }
  }, [value]);

  // Convert UI-selected IST Date & Time to backend UTC ISO format
  const formatForBackend = (selectedDate, selectedTime) => {
    if (!selectedDate || !selectedTime) return "";

    let [hourMinute, meridian] = selectedTime.split(" ");
    let [hour, minute] = hourMinute.split(":").map(Number);

    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    // Create IST DateTime and convert it to UTC
    const istDateTime = new Date(`${selectedDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+05:30`);
    const utcDateTime = new Date(istDateTime.getTime() - (5.5 * 60 * 60 * 1000)); // Convert IST to UTC

    return utcDateTime.toISOString();
  };

  // Handle Date Change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const newFormattedValue = formatForBackend(selectedDate, time);
    onChange(newFormattedValue);
  };

  // Handle Time Change
  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    setShowTimes(false);
    const newFormattedValue = formatForBackend(date, selectedTime);
    onChange(newFormattedValue);
  };

  return (
    <div className="flex flex-col items-center dark:text-black dark:bg-gray space-y-4 p-4">
      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="w-64 p-2 border rounded-md"
      />

      {/* Time Picker */}
      <div className="relative w-64">
        <button
          type="button"
          className="w-full p-2 border rounded-md bg-gray-300 text-left"
          onClick={() => setShowTimes(!showTimes)}
        >
          {time || "Pick a time"}
        </button>

        {showTimes && (
          <div className="absolute mt-1 w-full rounded-md bg-gray-300 border shadow-md z-10 max-h-40 overflow-y-auto">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleTimeChange(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
