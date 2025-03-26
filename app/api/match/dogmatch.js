// api/match/dogMatch.js
import dotenv from "dotenv";
import Together from "together-ai";

dotenv.config({ path: "./.env" });

const together = new Together({ apiKey: process.env.API_KEY });

// Mock dataset of adoptable dogs - This dataset will be fetched from the database
const dogs = [
  { name: "Buddy", breed: "Labrador Retriever", size: "large", activity: "high", goodWithKids: true, temperament: "friendly", shedding: "high", maintenanceCost: "medium" },
  { name: "Max", breed: "Bulldog", size: "medium", activity: "low", goodWithKids: true, temperament: "calm", shedding: "low", maintenanceCost: "high" },
  { name: "Bella", breed: "German Shepherd", size: "large", activity: "high", goodWithKids: false, temperament: "protective", shedding: "high", maintenanceCost: "high" },
  { name: "Luna", breed: "Beagle", size: "small", activity: "medium", goodWithKids: true, temperament: "curious", shedding: "medium", maintenanceCost: "low" },
  { name: "Rocky", breed: "Golden Retriever", size: "large", activity: "high", goodWithKids: true, temperament: "gentle", shedding: "high", maintenanceCost: "medium" },
  { name: "Daisy", breed: "Chihuahua", size: "small", activity: "low", goodWithKids: false, temperament: "playful", shedding: "low", maintenanceCost: "low" },
];

// Function to find compatible dogs based on user preferences
export function findMatches(preferences) {
  let matches = dogs.filter(
    (dog) =>
      (preferences.size ? dog.size === preferences.size : true) &&
      (preferences.activity ? dog.activity === preferences.activity : true) &&
      (preferences.goodWithKids !== undefined ? dog.goodWithKids === preferences.goodWithKids : true) &&
      (preferences.shedding ? dog.shedding === preferences.shedding : true) &&
      (preferences.maintenanceCost ? dog.maintenanceCost === preferences.maintenanceCost : true)
  );

  // If no exact matches found, return closest matches based on size and activity level
  if (matches.length === 0) {
    matches = dogs.filter(
      (dog) =>
        (preferences.size ? dog.size === preferences.size : true) ||
        (preferences.activity ? dog.activity === preferences.activity : true)
    );
  }

  return matches;
}

// Function to refine matches using Together AI (You can call this when necessary)
export async function refineMatchesWithAI(matchNames) {
  const response = await together.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `I am looking to adopt a dog. Based on the dataset, the best matches for me are: ${matchNames}. Can you describe their personalities and why they might be a good fit for my home?`,
      },
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  });

  return response.choices[0].message.content;
}
