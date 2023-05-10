const fs = require("fs");
const { NlpManager } = require("node-nlp");

const manager = new NlpManager({
  languages: ["en"],
});

const files = fs.readdirSync("./server/routes/complaint/intents");

for (const file of files) {
  if (file.endsWith(".json")) {
    const data = fs.readFileSync(`./server/routes/complaint/intents/${file}`);
    const intents = JSON.parse(data);

    // Iterate over each intent in the array
    for (const intent of intents) {
      // Get the intent name from the object
      const intentName = intent.name;

      // Iterate over each question in the intent's questions array
      for (const question of intent.questions) {
        // Add the question to the NLP manager with the intent name as the tag
        manager.addDocument("en", question, intentName);
      }

      // Iterate over each answer in the intent's answers array
      for (const answer of intent.answers) {
        // Add the answer to the NLP manager with the intent name as the tag
        manager.addAnswer("en", intentName, answer);
      }
    }
  }
}

manager.addDocument("en", ".*", "Unknown");
manager.addAnswer("en", "Unknown", "I'm sorry, I don't understand. Can you please rephrase your question?");

(async () => {
  await manager.train();
  manager.save();
})();
