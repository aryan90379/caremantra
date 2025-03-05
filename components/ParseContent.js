import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const BlockRenderer = ({ block, isFirst }) => {
  const { type, color, content } = block;

  const styledContent = isFirst ? (
    <p
      className={`mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start`}
      dangerouslySetInnerHTML={{ __html: content.replace(/<a /g, '<a class="text-blue-600 underline" ') }}
    ></p>
  ) : (
    <p
      className={`text-lg leading-relaxed ${color}`}
      dangerouslySetInnerHTML={{ __html: content.replace(/<a /g, '<a class="text-blue-600 underline" ') }}
    ></p>
  );

  switch (type) {
    case "h1":
      return <h1 className={`text-3xl font-bold pb-2 ${color}`}>{content}</h1>;
    case "h2":
      return <h2 className={`text-2xl font-semibold pb-2 ${color}`}>{content}</h2>;
    case "h3":
      return <h3 className={`text-xl font-medium pb-2 ${color}`}>{content}</h3>;
    case "paragraph":
      return styledContent;
    case "list": {
      const items = content
        .split("\n")
        .filter((item) => item.trim())
        .map((item, index) => <li key={index} className="ml-2">{item.trim()}</li>);
      return <ul className={`list-disc pl-5 ${color}`}>{items}</ul>;
    }
    case "image":
      return content ? (
        <div className="relative w-full h-full my-4">
          <img src={content} alt="Image" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      ) : (
        <p className="text-red-500">Invalid image URL</p>
      );
    case "code":
      return (
        <pre className={`bg-gray-900 text-green-400 font-mono p-4 rounded-lg overflow-x-auto shadow-lg ${color}`}>
          <code>{content}</code>
        </pre>
      );
    default:
      return <p className="text-red-500">Unknown Block Type: {type}</p>;
  }
};

const AnimatedBlock = ({ block, isFirst }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <BlockRenderer block={block} isFirst={isFirst} />
    </motion.div>
  );
};

const ParseContent = ({ value }) => {
  if (!value) {
    return <div className="text-gray-500 dark:text-gray-400">No content available</div>;
  }

  const blocks = parseContent(value);

  return (
    <div className="w-full rounded-lg py-4 space-y-4">
      {blocks.map((block, index) => (
        <AnimatedBlock key={index} block={block} isFirst={index === 0} />
      ))}
    </div>
  );
};

export default ParseContent;
