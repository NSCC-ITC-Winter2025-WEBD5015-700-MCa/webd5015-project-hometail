"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/utils/loader";
import { z } from "zod";

// Zod schema
const dogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  breed: z.string().min(1, "Breed is required"),
  size: z.string().min(1, "Size is required"),
  activityLevel: z.string().min(1, "Activity level is required"),
  goodWithKids: z.boolean({ required_error: "Select if good with kids" }),
  temperament: z.string().min(1, "Temperament is required"),
  shedding: z.string().min(1, "Shedding level is required"),
  maintenanceCost: z.string().min(1, "Maintenance cost is required"),
  location: z.string().min(1, "Location is required"),
  image: z
    .string()
    .min(1, "Image is required")
    .refine((value) => {
      const validMimeTypes = ["data:image/jpeg", "data:image/png", "data:image/webp"];
      return validMimeTypes.some((type) => value.startsWith(type));
    }, "Only JPG, PNG, or WEBP images are allowed."),
});

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ListDogForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

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
    isListed: true,
    image: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [imageError, setImageError] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

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
  
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Only JPG, PNG, or WEBP images are allowed.");
      setDogDetails((prev) => ({ ...prev, image: null }));
      return;
    }
  
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setImageError("Image must be smaller than 5MB.");
      setDogDetails((prev) => ({ ...prev, image: null }));
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDogDetails((prev) => ({
        ...prev,
        image: reader.result,
      }));
      setImageError(""); // clear previous errors
    };
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: dogDetails.name,
      breed: dogDetails.breed,
      size: dogDetails.size,
      activityLevel: dogDetails.activity,
      goodWithKids:
        dogDetails.goodWithKids === true || dogDetails.goodWithKids === "true",
      temperament: dogDetails.temperament,
      shedding: dogDetails.shedding,
      maintenanceCost: dogDetails.maintenanceCost,
      location: dogDetails.location,
      image: dogDetails.image,
    };
  
    const result = dogSchema.safeParse(payload);
  
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "image") {
          setImageError(err.message); // image errors to its own state
        } else {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }
  
    setFormErrors({});
    setImageError("");
  
    try {
      setLoading(true);
      const response = await fetch("/api/listpet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to list dog");
  
      alert("Dog listed successfully!");
      setLoading(false);
      router.push("/mylistings");
  
      setDogDetails({
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
    } catch (error) {
      console.error("Error:", error);
      alert("Error listing dog. Please try again.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isSubscribed) {
      router.replace("/subscribe");
    }
  }, [session, status, router]);

  if (
    status === "loading" ||
    (status === "authenticated" && !session?.user?.isSubscribed)
  ) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          List a Dog for Adoption
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={dogDetails.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {formErrors.name && <p className="text-red-600 text-sm">{formErrors.name}</p>}
          </div>

          {/* Breed */}
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
                <option key={breed._id} value={breed.breed}>
                  {breed.breed}
                </option>
              ))}
            </select>
            {formErrors.breed && <p className="text-red-600 text-sm">{formErrors.breed}</p>}
          </div>

          {/* Size */}
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
            {formErrors.size && <p className="text-red-600 text-sm">{formErrors.size}</p>}
          </div>

          {/* Activity */}
          <div>
            <label className="block text-gray-700 font-medium">Activity Level</label>
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
            {formErrors.activityLevel && (
              <p className="text-red-600 text-sm">{formErrors.activityLevel}</p>
            )}
          </div>

          {/* Good with Kids */}
          <div>
            <label className="block text-gray-700 font-medium">Good with Kids</label>
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
            {formErrors.goodWithKids && (
              <p className="text-red-600 text-sm">{formErrors.goodWithKids}</p>
            )}
          </div>

          {/* Temperament */}
          <div>
            <label className="block text-gray-700 font-medium">Temperament</label>
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
            {formErrors.temperament && (
              <p className="text-red-600 text-sm">{formErrors.temperament}</p>
            )}
          </div>

          {/* Shedding */}
          <div>
            <label className="block text-gray-700 font-medium">Shedding Level</label>
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
            {formErrors.shedding && (
              <p className="text-red-600 text-sm">{formErrors.shedding}</p>
            )}
          </div>

          {/* Maintenance Cost */}
          <div>
            <label className="block text-gray-700 font-medium">Maintenance Cost</label>
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
            {formErrors.maintenanceCost && (
              <p className="text-red-600 text-sm">{formErrors.maintenanceCost}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={dogDetails.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {formErrors.location && (
              <p className="text-red-600 text-sm">{formErrors.location}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {imageError && <p className="text-red-600 text-sm">{imageError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {loading ? <Loader /> : "List Dog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListDogForm;
