"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [dogDetails, setDogDetails] = useState({
    name: "",
    breed: "",
    size: "",
    activityLevel: "",
    goodWithKids: "",
    temperament: "",
    shedding: "",
    maintenanceCost: "",
    location: "",
    image: "",
  });

  const [breeds, setBreeds] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  // Fetch dog data
  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await fetch(`/api/pet/${id}`);
        const data = await res.json();
        setDogDetails({
          ...data,
          goodWithKids: data.goodWithKids ? "true" : "false",
        });
      } catch (error) {
        console.error("Error fetching dog data:", error);
      }
      finally {
        setIsLoading(false); // Done loading
      }
    };

    fetchDog();
  }, [id]);

  // Fetch breeds
  useEffect(() => {
    fetch("/api/dogbreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogDetails((prev) => ({
      ...prev,
      [name]: name === "goodWithKids" ? value === "true" : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDogDetails((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...dogDetails,
      goodWithKids: dogDetails.goodWithKids === "true",
    };

    try {
      const res = await fetch(`/api/pet/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update dog");

      alert("Dog updated successfully!");
      router.push("/mylistings"); // Redirect to listing page
    } catch (error) {
      console.error("Error updating dog:", error);
      alert("Error updating dog");
    }
  };

   // ⏳ Show loading spinner while fetching
   if (isLoading || !dogDetails) {
    return <p className="text-center mt-10">Loading dog info...</p>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Edit Dog Info
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={dogDetails.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Breed</label>
            <select
              name="breed"
              value={dogDetails.breed}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Breed</option>
              {breeds.map((breed) => (
                <option key={breed._id} value={breed.breed}>
                  {breed.breed}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Size</label>
            <select
              name="size"
              value={dogDetails.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          
          {/* Activity Level */}
          <div>
            <label className="block font-medium">Activity Level</label>
            <select
              name="activityLevel"
              value={dogDetails.activityLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Good with Kids */}
          <div>
            <label className="block font-medium">Good With Kids</label>
            <select
              name="goodWithKids"
              value={dogDetails.goodWithKids}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Temperament, Shedding, Maintenance, Location */}
          <div>
            <label className="block font-medium">Temperament</label>
            <input
              type="text"
              name="temperament"
              value={dogDetails.temperament}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Shedding</label>
            <select
              name="shedding"
              value={dogDetails.shedding}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Maintenance Cost</label>
            <select
              name="maintenanceCost"
              value={dogDetails.maintenanceCost}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={dogDetails.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium">Upload New Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Update 
          </button>
        </form>
      </div>
    </div>
  );
}
