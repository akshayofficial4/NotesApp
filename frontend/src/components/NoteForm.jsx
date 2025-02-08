import React, { useEffect, useState } from "react";

const NoteForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "Personal",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        content: "",
        category: "Personal",
      });
    }
  }, [initialData]);

  {
    /* State to store validation errors */
  }

  const [errors, setErrors] = useState({});

  {
    /* Form Validation.. */
  }

  const validateForm = () => {
    const newErrors = {}; // Empty object to store arrays..

    if (!formData.title.trim()) {
      newErrors.title = "Title is required..";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required...";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // checking the error state...
  };

  {
    /* function for handle submit*/
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);

      if (!initialData) {
        setFormData({
          title: "",
          content: "",
          category: "Personal",
        });
      }
    }
  };

  const handleChange = (event) => {
    const target = event.target; // Get the target element
    const value = target.value; // Get its value
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Title input section... */}

      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 "
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:border-blue-500 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600"> {errors.title} </p>
        )}
      </div>

      {/* Content text area... */}

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows="4"
          value={formData.content}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
      focus:border-blue-500 focus:ring-blue-500 
      ${errors.content ? "border-red-500" : ""}`}
        />

        {errors.content && (
          <p className="mt-1 text-sm text-red-600"> {errors.content} </p>
        )}
      </div>

      {/* Category... */}

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 w-full block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Ideas">Ideas</option>
        </select>
      </div>

      <div className="flex gap-3">
        {/* Submit button...*/}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {" "}
          {initialData ? "Update note" : "Create note"}{" "}
        </button>

        {/* cancel button only shown when the tab is on editing */}

        {onCancel && (
          <button
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
