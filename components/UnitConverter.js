"use client";
import React, { useState } from "react";
import { updateSectionViews } from "@/actions/useractions";

const unitCategories = {
  Length: { Meter: 1, Kilometer: 0.001, Centimeter: 100, Inch: 39.3701 },
  Weight: { Kilogram: 1, Gram: 1000, Pound: 2.20462, Ounce: 35.274 },
  Temperature: { Celsius: "C", Fahrenheit: "F", Kelvin: "K" },
  Energy: { Joule: 1, Calorie: 0.239006, "Kilowatt-hour": 0.0000002778 },
  Speed: { "Meters/sec": 1, "Kilometers/hour": 3.6, "Miles/hour": 2.23694 },
};

const convertUnits = (value, from, to, category) => {
  if (category === "Temperature") {
    if (from === "Celsius" && to === "Fahrenheit") return (value * 9) / 5 + 32;
    if (from === "Celsius" && to === "Kelvin") return value + 273.15;
    if (from === "Fahrenheit" && to === "Celsius") return ((value - 32) * 5) / 9;
    if (from === "Fahrenheit" && to === "Kelvin") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "Kelvin" && to === "Celsius") return value - 273.15;
    if (from === "Kelvin" && to === "Fahrenheit") return ((value - 273.15) * 9) / 5 + 32;
    return value;
  }
  return (value * unitCategories[category][to]) / unitCategories[category][from];
};

const updateBlogSectionViews = async () => {
  const section = "unit-convertor"; // Define the specific section

  const viewedSections =
    JSON.parse(localStorage.getItem("viewedSections")) || {};
  // console.log("Viewed sections:", viewedSections);

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

updateBlogSectionViews();

const UnitConverter = () => {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState(null); // Null prevents showing stale results

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const units = Object.keys(unitCategories[newCategory]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setInputValue("");
    setOutputValue(null);
  };

  const handleConvert = () => {
    if (inputValue === "" || isNaN(inputValue)) return;
    const result = convertUnits(parseFloat(inputValue), fromUnit, toUnit, category);
    setOutputValue(result.toFixed(4));
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black p-6">
      <div className="w-full max-w-4xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-[3px] rounded-xl shadow-lg">
        <div className="bg-black text-white p-8 rounded-xl w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Unit Converter</h1>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.keys(unitCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  category === cat ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-4 bg-gray-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between items-center">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-1/2 p-3 bg-gray-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(unitCategories[category]).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>

              <span className="text-2xl font-bold text-white mx-4">➡</span>

              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-1/2 p-3 bg-gray-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(unitCategories[category]).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleConvert}
              className="w-full p-4 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition"
            >
              Convert
            </button>

            {/* Output Result */}
            {outputValue !== null && (
              <div className="text-center text-2xl font-semibold mt-6 bg-gray-900 p-4 rounded-lg">
                {inputValue} {fromUnit} = {outputValue} {toUnit}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
