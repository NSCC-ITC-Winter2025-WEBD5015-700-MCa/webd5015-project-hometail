"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Subscribe from "../subscribe/page";

const AdoptDogForm = () => {
  const [preferences, setPreferences] = useState({
    breed: "",
    activity: "",
    goodWithKids: "",
    temperament: "",
    shedding: "",
    maintenanceCost: "",
  });
  const [breeds, setBreeds] = useState([]);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    fetch("/api/dogbreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("User Preferences:", preferences);

    // Convert 'goodWithKids' to boolean for backend consistency
    const preferencesWithBool = {
      ...preferences,
      goodWithKids: preferences.goodWithKids === "true", // Convert to boolean
    };

    // Send user preferences to the backend API to find dog matches
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencesWithBool), // Send the modified preferences
      });
      const data = await response.json();
      console.log("Matching dogs:", data.matches);
      console.log("AI Description: ", data.aiDescription)
      // You can also show the results to the user here
    } catch (error) {
      console.error("Error fetching matches:", error);
    }

    alert("Form submitted! Check the console for logs.");
  };

  return (
    <>
      {session?.user.isSubscribed ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Find Your Perfect Dog
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div>
                <label className="block text-gray-700 font-medium">Breed</label>
                <select
                  name="breed"
                  value={preferences.breed}
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
              </div> */}
              <div>
                <label className="block text-gray-700 font-medium">Activity Level</label>
                <select
                  name="activity"
                  value={preferences.activity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Activity Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Good with Kids</label>
                <select
                  name="goodWithKids"
                  value={preferences.goodWithKids}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Temperament
                </label>
                <select
                  name="temperament"
                  value={preferences.temperament}
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
              <div>
                <label className="block text-gray-700 font-medium">Shedding Level</label>
                <select
                  name="shedding"
                  value={preferences.shedding}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Shedding Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Maintenance Cost</label>
                <select
                  name="maintenanceCost"
                  value={preferences.maintenanceCost}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Maintenance Cost</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Find Matches
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Subscribe />
      )}
    </>
  );
};

export default AdoptDogForm;
