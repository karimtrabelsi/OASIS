// const Event = require("../../models/event");
// // const regression = require("regression");

// async function predictBudget() {
//   // Récupérer tous les événements
//   const events = await Event.find();

//   // Préparer les données pour la régression linéaire
//   // const data = events.map(event => {
//   //   const x = [
//   //     event.typeEvent === "CharityEvent" ? 1 : 0,
//   //     event.typeEvent === "TeamBuilding" ? 1 : 0,
//   //     event.typeEvent === "ProTraining" ? 1 : 0,
//   //     30,
//   //     10 || 0,
//   //     Number(event.cotisation),
//   //     event.place === "Paris" ? 1 : 0,
//   //     event.place === "Lyon" ? 1 : 0,
//   //     event.place === "Marseille" ? 1 : 0
//   //   ];
//   //   const y = Number(event.cotisation);
//   //   return [x, y];
//   // });

//   // Effectuer la régression linéaire
//   // const result = regression.linear(data);

//   // Prédire le budget pour chaque événement
//   events.forEach(event => {
//     const x = [
//       event.typeEvent === "CharityEvent" ? 1 : 0,
//       event.typeEvent === "TeamBuilding" ? 1 : 0,
//       event.typeEvent === "ProTraining" ? 1 : 0,
//       10,
//       30 || 0,
//       Number(event.cotisation),
//       event.place === "Paris" ? 1 : 0,
//       event.place === "Lyon" ? 1 : 0,
//       event.place === "Marseille" ? 1 : 0
//     ];
//     const predictedCost = result.predict(x)[1];
//     console.log(`${event.eventname}: ${predictedCost}`);
//   });
// }

// predictBudget();
