"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditDogForm = () => {
  const { id } = useParams(); // Get ID from URL
  const router = useRouter();

  const [dogDetails, setDogDetails] = useState({
    name: "",
    breed: "",
    size: "",
    activity: "",
    temperament: "",
    goodWithKids: "",
    shedding: "",
    maintenanceCost: "",
    location: "",
    image: null,
  });
  const [breeds, setBreeds] = useState([]);

  // Fetch dog data by ID
  useEffect(() => {
    if (!id) return;

    fetch(`/api/listpet/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDogDetails({
          name: data.name || "",
          breed: data.breed || "",
          size: data.size || "",
          activity: data.activityLevel || "",
          temperament: data.temperament || "",
          goodWithKids: data.goodWithKids ? "true" : "false",
          shedding: data.shedding || "",
          maintenanceCost: data.maintenanceCost || "",
          location: data.location || "",
          image: data.image || null,
        });
      })
      .catch((err) => console.error("Error fetching dog data:", err));
  }, [id]);

  // Fetch breeds (same as list form)
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
      name: dogDetails.name,
      breed: dogDetails.breed,
      size: dogDetails.size,
      activityLevel: dogDetails.activity,
      goodWithKids: dogDetails.goodWithKids === "true",
      temperament: dogDetails.temperament,
      shedding: dogDetails.shedding,
      maintenanceCost: dogDetails.maintenanceCost,
      location: dogDetails.location,
      image: dogDetails.image,
    };

    try {
      const response = await fetch(`/api/listpet/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update dog");

      alert("Dog updated successfully!");
      router.push("/mylistings"); // redirect after update
    } catch (error) {
      console.error("Error updating dog:", error);
      alert("Error updating dog. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Edit Dog Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Your same form fields here – no changes needed */}
          {/* Just copy all the form fields from your ListDogForm code */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};

export default EditDogForm;
