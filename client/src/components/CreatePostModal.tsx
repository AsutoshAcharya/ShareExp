import { useState, FormEvent, useMemo } from "react";
import clsx from "clsx";

function CreatePostModal() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string | File | null) => {
    const newErrors = { ...errors };
    if (field === "title") {
      if (typeof value === "string" && value.length > 50) {
        newErrors.title = "Title cannot exceed 50 characters.";
      } else {
        delete newErrors.title;
      }
    }
    if (field === "content") {
      if (typeof value === "string" && value.length > 1000) {
        newErrors.content = "Content cannot exceed 1000 characters.";
      } else {
        delete newErrors.content;
      }
    }
    if (field === "image") {
      if (value instanceof File && value.size > 2 * 1024 * 1024) {
        newErrors.image = "Image size cannot exceed 2 MB.";
      } else {
        delete newErrors.image;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      // console.log("Post Published:", { title, content, image });

      setTitle("");
      setContent("");
      setImage(null);
      setErrors({});
    }
  };

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box p-6 bg-white rounded-lg shadow-md transform transition duration-300 scale-95 hover:scale-100">
        <h3 className="font-bold text-xl mb-4">Create a Post</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                validateField("title", value);
              }}
              className="input input-bordered w-full"
              placeholder="Enter your title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Body</label>
            <textarea
              required
              value={content}
              onChange={(e) => {
                const value = e.target.value;
                setContent(value);
                validateField("content", value);
              }}
              className="textarea textarea-bordered w-full h-32 max-h-96"
              placeholder="Write your content"
            ></textarea>
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Upload Image</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                validateField("image", file);
              }}
              className="file-input file-input-bordered w-full"
              accept="image/*"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>
          <div className="modal-action flex justify-between">
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_1")?.close()}
            >
              Close
            </button>
            <button
              type="submit"
              className={clsx("btn btn-primary", { "btn-disabled": hasErrors })}
              disabled={hasErrors}
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default CreatePostModal;
