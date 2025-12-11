import system from "../config/system.js";

function randomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function simulateTypingAndDelay(){
  const total =
    randomBetween(system.TYPING_MIN_MS, system.TYPING_MAX_MS) +
    randomBetween(system.RESPONSE_DELAY_MIN_MS, system.RESPONSE_DELAY_MAX_MS);

  await new Promise(res => setTimeout(res, total));
}

export { simulateTypingAndDelay };