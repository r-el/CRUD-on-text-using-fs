import { readUsers, writeUsers } from "./userFileService.js";

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

/**
 * Creates a new user and saves to file, only if not exists
 * @param {string} username - The username to add
 * @param {Function} onComplete - Callback called with (error)
 */
export function createUser(username, onComplete) {
  readUsers((err, userList) => {
    if (err) return onComplete(err);
    if (userList.includes(username)) {
      return onComplete(new Error("User already exists"));
    }
    userList.push(username);
    writeUsers(userList, onComplete);
  });
}

/**
 * Updates a username in the users list
 * @param {string} oldName - The current username
 * @param {string} newName - The new username
 * @param {Function} onComplete - Callback called with (error)
 */
export function updateUser(oldName, newName, onComplete) {
  readUsers((err, userList) => {
    if (err) return onComplete(err);
    const idx = userList.indexOf(oldName);
    if (idx === -1) return onComplete(new Error("User not found"));
    if (userList.includes(newName)) return onComplete(new Error("New username already exists"));
    userList[idx] = newName;
    writeUsers(userList, onComplete);
  });
}

/**
 * Deletes a user from the users list
 * @param {string} username - The username to delete
 * @param {Function} onComplete - Callback called with (error)
 */
export function deleteUser(username, onComplete) {
  readUsers((err, userList) => {
    if (err) return onComplete(err);
    const idx = userList.indexOf(username);
    if (idx === -1) return onComplete(new Error("User not found"));
    userList.splice(idx, 1);
    writeUsers(userList, onComplete);
  });
}
