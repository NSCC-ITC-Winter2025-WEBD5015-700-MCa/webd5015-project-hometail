"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditPet = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [dogDetails, setDogDetails] = useState({
    name: "",
    breed: "",
    size: "",
    activityLevel: "",
    temperament: "",
    goodWithKids: "",
    shedding: "",
    maintenanceCost: "",
    location: "",
    image: null,
  });

  const [breeds, setBreeds] = useState([]);

  // Fetch breed list
  useEffect(() => {
    fetch("/api/dogbreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  // Fetch dog's existing data
  useEffect(() => {
    fetch(`/api/pet/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDogDetails({
          name: data.name || "",
          breed: data.breed || "",
          size: data.size || "",
          activityLevel: data.activityLevel || "",
          temperament: data.temperament || "",
          goodWithKids: data.goodWithKids ? "true" : "false",
          shedding: data.shedding || "",
          maintenanceCost: data.maintenanceCost || "",
          location: data.location || "",
          image: data.image || null,
        });
      })
      .catch((err) => console.error("Error fetching dog:", err));
  }, [id]);

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

    try {
      const response = await fetch(`/api/pet/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogDetails),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Dog updated successfully!");
      router.push("/mylistings"); // Go back to the listing page
    } catch (err) {
      console.error("Error updating dog:", err);
      alert("Error updating dog");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Edit Dog Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Same form as listing, but values pre-filled */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              name="name"
              value={dogDetails.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Breed Dropdown */}
          <div>
            <label className="block font-medium">Breed</label>
            <select
              name="breed"
              value={dogDetails.breed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Breed</option>
              {breeds.map((breed) => (
                <option key={breed._id} value={breed.breed}>
                  {breed.breed}
                </option>
              ))}
            </select>
          </div>

          {/* Dog's Size Dropdown */}
          <div>
              <label className="block text-gray-700 font-medium">Size</label>
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


          {/* Location */}
          <div>
            <label className="block font-medium">Location</label>
            <input
              name="location"
              value={dogDetails.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Update Dog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPet;
