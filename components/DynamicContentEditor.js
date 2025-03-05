import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const NORMAL_COLORS = [
    // "text"
  "text-red-500",
  "text-gray-800",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-indigo-500",
  "text-gray-500",
  "text-teal-500",
  "text-orange-500",
];

const DARK_COLORS = [
  "dark:text-white",
  "dark:text-gray-100",
  "dark:text-red-400",
  "dark:text-blue-400",
  "dark:text-green-400",
  "dark:text-yellow-400",
  "dark:text-purple-400",
  "dark:text-pink-400",
  "dark:text-indigo-400",
  "dark:text-gray-400",
  "dark:text-teal-400",
  "dark:text-orange-400",
];

const parseContent = (content) => {
  const regex =
    /<block type=\"(.*?)\"(?: color=\"(.*?)\")?><!\[CDATA\[(.*?)\]\]><\/block>/gs;
  const blocks = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      type: match[1],
      color: match[2] || "text-gray-800 dark:text-gray-200",
      content: decodeURIComponent(match[3].trim()),
    });
  }
  return blocks;
};

const DynamicContentEditor = ({ value = "", onChange }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(parseContent(value));
  }, [value]);

  const updateContent = (updatedBlocks) => {
    setBlocks(updatedBlocks);
    onChange(
      updatedBlocks
        .map(
          (b) =>
            `<block type=\"${b.type}\" color=\"${b.color}\"><![CDATA[${encodeURIComponent(
              b.content
            )}]]></block>`
        )
        .join("\n")
    );
  };

  const handleChange = (index, newContent) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block, i) =>
        i === index ? { ...block, content: newContent } : block
      )
    );
  };

  const handleBlur = () => {
    updateContent([...blocks]);
  };

  const handleTypeChange = (index, newType) => {
    const updated = [...blocks];
    updated[index].type = newType;
    updateContent(updated);
  };

  const handleNormalColorChange = (index, newColor) => {
    const updated = [...blocks];
    updated[index].color = `${newColor} ${updated[index].color
      .split(" ")
      .filter((c) => c.startsWith("dark:"))
      .join(" ")}`;
    updateContent(updated);
  };

  const handleDarkColorChange = (index, newColor) => {
    const updated = [...blocks];
    updated[index].color = `${updated[index].color
      .split(" ")
      .filter((c) => !c.startsWith("dark:"))
      .join(" ")} ${newColor}`;
    updateContent(updated);
  };

  const addBlock = () => {
    updateContent([
      ...blocks,
      {
        id: blocks.length + 1,
        type: "paragraph",
        content: "",
        color: "text-gray-800 dark:text-gray-200",
      },
    ]);
  };

  const removeBlock = (index) => {
    updateContent(blocks.filter((_, i) => i !== index));
  };

  const renderField = (block, index) => {
    switch (block.type) {
      case "h1":
      case "h2":
      case "h3":
        return (
          <input
            type="text"
            className={`w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 ${block.color}`}
            value={block.content}
            onChange={(e) => handleChange(index, e.target.value)}
            onBlur={handleBlur}
            placeholder={`${block.type.toUpperCase()}...`}
          />
        );
      case "paragraph":
        return (
          <textarea
            className={`w-full h-28 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 ${block.color}`}
            value={block.content}
            onChange={(e) => handleChange(index, e.target.value)}
            onBlur={handleBlur}
            placeholder="Paragraph..."
          />
        );
      case "list":
        return (
          <textarea
            className={`w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 ${block.color}`}
            value={block.content}
            onChange={(e) => handleChange(index, e.target.value)}
            onBlur={handleBlur}
            placeholder="List Items..."
          />
        );
        case "image":
          return (
            <div className="flex flex-col gap-2">
              <input
                type="url"
                className={`w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 ${block.color}`}
                value={block.content}
                onChange={(e) => handleChange(index, e.target.value)}
                onBlur={handleBlur}
                placeholder="Paste Image URL or Upload Below..."
              />
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-800"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) {
                    alert("No file selected.");
                    return;
                  }
        
                  try {
                    // Generate a random 15-character string as the identifier
                    const randomId = Math.random().toString(36).substring(2, 17);
        
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("id", randomId); // Attach the random ID
        
                    // Upload the file to the server
                    const response = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });
        
                    if (!response.ok) {
                      throw new Error("Failed to upload the image.");
                    }
        
                    // Extract the file path from the response
                    const { filePath } = await response.json();
                    console.log("Image uploaded successfully:", filePath);
        
                    // Update the block content with the uploaded file path (URL)
                    handleChange(index, filePath);
        
                    console.log("Random ID associated with the image:", randomId);
                  } catch (error) {
                    console.error("Error uploading the image:", error.message);
                    alert("An error occurred: " + error.message);
                  }
                }}
              />
            </div>
          );
        
      case "code":
        return (
          <textarea
            className={`w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900 font-mono ${block.color}`}
            value={block.content}
            onChange={(e) => handleChange(index, e.target.value)}
            onBlur={handleBlur}
            placeholder="Code Block..."
          />
        );
      default:
        return <p className="text-red-500">Unknown Type: {block.type}</p>;
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md  sm:p-1 ">
  {blocks.map((block, index) => (
    <div
      key={index}
      className="mb-5 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center py-3 sm:justify-between gap-2">
        <select
          className="p-3 rounded-lg border  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={block.type}
          onChange={(e) => handleTypeChange(index, e.target.value)}
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="paragraph">Paragraph</option>
          <option value="list">List</option>
          <option value="image">Image</option>
          <option value="code">Code</option>
        </select>
        {block.type !== "image" && (
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="p-2 mb4- rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={block.color.split(" ").find((c) => !c.startsWith("dark:"))}
              onChange={(e) => handleNormalColorChange(index, e.target.value)}
            >
              {NORMAL_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={block.color.split(" ").find((c) => c.startsWith("dark:"))}
              onChange={(e) => handleDarkColorChange(index, e.target.value)}
            >
              {DARK_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"          onClick={() => removeBlock(index)}
        >
          Delete
        </button>
      </div>
      {renderField(block, index)}
    </div>
  ))}

<button
  className="group flex items-center justify-between w-fit gap-3 px-5 py-3 bg-blue-600 text-white rounded-lg border border-blue-600 transition-colors hover:bg-transparent hover:text-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-3 focus:outline-none"
  onClick={addBlock}
>
  <span className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-white">
    Add New Block
  </span>

  <span className="shrink-0 rounded-full border border-current bg-white p-2 text-blue-600">
    <AiOutlinePlus className="w-5 h-5" />
  </span>
</button>




</div>

  );
};

export default DynamicContentEditor;
