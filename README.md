# CRUD-on-text-using-fs

A simple Node.js app for managing usernames in a plain text file using only asynchronous fs functions and readline-sync for user input.

## Structure

- `app.js` – Main entry point, runs the UI.
- `services/` – Business logic and file access:
  - `userFileService.js` – File read/write operations.
  - `userService.js` – User management logic.
- `ui/` – User interface (terminal input/output):
  - `userUI.js`
- `data/` – Data files:
  - `users.txt`

## Features
- Create, read, update, and delete usernames.
- All file operations use async callbacks (no promises/await).
- Clear separation of concerns between data, logic, and UI.

## Usage
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the app:
   ```sh
   node app.js
   ```
