const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const { format, subDays, addWeeks } = require("date-fns"); // Importer les fonctions nécessaires de date-fns
const FILE_PATH = "C:/Users/MSI/aymengithub7/Hack_Github_Contribution_Graph-/data.json";

// Fonction pour générer un nombre entier aléatoire entre min et max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Une fonction pour faire un commit
const makeCommit = n => {
  if (n === 0) return simpleGit().push('origin', 'main', (err) => {
      if (err) {
        console.error("Error pushing to origin main:", err);
      } else {
        console.log("Changes pushed to origin main successfully.");
      }
    }); // Si aucun commit à faire, pousser les changements

  // Nombre de semaines et de jours
  const x = randomInt(-5, -1);  // Choix de semaines entre -5 et -1
  const y = randomInt(-50, -20); // Choix de jours entre -50 et -20

  // Calcul de la date du commit
  const commitDate = addWeeks(subDays(new Date(),-2), x);
  const finalCommitDate = subDays(commitDate, -y);

  const formattedDate = format(finalCommitDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
  const date = { date: formattedDate };

  console.log(date); // Afficher la date pour vérification

  // Lire le fichier data.json et écrire la date du commit
  jsonfile.writeFile(FILE_PATH, date, err => {
    if (err) {
      console.error("Error writing to file:", err); // Log any errors
      return;
    }
    simpleGit()
      .add(FILE_PATH)
      .commit(`Commit on ${formattedDate}`, { '--date': formattedDate }, makeCommit.bind(this, --n));
  });
};

// Exemple d'appel à makeCommit avec un nombre de commits à effectuer
makeCommit(100);
