import { readUsers } from "./userFileService.js";

/**
 * Shows all users from file with async callback pattern
 * @param {Function} onComplete - Callback function called when display is complete
 */
export function showUsers(onComplete) {
  readUsers((err, userList) => {
    if (err) {
      console.error("Error:", err.message);
    } else if (userList.length === 0) {
      console.log("No users found.");
    } else {
      // Display users with numbered list
      userList.forEach((username, idx) => console.log(`${idx + 1}. ${username}`));
    }
    // Call callback when display is complete
    if (onComplete) onComplete();
  });
}

// Additional CRUD functions (create, update, delete) will be implemented here
