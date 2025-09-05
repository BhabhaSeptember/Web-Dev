"use client";

import { useState, useRef } from "react";
import LoadingPage from "../loading"; // Import LoadingPage component

const AddWish = ({ refreshWishes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newWishTitle, setNewWishTitle] = useState("");
  const [newWishLink, setNewWishLink] = useState("");
  const [newWishImage, setNewWishImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const fileInputRef = useRef(null); // Add ref for file input

  const handleSubmitNewWish = async (e) => {
    e.preventDefault();

    // Ensure an image is selected
    if (!newWishTitle || !newWishLink || !newWishImage) {
      alert("All fields are required, including selecting an image...");
      return;
    }

    setLoading(true); // Start loading

    // Prepare FormData to send file
    const formData = new FormData();
    formData.append("title", newWishTitle);
    formData.append("link", newWishLink);
    formData.append("img", newWishImage); // Send file directly

    const res = await fetch(`/api/wishes/`, {
      method: "POST",
      body: formData, // Send FormData instead of JSON
    });

    if (res.ok) {
      setNewWishTitle("");
      setNewWishLink("");
      setNewWishImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input field
      }

      setModalOpen(false);
      refreshWishes();
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="relative">
      <button
        className="btn btn-outline btn-primary fixed top-15 left-4 z-50 shadow-lg"
        onClick={() => setModalOpen(true)}
      >
        Add Wish
      </button>

      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewWish}
        >
          <button
            onClick={() => setModalOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Add New Wish</h3>

          {loading ? ( // Show LoadingPage when loading
            <LoadingPage />
          ) : (
            <>
              <input
                type="text"
                value={newWishTitle}
                onChange={(e) => setNewWishTitle(e.target.value)}
                placeholder="Enter New Wish Title"
                className="input input-bordered w-full max-w-xs mb-4"
                disabled={loading}
              />

              <input
                type="text"
                value={newWishLink}
                onChange={(e) => setNewWishLink(e.target.value)}
                placeholder="Enter New Wish Link"
                className="input input-bordered w-full max-w-xs mb-4"
                disabled={loading}
              />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setNewWishImage(e.target.files[0])}
                className="file-input file-input-bordered w-full max-w-xs mb-6"
                disabled={loading}
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                Add Wish
              </button>
            </>
          )}
        </form>
      </dialog>
    </div>
  );
};
export default AddWish;
