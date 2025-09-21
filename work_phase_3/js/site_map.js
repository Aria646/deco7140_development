/** ---------------------------------------
 * IMPORTS
 * Keep track of external modules being used
 * --------------------------------------*/
// import { initAccordion } from './modules/accordion.js';  // example

/** ---------------------------------------
 * CONSTANTS
 * Define values that don't change e.g. page titles, URLs, etc.
 * --------------------------------------*/
const PAGE_TITLE = "Site Map";
const SELECTORS = {
    accordion: "#site-accordion", // example selector if you add an accordion
};

/** ---------------------------------------
 * VARIABLES
 * Define values that will change e.g. user inputs, counters, etc.
 * --------------------------------------*/
let state = {
    // put runtime values here, e.g. counters, toggles…
    openedCount: 0,
};

/** ---------------------------------------
 * FUNCTIONS
 * Group code into functions to make it reusable
 * --------------------------------------*/
function initPage() {
    // Initialize modules or page features here
    // initAccordion(SELECTORS.accordion);   // uncomment if you use the module

    console.info("[site_map] page ready");
}

/** ---------------------------------------
 * EVENT LISTENERS
 * The code that runs when a user interacts with the page
 * --------------------------------------*/
document.addEventListener("click", (e) => {
    // handle click interactions if needed
});

// when the page fully loads
document.addEventListener("DOMContentLoaded", initPage);
