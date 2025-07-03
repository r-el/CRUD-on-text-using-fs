import rl from "readline-sync";
import { showUsers, createUser } from "../services/userService.js";

// Helper: prompt for username, and ensure it's not empty
function promptForUsername(promptText = "Enter new username: ") {
  return rl.question(promptText, {
    limit: (input) => !!input.trim(), // !! converts to boolean
    limitMessage: "Username cannot be empty.",
  });
}

function showUsersAction() {
  console.log("\n=== Users List ===");
  showUsers(() => {
    console.log("==================\n");
    rl.keyInPause("Press any key to continue...");
    displayMainMenu();
  });
}

function createUserAction() {
  const username = promptForUsername();
  createUser(username, (err) => {
    if (err) {
      console.error("Error creating user:", err.message);
    } else {
      console.log("User created successfully!");
    }
    rl.keyInPause("Press any key to continue...");
    displayMainMenu();
  });
}

function updateUserAction() {
  // Not implemented yet
  console.log("Update User - Not implemented yet.");
  rl.keyInPause("Press any key to continue...");
  displayMainMenu();
}

function deleteUserAction() {
  // Not implemented yet
  console.log("Delete User - Not implemented yet.");
  rl.keyInPause("Press any key to continue...");
  displayMainMenu();
}

const menuOptions = [
  { name: "Show Users", action: showUsersAction },
  { name: "Create User", action: createUserAction },
  { name: "Update User", action: updateUserAction },
  { name: "Delete User", action: deleteUserAction },
];

function displayMainMenu() {
  const menuNames = menuOptions.map((option) => option.name);
  const selectedIdx = rl.keyInSelect(menuNames, "Choose action:", { cancel: "Exit" });

  if (selectedIdx === -1) {
    console.log("Goodbye!");
    return;
  }

  menuOptions[selectedIdx].action();
}

export function startApp() {
  console.log("Welcome to the User Manager!");
  displayMainMenu();
}
