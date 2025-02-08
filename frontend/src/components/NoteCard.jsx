import React from "react";

const NoteCard = ({ title, content, category, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <h3 className="font-semibold text-lg text-gray-800 break-words">
          {title}
        </h3>
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full whitespace-nowrap">
          {category}
        </span>
      </div>
      <p className="mt-2 text-gray-600 break-words">{content}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
