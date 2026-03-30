"use client";

import { useState } from "react";

type FaqItem = { _id: string; question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <dl className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <dt>
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center gap-4 p-5 md:p-6 text-left font-semibold text-dark bg-transparent border-none cursor-pointer hover:bg-bg-light transition-colors duration-200"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <span
                className={`shrink-0 text-primary text-xl transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
          </dt>
          {openIndex === index && (
            <dd className="px-5 md:px-6 pb-5 md:pb-6 text-text-light leading-relaxed">
              {item.answer}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
