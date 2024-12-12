import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const Generate = () => {
  const [InputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [generateTrigger, setGenerateTrigger] = useState(false);

  console.log(message);

  const openPopup = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const Download = async (imageUrl) => {
    try {
      const newImageUrl = imageUrl.replace(
        "https://image.lexica.art/md2_webp/",
        "https://image.lexica.art/full_webp/"
      );
      const response = await fetch(newImageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      
      const blob = await response.blob(); 
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); 
      link.download = `image-${Date.now()}.jpg`; 
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link); 
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Fetch initial images on page load
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/GetImages");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Fetch images based on input when generateTrigger changes to true
  useEffect(() => {
    const fetchText = async () => {
      if (generateTrigger) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/sendText?name=${encodeURIComponent(InputVal)}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setImages(data);
          setMessage(`Found ${data.length} images for "${InputVal}"`);
        } catch (error) {
          console.error("Error fetching text:", error);
          setMessage("Error fetching images");
        } finally {
          setLoading(false);
          setGenerateTrigger(false); // Reset trigger
        }
      }
    };

    fetchText();
  }, [generateTrigger]);

  return (
    <div>
      <Navbar />
      <div className="p-4 flex items-center justify-center flex-col">
        <div className="flex items-center justify-center p-1 bg-[#23272157] border border-red-500 rounded-lg outline-none gap-2 mb-4">
          <input
            value={InputVal}
            onChange={(e) => setInputVal(e.target.value)}
            type="text"
            className="outline-none bg-transparent w-[25vw] p-1 rounded-lg"
            placeholder="Search images..."
          />
          <button
            onClick={() => {
              setGenerateTrigger(true);
            }}
            className="text-white font-bold py-2 px-4 rounded transition transform text-[15px] bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 active:scale-95"
          >
            Generate
          </button>
        </div>

        {loading ? (
          <div role="status" className="flex items-center justify-center">
             <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow">
                <img
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={() => openPopup(image)}
                  src={image}
                  alt={`Fetched ${index}`}
                />
              </div>
            ))}
            {isPopupOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
                  <img
                    src={selectedImageUrl}
                    alt="Popup"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <button
                    onClick={() => Download(selectedImageUrl)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Download Image
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">{message || "No images available."}</p>
        )}
      </div>
    </div>
  );
};

export default Generate;
