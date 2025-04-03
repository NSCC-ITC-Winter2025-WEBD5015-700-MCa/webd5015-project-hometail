"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Subscribe from "../subscribe/page";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const ListDogForm = () => {
  const [dogDetails, setDogDetails] = useState({
    name: "",
    breed: "",
    size: "",
    activity: "",
    goodWithKids: "",
    shedding: "",
    maintenanceCost: "",
    location: "",
    image: null,
  });
  const [breeds, setBreeds] = useState([]);
  const { data: session } = useSession();
  // Fetch breeds from the backend API on component mount
  useEffect(() => {
    fetch("/api/dogbreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data)) // Assuming the data is an array of breed names
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogDetails((prev) => ({
      ...prev,
      [name]: name === "goodWithKids" ? value === "true" : value, // Convert string to boolean for 'goodWithKids'
    }));
  };

  const handleImageChange = (e) => {
    setDogDetails((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      dogName: dogDetails.name,
      dogBreed: dogDetails.breed,
      dogSize: dogDetails.size,
      activityLevel: dogDetails.activity,
      kidFriendly: dogDetails.goodWithKids,
      temperament: dogDetails.temperament,
      sheddingLevel: dogDetails.shedding,
      costOfMaintenance: dogDetails.maintenanceCost,
      dogLocation: dogDetails.location,
      dogImage: dogDetails.image, // Assuming you're handling image uploads separately
      User: {
        connect: {
          id: session?.user?.id, // Ensure the user ID is correctly passed
        },
      },
    };

    try {
      const response = await fetch("/api/listpet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to list dog");

      const data = await response.json();
      console.log("Success:", data);
      alert("Dog listed successfully!");

      setDogDetails({
        name: "",
        breed: "",
        size: "",
        activity: "",
        goodWithKids: "",
        temperament: "",
        shedding: "",
        maintenanceCost: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error listing dog. Please try again.");
    }
  };

  return (
    <>
      {session?.user?.isSubscribed ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              List a Dog for Adoption
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              {/* Dog's Name Input */}
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={dogDetails.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg "
                />
              </div>

              {/* Breed Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">Breed</label>
                <select
                  name="breed"
                  value={dogDetails.breed}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Breed</option>
                  {breeds.map((breed) => (
                    <option key={breed._id} value={breed.breed}>{breed.breed}</option>
                  ))}
                </select>
              </div>

              {/* Dog's Size Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Size
                </label>
                <select
                  name="size"
                  value={dogDetails.size}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              {/* Activity Level Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Activity Level
                </label>
                <select
                  name="activity"
                  value={dogDetails.activity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Activity Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Good with Kids Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Good with Kids
                </label>
                <select
                  name="goodWithKids"
                  value={dogDetails.goodWithKids}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Temperament Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Temperament
                </label>
                <select
                  name="temperament"
                  value={dogDetails.temperament}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Temperament</option>
                  <option value="calm">Calm</option>
                  <option value="curious">Curious</option>
                  <option value="friendly">Friendly</option>
                  <option value="gentle">Gentle</option>
                  <option value="playful">Playful</option>
                  <option value="protective">Protective</option>
                </select>
              </div>

              {/* Shedding Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Shedding Level
                </label>
                <select
                  name="shedding"
                  value={dogDetails.shedding}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Shedding Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Maintenance Cost Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Maintenance Cost
                </label>
                <select
                  name="maintenanceCost"
                  value={dogDetails.maintenanceCost}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Maintenance Cost</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Dog's Location */}
              <div>
                <label className="block text-gray-700 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={dogDetails.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg "
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                List Dog
              </button>
            </form>
          </div>
        </div>
      ) : (<Subscribe />)}
    </>
  );
};
export default ListDogForm;
