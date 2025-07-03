/**
 * User File Service
 * Handles reading and writing user data to a text file
 */
import fs from "fs";
import path from "path";

// path.resolve() ensures the file path is absolute,
// and works regardless from where the script runs from
const USERS_FILE = process.env.USERS_FILE || path.resolve("data/users.txt");

/**
 * Reads the users from the file and returns them as an array.
 * If the file does not exist, returns an empty array.
 * @param {Function} onComplete - Called with (error, userArray)
 */
export function readUsers(onComplete) {
  fs.readFile(USERS_FILE, "utf-8", (err, fileContent) => {
    if (err && err.code !== "ENOENT") {
      // File system error other than "file not found"
      onComplete(err);
    } else {
      // File doesn't exist or read successfully - parse as JSON array
      try {
        const userList = fileContent ? JSON.parse(fileContent) : [];
        if (!Array.isArray(userList)) throw new Error("Users file is not a JSON array");
        onComplete(null, userList);
      } catch (parseErr) {
        onComplete(parseErr);
      }
    }
  });
}

// /**
//  * Writes user array to file, replacing all content.
//  * Saves the array as a JSON string.
//  * @param {string[]} userList - Array of users to save
//  * @param {Function} onComplete - Called with (error)
//  */
// export function writeUsers(userList, onComplete) {
//   fs.writeFile(USERS_FILE, JSON.stringify(userList, null, 2), onComplete);
// }
