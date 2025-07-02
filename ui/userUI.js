import rl from 'readline-sync';
import { showUsers } from '../services/userService.js';

function showUsersAction() {
  console.log('\n=== Users List ===');
  showUsers(() => {
    console.log('==================\n');
    rl.keyInPause('Press any key to continue...');
    displayMainMenu();
  });
}

function createUserAction() {
  console.log('Create User - Not implemented yet.');
  rl.keyInPause('Press any key to continue...');
  displayMainMenu();
}

function updateUserAction() {
  console.log('Update User - Not implemented yet.');
  rl.keyInPause('Press any key to continue...');
  displayMainMenu();
}

function deleteUserAction() {
  console.log('Delete User - Not implemented yet.');
  rl.keyInPause('Press any key to continue...');
  displayMainMenu();
}

const menuOptions = [
  { name: 'Show Users', action: showUsersAction },
  { name: 'Create User', action: createUserAction },
  { name: 'Update User', action: updateUserAction },
  { name: 'Delete User', action: deleteUserAction }
];

function displayMainMenu() {
  const menuNames = menuOptions.map(option => option.name);
  const selectedIdx = rl.keyInSelect(menuNames, 'Choose action:', {cancel: 'Exit'});
  
  if (selectedIdx === -1) {
    console.log('Goodbye!');
    return;
  }
  
  menuOptions[selectedIdx].action();
}

export function startApp() {
  console.log('Welcome to the User Manager!');
  displayMainMenu();
}
