import ParseContentClient from "./ParseContentClient";

const parseContent = (content) => {
  const regex = /<block type="(.*?)"(?: color="(.*?)")?><!\[CDATA\[(.*?)\]\]><\/block>/gs;
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

// Get today's list item **on the server**
const getItemForToday = (items) => {
  const now = new Date();
  const dayIndex = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  return items[dayIndex % items.length]; // Ensure it wraps around if needed
};

export default function ParseContentServer({ value }) {
  if (!value) {
    return <div className="text-gray-500 dark:text-gray-400">No content available</div>;
  }

  let blocks = parseContent(value);

  // Find and modify the last list item **on the server**
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].type === "list") {
      const items = blocks[i].content.split("\n").filter((item) => item.trim());

      if (items.length >= 7) {
        blocks[i] = {
          type: "daily-list-item", // Mark it as a manually changed item
          color: blocks[i].color,
          content: getItemForToday(items), // Select the correct item **before rendering**
        };
      }
      break;
    }
  }

  return <ParseContentClient blocks={blocks} />;
}
