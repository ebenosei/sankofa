export type AkanDayEntry = {
  day: string;
  male: { name: string; meaning: string; traits: string[] };
  female: { name: string; meaning: string; traits: string[] };
};

export const AKAN_DAY_NAMES: AkanDayEntry[] = [
  {
    day: "Sunday",
    male: {
      name: "Kwasi",
      meaning: "Born on Sunday, associated with the Universe",
      traits: ["patient", "creative", "calm", "wise"],
    },
    female: {
      name: "Akosua",
      meaning: "Born on Sunday, associated with the Universe",
      traits: ["patient", "creative", "nurturing", "wise"],
    },
  },
  {
    day: "Monday",
    male: {
      name: "Kwadwo",
      meaning: "Born on Monday, associated with peace",
      traits: ["peaceful", "composed", "reliable", "thoughtful"],
    },
    female: {
      name: "Adwoa",
      meaning: "Born on Monday, associated with peace",
      traits: ["peaceful", "serene", "gentle", "dependable"],
    },
  },
  {
    day: "Tuesday",
    male: {
      name: "Kwabena",
      meaning: "Born on Tuesday, associated with the ocean",
      traits: ["strong-willed", "courageous", "determined", "bold"],
    },
    female: {
      name: "Abenaa",
      meaning: "Born on Tuesday, associated with the ocean",
      traits: ["strong-willed", "passionate", "brave", "resilient"],
    },
  },
  {
    day: "Wednesday",
    male: {
      name: "Kwaku",
      meaning: "Born on Wednesday, associated with the spider (Ananse)",
      traits: ["witty", "resourceful", "adaptable", "curious"],
    },
    female: {
      name: "Akua",
      meaning: "Born on Wednesday, associated with the spider (Ananse)",
      traits: ["clever", "versatile", "inquisitive", "spirited"],
    },
  },
  {
    day: "Thursday",
    male: {
      name: "Yaw",
      meaning: "Born on Thursday, associated with the earth",
      traits: ["grounded", "tenacious", "strong", "enduring"],
    },
    female: {
      name: "Yaa",
      meaning: "Born on Thursday, associated with the earth",
      traits: ["grounded", "determined", "nurturing", "steadfast"],
    },
  },
  {
    day: "Friday",
    male: {
      name: "Kofi",
      meaning: "Born on Friday, associated with fertility",
      traits: ["adventurous", "social", "joyful", "charismatic"],
    },
    female: {
      name: "Afua",
      meaning: "Born on Friday, associated with fertility",
      traits: ["adventurous", "warm", "vibrant", "compassionate"],
    },
  },
  {
    day: "Saturday",
    male: {
      name: "Kwame",
      meaning: "Born on Saturday, associated with the supreme being",
      traits: ["leader", "ambitious", "commanding", "visionary"],
    },
    female: {
      name: "Ama",
      meaning: "Born on Saturday, associated with the supreme being",
      traits: ["leader", "ambitious", "dignified", "inspiring"],
    },
  },
];
