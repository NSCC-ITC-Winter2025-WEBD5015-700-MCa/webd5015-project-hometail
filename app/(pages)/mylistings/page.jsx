"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/getmylisting");
        if (!response.ok) throw new Error("Failed to fetch pets");

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading pets...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
        Your Pets Listed for Adoption
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={pet.image || "/placeholder.jpg"}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                <p className="text-gray-600 text-sm">
                  Breed: {pet.breed || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  Size: {pet.size || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  Location: {pet.location || "Not specified"}
                </p>
                <p className="text-gray-600 text-sm">
                  Activity Level: {pet.activityLevel || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  Shedding: {pet.shedding || "Unknown"}
                </p>
                <div className="mt-4">
                <Link href="#modify">
                <div className="flex justify-between ">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200 mt-3 h-12">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-200 mt-3 h-12">
                  Unlist
                </button>
                </div>
              </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No pets available for adoption yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetList;
