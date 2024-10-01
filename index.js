const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const { format, subDays, addWeeks } = require("date-fns");
const FILE_PATH = "C:/Users/MSI/aymengithub7/Hack_Github_Contribution_Graph-/data.json";

// Function to generate a random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// A function to make a commit
const makeCommit = n => {
  if (n <= 0) return; // If no commits are left to make, exit

  // Generate random weeks and days
  const x = randomInt(-5, -1);  // Weeks between -5 and -1
  const y = randomInt(-50, -20); // Days between -50 and -20

  // Calculate the commit date
  const commitDate = addWeeks(subDays(new Date(), 2), x);
  const finalCommitDate = subDays(commitDate, -y);
  const formattedDate = format(finalCommitDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
  const date = { date: formattedDate };

  console.log(date); // Log the date for verification

  // Write to data.json and commit
  jsonfile.writeFile(FILE_PATH, date, err => {
    if (err) {
      console.error("Error writing to file:", err); // Log any errors
      return;
    }
    simpleGit()
      .add(FILE_PATH)
      .commit(`Commit on ${formattedDate}`, { '--date': formattedDate })
      .then(() => {
        // After a successful commit, push to the remote repository
        return simpleGit().push('origin', 'main');
      })
      .then(() => {
        console.log(`Changes pushed to origin main successfully for commit on ${formattedDate}.`);
        // Proceed to the next commit
        makeCommit(n - 1);
      })
      .catch(err => {
        console.error("Error during commit or push:", err); // Log errors
      });
  });
};

// Example call to makeCommit with a number of commits to perform
makeCommit(10);