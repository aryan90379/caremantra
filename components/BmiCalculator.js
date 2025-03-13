"use client";
import React, { useState, useEffect } from "react";
import { updateSectionViews } from "@/actions/useractions";
const BMI_CATEGORIES = [
  { label: "Underweight", max: 18.5, color: "text-blue-400" },
  { label: "Normal weight", max: 24.9, color: "text-green-400" },
  { label: "Overweight", max: 29.9, color: "text-yellow-400" },
  { label: "Obese", max: Infinity, color: "text-red-400" },
];

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    
    setHistory(savedHistory);

  }, []);
  useEffect(() => {
    const updateBlogSectionViews = async () => {
      const section = "bmi-calculator"; // Corrected section name
  
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
    updateBlogSectionViews();
   
  }, []);
  

  const getCurrentTimestamp = () => {
    const now = new Date();
    return (
      now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }) + ` - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    );
  };

  const convertToMetric = () => {
    let weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight;
    let heightInCm =
      heightUnit === "feet" ? feet * 30.48 + inches * 2.54 : height;
    return { weightInKg, heightInCm };
  };

  const calculateBMI = () => {
    if (
      !weight ||
      (!height && heightUnit !== "feet") ||
      (heightUnit === "feet" && (!feet || !inches))
    )
      return;

    const { weightInKg, heightInCm } = convertToMetric();
    const heightMeters = heightInCm / 100;
    const calculatedBmi = (weightInKg / (heightMeters * heightMeters)).toFixed(
      2
    );
    setBmi(calculatedBmi);

    const matchedCategory = BMI_CATEGORIES.find(
      (cat) => calculatedBmi <= cat.max
    );
    setCategory(matchedCategory.label);

    const newEntry = {
      weight: `${weight} ${weightUnit}`,
      height: heightUnit === "feet" ? `${feet}ft ${inches}in` : `${height}cm`,
      bmi: calculatedBmi,
      category: matchedCategory.label,
      timestamp: getCurrentTimestamp(), // Timestamp correctly set
    };

    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 px-4 md:px-8">
  <div className="w-full max-w-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 p-[3px] rounded-xl shadow-xl">
    <div className="bg-gray-950 text-white p-6 md:p-8 rounded-xl w-full">
      <h1 className="text-3xl font-bold text-center mb-6">BMI Calculator</h1>

      {/* Weight Input */}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Enter weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value)}
          className="p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>

      {/* Height Input */}
      {heightUnit === "cm" ? (
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="number"
            placeholder="Enter height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
            className="p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="cm">cm</option>
            <option value="feet">feet/inches</option>
          </select>
        </div>
      ) : (
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="number"
            placeholder="Feet"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            className="w-1/2 p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Inches"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
            className="w-1/2 p-3 bg-gray-800 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={calculateBMI}
        className="w-full mt-6 p-4 bg-blue-500 text-white font-semibold text-lg rounded-lg transition duration-200 hover:bg-blue-600 active:scale-95"
      >
        Calculate BMI
      </button>

      {/* BMI History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-300">
            Past Calculations
          </h2>
          <div className="bg-gray-800 p-4 rounded-lg space-y-2 max-h-40 overflow-y-auto">
            {history.map((entry, index) => (
              <div key={index} className="text-white text-sm flex flex-col">
                <span>
                  {entry.weight} / {entry.height}
                </span>
                <span
                  className={`font-semibold ${
                    BMI_CATEGORIES.find((cat) => entry.bmi <= cat.max).color
                  }`}
                >
                  {entry.bmi} - {entry.category}
                </span>
                <span className="text-gray-400 text-xs">{entry.timestamp}</span>
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

export default BMICalculator;
