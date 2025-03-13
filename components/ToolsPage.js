import React from 'react';
import Link from 'next/link';
import { Calculator, Ruler, Calendar } from "lucide-react";

const tools = [
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index based on your weight and height.",
    icon: <Calculator className="w-10 h-10 text-blue-500" />,
    link: "/tools/bmi-calculator",
  },
  {
    name: "Unit Converter",
    description: "Easily convert units of measurement like length, weight, and temperature.",
    icon: <Ruler className="w-10 h-10 text-green-500" />,
    link: "/tools/unit-converter",
  },
  {
    name: "Age Calculator",
    description: "Find out your exact age in years, months, and days.",
    icon: <Calendar className="w-10 h-10 text-purple-500" />,
    link: "/tools/age-calculator",
  },
];

const ToolsPage = ({ aside = false }) => {
    return (
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${aside? "p-0": "p-6"}`}>
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Tools</h1>
  
        <div className={`grid ${aside ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-6 max-w-5xl mx-auto`}>
          {tools.map((tool, index) => (
            <Link key={index} href={tool.link} passHref>
              <article
                className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-md hover:[animation-duration:_4s] dark:shadow-gray-700/25 cursor-pointer"
              >
                <div className="rounded-[10px] bg-white p-6 dark:bg-gray-800">
                  <div className="flex justify-center">{tool.icon}</div>
  
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white text-center">
                    {tool.name}
                  </h3>
  
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                    {tool.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  

export default ToolsPage;
