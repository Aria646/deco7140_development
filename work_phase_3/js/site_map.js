/** ---------------------------------------
 * IMPORTS
 * Keep track of external modules being used
 * --------------------------------------*/
import { initAccordion } from "./modules/accordion.js";

/** ---------------------------------------
 * CONSTANTS
 * Define values that don't change e.g. page titles, URLs, etc.
 * --------------------------------------*/
const PAGE_TITLE = "Site Map";
const SELECTORS = {
  accordion: "#site-accordion",
};

/** ---------------------------------------
 * VARIABLES
 * Define values that will change e.g. user inputs, counters, etc.
 * --------------------------------------*/
let state = {
  openedCount: 0,
};

/** ---------------------------------------
 * FUNCTIONS
 * Group code into functions to make it reusable
 * --------------------------------------*/
function initPage() {
  // 只初始化本页所需模块
  initAccordion(SELECTORS.accordion);

  console.info("[site_map] page ready");
}

/** ---------------------------------------
 * EVENT LISTENERS
 * The code that runs when a user interacts with the page
 * --------------------------------------*/
document.addEventListener("click", (e) => {
  // 可按需扩展
});

// when the page fully loads
document.addEventListener("DOMContentLoaded", initPage);
