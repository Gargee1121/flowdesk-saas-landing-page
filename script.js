
/* =========================================
   FLOWDESK - JAVASCRIPT
   Navigation and Form Functionality
========================================= */

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

// Close mobile menu after clicking a navigation link

const navigationItems = document.querySelectorAll("#navLinks a");

navigationItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// 2. PRICING BUTTON INTERACTION

let selectedPlan = "Not selected";

const pricingButtons = document.querySelectorAll("[data-plan]");

pricingButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedPlan = button.dataset.plan;

        const formHeading = document.querySelector(".contact-form h3");

        formHeading.textContent = "Request Your " + selectedPlan + " Demo";

    });

});

// 3. CONTACT FORM VALIDATION

const demoForm = document.getElementById("demoForm");

const formMessage = document.getElementById("formMessage");

demoForm.addEventListener("submit", function (event) {

    // Prevent default page refresh

    event.preventDefault();

    formMessage.classList.remove("error");

    // Get form values

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const teamSize = document.getElementById("teamSize").value;

    // Check empty fields and HTML validation rules

    if (
        fullName.length < 2 ||
        !demoForm.checkValidity()
    ) {

        formMessage.textContent =
            "Please enter a valid name, email address and team size.";

        formMessage.classList.add("error");

        demoForm.reportValidity();

        return;

    }

    // Display success message

    formMessage.textContent =
        "Thank you, " + fullName +
        "! Your " + selectedPlan +
        " demo request has been recorded successfully.";

    // Reset form fields

    demoForm.reset();

    // Reset selected plan after submission

    selectedPlan = "Not selected";

    // Restore default heading

    document.querySelector(".contact-form h3").textContent =
        "Request a Free Demo";

});

// 4. AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();