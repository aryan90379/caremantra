"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BlockRenderer = ({ block }) => {
  const { type, color, content } = block;

  switch (type) {
    case "h1":
      return <h1 className={`text-3xl font-bold pb-2 ${color}`}>{content}</h1>;
    case "h2":
      return <h2 className={`text-2xl font-semibold pb-2 ${color}`}>{content}</h2>;
    case "h3":
      return <h3 className={`text-xl font-medium pb-2 ${color}`}>{content}</h3>;
    case "paragraph":
      return (
        <p
          className={`text-lg leading-relaxed ${color}`}
          dangerouslySetInnerHTML={{ __html: content.replace(/<a /g, '<a class="text-blue-600 underline" ') }}
        ></p>
      );
    case "daily-list-item":
      return (
        <p className="text-md leading-relaxed font-semibold mt-4 px-4 py-2 rounded-lg text-gray-900 dark:text-gray-200 shadow-sm">
          {content}
        </p>
      );
    case "list":
      return (
        <ul className={`list-disc pl-5 ${color}`}>
          {content.split("\n").filter((item) => item.trim()).map((item, index) => (
            <li key={index} className="ml-2">{item.trim()}</li>
          ))}
        </ul>
      );
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

const AnimatedBlock = ({ block }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <BlockRenderer block={block} />
    </motion.div>
  );
};

const ParseContentClient = ({ blocks }) => {
  return (
    <div className="w-full rounded-lg py-4 space-y-4">
      {blocks.map((block, index) => (
        <AnimatedBlock key={index} block={block} />
      ))}
    </div>
  );
};

export default ParseContentClient;
