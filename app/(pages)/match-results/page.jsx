"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/placeholder.png";
import { Loader } from "@/utils/loader"; // Assuming you have this component

const MatchResults = () => {
  const [matches, setMatches] = useState(null);
  const [dogsDetails, setDogsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("dogMatches");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMatches(parsedData);

      // Fetch full dog details based on the dog IDs from the stored data
      const fetchDogDetails = async () => {
        const dogIds = parsedData.aiDescription.selected_dogs.map(
          (dog) => dog.id
        );
        try {
          setLoading(true);
          const response = await fetch("/api/getdogs", {
            method: "GET",
          });

          if (response.ok) {
            const allDogs = await response.json();
            const dogDetails = allDogs.filter((dog) => dogIds.includes(dog.id));
            setDogsDetails(dogDetails);
            setLoading(false);
          } else {
            console.error("Failed to fetch dog details");
          }
        } catch (error) {
          console.error("Error fetching dog details:", error);
        }
      };

      fetchDogDetails();
    }
  }, []);

  if (loading || !matches) {
    return <Loader />;
  }

  return (
    <div className="text-black dark:text-white max-w-5xl mx-auto px-4">
      {/* Matches Section */}
      <h2 className="text-3xl font-bold text-center mb-8">My Matches</h2>

      {/* Dogs Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dogsDetails.length > 0 ? (
          dogsDetails.map((dog) => (
            <div
              key={dog.id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={dog.image || placeholder}
                width={500}
                height={500}
                alt={dog.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {dog.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Breed: {dog.breed || "Unknown"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Size: {dog.size || "Unknown"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Location: {dog.location || "Not specified"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Activity Level: {dog.activityLevel || "Unknown"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Shedding: {dog.shedding || "Unknown"}
                </p>
                <div className="mt-4">
                  <Link href="/login">
                    <button className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition duration-200 mt-3 w-full">
                      Adopt {dog.name}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No matches found.
          </p>
        )}
      </div>

      {/* AI Description Section */}
      <div className="my-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          AI Recommendations
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Key Tips
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {matches.aiDescription.key_tips}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Meal Tips
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {matches.aiDescription.meal_tips}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Reason
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {matches.aiDescription.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
