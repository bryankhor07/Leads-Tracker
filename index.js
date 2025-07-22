// Array to store the list of saved leads (URLs)
let myLeads = [];

// DOM elements
const inputEl = document.getElementById("input-el"); // Input field for manual URL entry
const inputBtn = document.getElementById("input-btn"); // "SAVE INPUT" button
const ulEl = document.getElementById("ul-el"); // UL element to display the list of links
const deleteBtn = document.getElementById("delete-btn"); // "DELETE ALL" button
const tabBtn = document.getElementById("tab-btn"); // "SAVE TAB" button

// Load any previously saved leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// If there are leads in localStorage, initialize myLeads with them and render the list
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// Event listener for "SAVE TAB" button
tabBtn.addEventListener("click", function () {
  // Use Chrome API to get the URL of the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url); // Add the tab URL to myLeads
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Save updated leads to localStorage
    render(myLeads); // Re-render the list
  });
});

// Event listener for "DELETE ALL" button (requires double-click)
deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked!");
  localStorage.clear(); // Clear all data from localStorage
  myLeads = []; // Reset myLeads array
  render(myLeads); // Re-render an empty list
});

// Event listener for "SAVE INPUT" button
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value); // Add the input value to the leads array
  inputEl.value = ""; // Clear the input field
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Save to localStorage
  render(myLeads); // Re-render the list
});

// Function to render the list of leads as clickable links
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // Each lead becomes a list item with a clickable link that opens in a new tab
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems; // Update the DOM with the new list
}
