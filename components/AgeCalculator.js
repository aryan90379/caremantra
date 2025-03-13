"use client";
import React, { useState, useEffect } from "react";
import { updateSectionViews } from "@/actions/useractions";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [history, setHistory] = useState([]);

  const updateBlogSectionViews = async () => {
    const section = "age-calculator"; // Define the specific section

    const viewedSections =
      JSON.parse(localStorage.getItem("viewedSections")) || {};
    // console.log("Viewed sections:", viewedSections);
    console.log(section)

    if (!viewedSections[section]) {
      try {
        const updatedViews = await updateSectionViews(section);
        viewedSections[section] = true;
        localStorage.setItem("viewedSections", JSON.stringify(viewedSections));
        console.log(`Updated views for section "${section}":`, updatedViews);
      } catch (error) {
        console.error("Error updating section views:", error);
      }
    }
  };

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("ageHistory")) || [];
    setHistory(savedHistory);
    updateBlogSectionViews();
  }, []);

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const calculatedAge = { years, months, days };
    setAge(calculatedAge);

    const newEntry = {
      dob,
      age: `${years} years, ${months} months, ${days} days`,
      timestamp: new Date().toLocaleString(),
    };

    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("ageHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black px-4 md:px-8">
      <div className="w-full max-w-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-[3px] rounded-xl shadow-lg">
        <div className="bg-black text-white p-6 md:p-8 rounded-xl w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Age Calculator
          </h1>

          {/* Date of Birth Input */}
          <div className="flex flex-col items-center">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 md:p-4 bg-gray-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={calculateAge}
              className="w-full mt-4 p-4 bg-blue-600 text-white font-semibold text-lg rounded-lg transition duration-200 hover:bg-blue-700 active:scale-95"
            >
              Calculate Age
            </button>
          </div>

          {/* Age Display */}
          {age && (
            <div className="mt-6 text-center text-lg md:text-xl font-semibold text-green-400">
              {age.years} years, {age.months} months, {age.days} days
            </div>
          )}

          {/* Age History */}
          {history.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-300">
                Past Calculations
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg space-y-2 max-h-40 overflow-y-auto">
                {history.map((entry, index) => (
                  <div key={index} className="text-white text-sm flex flex-col">
                    <span>DOB: {entry.dob}</span>
                    <span className="font-semibold text-blue-400">
                      {entry.age}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {entry.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
