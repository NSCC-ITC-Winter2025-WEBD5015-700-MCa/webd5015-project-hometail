import Together from "together-ai";

// Load environment variables from .env file
//dotenv.config({ path: "./.env" });

const together = new Together({ apiKey: process.env.TOGETHER_AI_API_KEY });

// Mock dataset of adoptable dogs
const dogs = [
  { name: "Buddy", breed: "Labrador Retriever", size: "large", activity: "high", goodWithKids: true, temperament: "friendly", shedding: "high", maintenanceCost: "medium" },
  { name: "Max", breed: "Bulldog", size: "medium", activity: "low", goodWithKids: true, temperament: "calm", shedding: "low", maintenanceCost: "high" },
  { name: "Bella", breed: "German Shepherd", size: "large", activity: "high", goodWithKids: false, temperament: "protective", shedding: "high", maintenanceCost: "high" },
  { name: "Luna", breed: "Beagle", size: "small", activity: "medium", goodWithKids: true, temperament: "curious", shedding: "medium", maintenanceCost: "low" },
  { name: "Rocky", breed: "Golden Retriever", size: "large", activity: "high", goodWithKids: true, temperament: "gentle", shedding: "high", maintenanceCost: "medium" },
  { name: "Daisy", breed: "Chihuahua", size: "small", activity: "low", goodWithKids: false, temperament: "playful", shedding: "low", maintenanceCost: "low" },
];

// Function to find compatible dogs based on user preferences
function findMatches(preferences) {
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

// Function to refine matches using Together AI
async function refineMatchesWithAI(matchNames, matchBreeds) {
  const response = await together.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `I am looking to adopt a dog. Based on the dataset, the best matches for me are: ${matchNames}. Their breeds are ${matchBreeds} respectively. Can you describe their personalities and why they might be a good fit for my home?`,
      },
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  });
  console.log("KKKK",matchNames)
  console.log("KKKK",matchBreeds)

  return response.choices[0].message.content;
}

// API route handler for POST request
export async function POST(req) {
  const preferences = await req.json();

  // Find initial dog matches based on preferences
  const matches = findMatches(preferences);

  // If matches are found, refine them using AI
  if (matches.length > 0) {
    const matchNames = matches.map(dog => dog.name).join(", ");
    const matchBreeds = matches.map(dog => dog.breed).join(", ");
    const aiResponse = await refineMatchesWithAI(matchNames, matchBreeds);
    return new Response(JSON.stringify({ matches, aiDescription: aiResponse }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ matches: [], aiDescription: "No exact matches found." }), { status: 200 });
  }
}
