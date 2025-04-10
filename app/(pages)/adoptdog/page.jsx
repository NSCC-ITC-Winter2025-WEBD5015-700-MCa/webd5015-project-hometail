"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/utils/loader";
import { z } from "zod";

// Zod schema
const adoptSchema = z.object({
  activity: z.string().min(1, "Activity level is required"),
  goodWithKids: z.enum(["true", "false"], {
    errorMap: () => ({ message: "Please select if good with kids" }),
  }),
  temperament: z.string().min(1, "Temperament is required"),
  shedding: z.string().min(1, "Shedding level is required"),
  maintenanceCost: z.string().min(1, "Maintenance cost is required"),
});

const AdoptDogForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [preferences, setPreferences] = useState({
    breed: "",
    activity: "",
    goodWithKids: "",
    temperament: "",
    shedding: "",
    maintenanceCost: "",
  });
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate preferences using Zod
      adoptSchema.parse(preferences);
      setErrors({});

    // Convert 'goodWithKids' to boolean for backend consistency
    const preferencesWithBool = {
      ...preferences,
      goodWithKids: preferences.goodWithKids === "true", // Convert to boolean
    };

    // Send user preferences to the backend API to find dog matches
  
      setLoading(true);
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencesWithBool), // Send the modified preferences
      });

      const data = await response.json();
      console.log("Matching dogs:", data.matches);
      console.log("AI Description: ", data.aiDescription);

      // Store data in localStorage
      localStorage.setItem("dogMatches", JSON.stringify(data));

      setLoading(false);

      router.push("/match-results");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Submission error:", err);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isSubscribed) {
      router.replace("/subscribe"); // Redirect to subscribe page
    }
  }, [session, status, router]);

  // Prevent form from rendering if redirecting
  if (
    status === "loading" ||
    (status === "authenticated" && !session?.user?.isSubscribed)
  ) {
    return null;
  }

  return (
    <div className="flex justify-center items-center text-black">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Find Your Perfect Dog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Level */}
          <div>
            <label className="block text-gray-700 font-medium">
              Activity Level
            </label>
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
            {errors.activity && (
              <p className="text-red-600 text-sm mt-1">{errors.activity}</p>
            )}
          </div>

          {/* Good With Kids */}
          <div>
            <label className="block text-gray-700 font-medium">
              Good with Kids
            </label>
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
            {errors.goodWithKids && (
              <p className="text-red-600 text-sm mt-1">{errors.goodWithKids}</p>
            )}
          </div>

          {/* Temperament */}
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
            {errors.temperament && (
              <p className="text-red-600 text-sm mt-1">{errors.temperament}</p>
            )}
          </div>

          {/* Shedding Level */}
          <div>
            <label className="block text-gray-700 font-medium">
              Shedding Level
            </label>
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
            {errors.shedding && (
              <p className="text-red-600 text-sm mt-1">{errors.shedding}</p>
            )}
          </div>

          {/* Maintenance Cost */}
          <div>
            <label className="block text-gray-700 font-medium">
              Maintenance Cost
            </label>
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
            {errors.maintenanceCost && (
              <p className="text-red-600 text-sm mt-1">
                {errors.maintenanceCost}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {loading ? <Loader /> : "Find Matches"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptDogForm;
