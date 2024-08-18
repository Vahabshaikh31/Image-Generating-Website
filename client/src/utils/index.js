import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
  const RandomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[RandomIndex];

  if (randomPrompt == prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
