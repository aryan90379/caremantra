"use client";
import React, { useState } from "react";

const ArticleEditor = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ heading: "", content: [] });
  const [inputText, setInputText] = useState("");
  const [contentType, setContentType] = useState("paragraph");

  const addContent = () => {
    if (!inputText.trim()) return;

    const newContent = { type: contentType, text: inputText };
    if (contentType === "bullet_points") {
      newContent.items = inputText.split(",").map((item) => item.trim());
      delete newContent.text;
    }

    setNewSection({ ...newSection, content: [...newSection.content, newContent] });
    setInputText("");
  };

  const saveSection = () => {
    if (!newSection.heading.trim() || newSection.content.length === 0) return;
    setSections([...sections, newSection]);
    setNewSection({ heading: "", content: [] });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dynamic Article Editor</h1>

      {/* Section Input */}
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Section Heading"
        value={newSection.heading}
        onChange={(e) => setNewSection({ ...newSection, heading: e.target.value })}
      />

      {/* Content Input */}
      <div className="flex gap-2 mb-2">
        <select
          className="p-2 border rounded"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="paragraph">Paragraph</option>
          <option value="bullet_points">Bullet Points (comma-separated)</option>
          <option value="subheading">Subheading</option>
        </select>
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Enter content"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          onClick={addContent}
        >
          Add
        </button>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-4"
        onClick={saveSection}
      >
        Save Section
      </button>

      {/* Live Preview */}
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold text-gray-700">{section.heading}</h2>
            {section.content.map((content, idx) => {
              if (content.type === "paragraph") 
                return <p key={idx} className="text-gray-600">{content.text}</p>;
              if (content.type === "bullet_points")
                return (
                  <ul key={idx} className="list-disc ml-5 text-gray-600">
                    {content.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              if (content.type === "subheading")
                return <h3 key={idx} className="text-xl font-semibold text-gray-800">{content.text}</h3>;
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleEditor;
