import rl from "readline-sync";
import { showUsers, createUser, updateUser, deleteUser } from "../services/userService.js";

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
  showUsers(() => {
    const oldName = promptForUsername("Enter current username to update: ");
    const newName = promptForUsername();
    updateUser(oldName, newName, (err) => {
      if (err) {
        console.error("Error updating user:", err.message);
      } else {
        console.log("User updated successfully!");
      }
      rl.keyInPause("Press any key to continue...");
      displayMainMenu();
    });
  });
}

function deleteUserAction() {
  showUsers(() => {
    const username = promptForUsername("Enter username to delete: ");
    deleteUser(username, (err) => {
      if (err) {
        console.error("Error deleting user:", err.message);
      } else {
        console.log("User deleted successfully!");
      }
      rl.keyInPause("Press any key to continue...");
      displayMainMenu();
    });
  });
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
