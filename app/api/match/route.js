import Together from "together-ai";

// Load environment variables from .env file
const together = new Together({ apiKey: process.env.TOGETHER_AI_API_KEY });
let dogs = [];

// Fetch data from the API (async function)
const allDogs = async () => {
  try {
    // Fetch data from your API
    const response = await fetch("http://localhost:3000/api/getdogs"); // This api will later be called as an environmantal variable

    // Check if response is ok
    if (!response.ok) {
      throw new Error("Failed to fetch dogs data");
    }

    // Parse the response as JSON
    const data = await response.json();

    // Assign fetched data to dogs array
    dogs = data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
};

// Call the function to fetch dog data at the start. Wait for function to complete before executing rest of code
await allDogs();

let savedPreferences;

// Function to find compatible dogs based on user preferences
function findMatches(preferences) {
  if (dogs.length === 0) {
    console.error("Dogs data is empty, cannot find matches.");
    return [];
  }

  let matches = dogs.filter(
    (dog) =>
      (preferences.size !== undefined ? preferences.size === preferences.size : true) &&
      (preferences.activity !== undefined ? preferences.activity === preferences.activity : true) &&
      (preferences.goodWithKids !== undefined ? dog.goodWithKids === preferences.goodWithKids : true) &&
      (preferences.temperament !== undefined ? dog.temperament === preferences.temperament : true) &&
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

  savedPreferences = preferences;
  return matches;
}

// Function to refine matches using Together AI
async function refineMatchesWithAI(matchNames, matchIDs, matchBreeds) {
  try {
    const aiResponse = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am looking to adopt a dog. Based on the dataset, the best matches for me are: ${matchNames}, their breeds are ${matchBreeds}, and their IDs are ${matchIDs} respectively.
          My preferences are:
          - Activity level: ${savedPreferences.activity}
          - Good with kids: ${savedPreferences.goodWithKids}
          - Temperament: ${savedPreferences.temperament}
          - Shedding: ${savedPreferences.shedding}
          - Maintenance cost: ${savedPreferences.maintenanceCost}
          
          Which is the best option?
          Include my preferences in your response.
          Return a structured JSON object with the following format:
          {
            "selected_dogs": [
              { "id": "dog_id_1", "name": "dog_name_1" },
              { "id": "dog_id_2", "name": "dog_name_2" }
            ],
            "reason": "Explain why this dog was chosen",
            "user_preferences": {
              "activity": "${savedPreferences.activity}",
              "goodWithKids": "${savedPreferences.goodWithKids}",
              "temperament": "${savedPreferences.temperament}",
              "shedding": "${savedPreferences.shedding}",
              "maintenanceCost": "${savedPreferences.maintenanceCost}"
            },
            "key_tips": "Give some key tips on taking care of the selected dog",
            "meal_tips":"Give some tips relating to meals for selected dog",
          }`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    const aiText = aiResponse.choices[0].message.content;
    console.log("Raw AI Response:", aiText);

    // Extract JSON part from AI response
    const jsonStart = aiText.indexOf("{");
    const jsonEnd = aiText.lastIndexOf("}");
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI response does not contain valid JSON.");
    }

    const jsonResponse = aiText.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonResponse); // Safely parse the extracted JSON

  } catch (error) {
    console.error("Error refining matches with AI:", error);
    return { 
      selected_dogs: [], 
      reason: "AI could not generate a valid response.", 
      user_preferences: savedPreferences 
    };
  }
}

// API route handler for POST request
export async function POST(req) {
  try {
    const preferences = await req.json();

    // Ensure dogs data is available before proceeding
    if (dogs.length === 0) {
      await allDogs(); // Wait for the data to be fetched
    }

    // Find initial dog matches based on preferences
    const matches = findMatches(preferences);

    // If matches are found, refine them using AI
    if (matches.length > 0) {
      const matchIDs = matches.map(dog => dog.id).join(", ");
      const matchNames = matches.map(dog => dog.name).join(", ");
      const matchBreeds = matches.map(dog => dog.breed).join(", ");
      const aiResponse = await refineMatchesWithAI(matchNames, matchIDs, matchBreeds);

      return new Response(JSON.stringify({ matches, aiDescription: aiResponse }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ matches: [], aiDescription: "No exact matches found." }), { status: 200 });
    }
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "An error occurred." }), { status: 500 });
  }
}
