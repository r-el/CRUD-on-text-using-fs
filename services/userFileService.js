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
 * Empty lines will be ignored.
 * @param {Function} onComplete - Called with (error, userArray)
 */
export function readUsers(onComplete) {
  fs.readFile(USERS_FILE, "utf-8", (err, fileContent) => {
    if (err && err.code !== "ENOENT") {
      // File system error other than "file not found"
      onComplete(err);
    } else {
      // File doesn't exist or read successfully - split by lines and filter empty ones
      const userList = (fileContent || "").split("\n").filter((line) => line.trim());
      onComplete(null, userList);
    }
  });
}

// /**
//  * Writes user array to file, replacing all content.
//  * Each user saved on a new line.
//  * @param {string[]} userList - Array of users to save
//  * @param {Function} onComplete - Called with (error)
//  */
// export function writeUsers(userList, onComplete) {
//   // Join the users array into a string with newlines and write to file
//   fs.writeFile(USERS_FILE, userList.join("\n"), onComplete);
// }
