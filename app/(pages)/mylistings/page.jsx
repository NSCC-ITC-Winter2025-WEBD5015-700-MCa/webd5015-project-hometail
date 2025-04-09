"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

  const updatePet = async (id, petName, status) => {
    if (window.confirm(`Confirm action on ${petName}?`)) {
      try {
        const response = await fetch("/api/updatepet", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dogId: id,
            updateData: {
              isListed: status,
            },
          }),
        });
  
        if (!response.ok) throw new Error("Failed to update pet");
  
        // Update the local pets state
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet.id === id ? { ...pet, isListed: status } : pet
          )
        );
      } catch (error) {
        console.error("Error updating pet:", error);
      }
    }
  };
  
 

  if (loading) return <p className="text-center text-lg font-semibold dark:text-white">Loading pets...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Your Pets Listed for Adoption</h2>
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
                <p className="text-gray-600 text-sm">Breed: {pet.breed || "Unknown"}</p>
                <p className="text-gray-600 text-sm">Size: {pet.size || "Unknown"}</p>
                <p className="text-gray-600 text-sm">Location: {pet.location || "Not specified"}</p>
                <p className="text-gray-600 text-sm">Activity Level: {pet.activityLevel || "Unknown"}</p>
                <p className="text-gray-600 text-sm">Shedding: {pet.shedding || "Unknown"}</p>
                <div className="mt-4">
                <div className="flex justify-between ">
                <Link href={`/editListPet/${pet.id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200 mt-3 h-12">
                  Edit
                </button>

                </Link>

                {pet.isListed ? (<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-200 mt-3 h-12" onClick={() => updatePet(pet.id, pet.name, false)}>

                  Unlist
                </button>) : 
                (<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200 mt-3 h-12" onClick={() => updatePet(pet.id, pet.name, true)}>
                List
              </button>)}
                </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">You have no pets listed for adoption.</p>
        )}
      </div>
    </div>
  );
};

export default PetList;
