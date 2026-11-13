
/* =====================================================
   FLOWDESK - ADVANCED FRONTEND JAVASCRIPT
   Project: SaaS Productivity Landing Page
   Technologies: Vanilla JavaScript (ES6+)
===================================================== */

"use strict";

/* =====================================================
   1. DOM ELEMENTS
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationItems = document.querySelectorAll("#navLinks a");

const demoForm = document.getElementById("demoForm");
const formMessage = document.getElementById("formMessage");

const dashboard = document.querySelector(".dashboard");
const progressFill = document.querySelector(".progress-fill");

const completedTasksElement = document.querySelector(
    ".stat-box h2"
);

const yearElement = document.getElementById("year");

let selectedPlan = "Not selected";
let menuIsOpen = false;


/* =====================================================
   2. MOBILE NAVIGATION
===================================================== */

function openMenu() {

    navLinks.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuIsOpen = true;
}

function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuIsOpen = false;
}

menuToggle.addEventListener("click", () => {

    if (menuIsOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


// Close menu after clicking any navigation link

navigationItems.forEach((link) => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


// Close menu using Escape key

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && menuIsOpen) {

        closeMenu();

        menuToggle.focus();

    }

});


// Close menu when clicking outside the navigation

document.addEventListener("click", (event) => {

    if (
        menuIsOpen &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        closeMenu();

    }

});


/* =====================================================
   3. ACTIVE NAVIGATION ON SCROLL
===================================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const sectionObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const activeId = entry.target.id;

                navigationItems.forEach((link) => {

                    const isActive =
                        link.getAttribute("href") === "#" + activeId;

                    if (link.classList.contains("nav-button")) {
                        return;
                    }

                    link.classList.toggle("active-link", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }

                });

            }

        });

    },

    {
        root: null,
        threshold: 0,
        rootMargin: "-25% 0px -65% 0px"
    }

);

pageSections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =====================================================
   4. PRICING PLAN SELECTION
===================================================== */

const pricingButtons = document.querySelectorAll("[data-plan]");

const formHeading = document.querySelector(".contact-form h3");

pricingButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectedPlan = button.dataset.plan;

        // Update contact form heading

        formHeading.textContent =
            "Request Your " + selectedPlan + " Demo";

        // Clear previous form messages

        formMessage.textContent = "";

        formMessage.classList.remove("error");

        // Scroll user to contact form

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   5. FORM INPUT ELEMENTS
===================================================== */

const nameInput = document.getElementById("fullName");

const emailInput = document.getElementById("email");

const teamInput = document.getElementById("teamSize");

const formFields = [
    nameInput,
    emailInput,
    teamInput
];


/* =====================================================
   6. CUSTOM FORM VALIDATION
===================================================== */

// Create individual error messages dynamically

function getErrorElement(field) {

    const errorId = field.id + "Error";

    let errorElement = document.getElementById(errorId);

    if (!errorElement) {

        errorElement = document.createElement("small");

        errorElement.id = errorId;

        errorElement.className = "field-error";

        errorElement.style.color = "#d14343";

        errorElement.style.fontSize = "10px";

        errorElement.style.display = "block";

        errorElement.style.marginTop = "4px";

        field.insertAdjacentElement("afterend", errorElement);

        field.setAttribute("aria-describedby", errorId);

    }

    return errorElement;

}


// Validate individual form fields

function validateField(field) {

    const value = field.value.trim();

    let error = "";

    if (field === nameInput) {

        if (value === "") {

            error = "Full name is required.";

        } else if (value.length < 2) {

            error = "Name must contain at least 2 characters.";

        } else if (!/^[\p{L}\p{M} .'-]+$/u.test(value)) {

            error = "Please enter a valid name.";

        }

    }


    if (field === emailInput) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (value === "") {

            error = "Email address is required.";

        } else if (!emailPattern.test(value)) {

            error = "Please enter a valid email address.";

        }

    }


    if (field === teamInput) {

        if (value === "") {

            error = "Please select your team size.";

        }

    }


    const errorElement = getErrorElement(field);

    errorElement.textContent = error;

    field.setAttribute(
        "aria-invalid",
        error ? "true" : "false"
    );

    return error === "";

}


// Validate fields as users type or change selections

formFields.forEach((field) => {

    const eventName =
        field.tagName === "SELECT" ? "change" : "input";

    field.addEventListener(eventName, () => {

        validateField(field);

        formMessage.textContent = "";

        formMessage.classList.remove("error");

    });

});


/* =====================================================
   7. FORM SUBMISSION
===================================================== */

demoForm.addEventListener("submit", (event) => {

    event.preventDefault();

    formMessage.textContent = "";

    formMessage.classList.remove("error");

    // Validate all fields

    let formIsValid = true;

    formFields.forEach((field) => {

        const valid = validateField(field);

        if (!valid) {
            formIsValid = false;
        }

    });


    // Stop submission if any field is invalid

    if (!formIsValid) {

        formMessage.textContent =
            "Please correct the highlighted fields.";

        formMessage.classList.add("error");

        const firstInvalidField = formFields.find(
            (field) => field.getAttribute("aria-invalid") === "true"
        );

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;

    }


    // Collect valid form information

    const formData = {

        name: nameInput.value.trim(),

        email: emailInput.value.trim(),

        teamSize: teamInput.value,

        selectedPlan: selectedPlan,

        submittedAt: new Date().toLocaleString()

    };


    // Display successful frontend validation

    formMessage.textContent =
        "Thank you, " + formData.name +
        "! Your " + formData.selectedPlan +
        " demo request has been validated successfully.";


    formMessage.classList.remove("error");


    // Log the form data for development/testing

    console.log("FlowDesk Demo Form Data:", formData);


    // Reset form fields

    demoForm.reset();


    // Clear individual validation errors

    formFields.forEach((field) => {

        field.setAttribute("aria-invalid", "false");

        const errorElement = document.getElementById(
            field.id + "Error"
        );

        if (errorElement) {
            errorElement.textContent = "";
        }

    });


    // Reset selected pricing plan

    selectedPlan = "Not selected";

    formHeading.textContent = "Request a Free Demo";

});


/* =====================================================
   8. INTERACTIVE DASHBOARD TASKS
===================================================== */

const taskItems = document.querySelectorAll(".task-item");

let completedTaskCount = 0;


// Make dashboard tasks keyboard accessible

taskItems.forEach((task, index) => {

    task.setAttribute("tabindex", "0");

    task.setAttribute("role", "button");

    task.setAttribute(
        "aria-label",
        "Toggle completion of " +
        task.querySelector(".task-details strong").textContent
    );

    task.setAttribute(
        "aria-pressed",
        task.querySelector(".task-status").textContent === "Done"
            ? "true"
            : "false"
    );


    function toggleTask() {

        const status = task.querySelector(".task-status");

        const symbol = task.querySelector(".task-symbol");

        const isCompleted =
            status.textContent.trim() === "Done";

        if (isCompleted) {

            status.textContent = "Active";

            status.className = "task-status progress-status";

            symbol.textContent = "✦";

            symbol.className = "task-symbol purple";

            completedTaskCount--;

        } else {

            status.textContent = "Done";

            status.className = "task-status done-status";

            symbol.textContent = "✓";

            symbol.className = "task-symbol green";

            completedTaskCount++;

        }

        task.setAttribute(
            "aria-pressed",
            String(!isCompleted)
        );

        updateDashboard();

    }


    task.addEventListener("click", toggleTask);

    task.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            toggleTask();

        }

    });

});


// Update dashboard statistics

function updateDashboard() {

    if (completedTasksElement) {

        const total = 24 + completedTaskCount;

        completedTasksElement.textContent = total;

    }

    if (progressFill) {

        const progress = Math.min(
            100,
            Math.max(0, 75 + completedTaskCount * 5)
        );

        progressFill.style.width = progress + "%";

        const progressLabel = document.querySelector(
            ".progress-info b"
        );

        if (progressLabel) {

            progressLabel.textContent = progress + "%";

        }

    }

}


/* =====================================================
   9. DASHBOARD ENTRY ANIMATION
===================================================== */

const dashboardObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("dashboard-visible");

                if (progressFill) {

                    progressFill.style.transition =
                        "width 1.2s ease";

                }

                dashboardObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.25
    }

);

if (dashboard) {

    dashboardObserver.observe(dashboard);

}


/* =====================================================
   10. SCROLL TO TOP BUTTON
===================================================== */

// Create a back-to-top button dynamically

const backToTop = document.createElement("button");

backToTop.textContent = "↑";

backToTop.id = "backToTop";

backToTop.setAttribute("aria-label", "Back to top");

backToTop.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 10px;
    background: #7557e8;
    color: white;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(117, 87, 232, 0.25);
`;

document.body.appendChild(backToTop);


// Show or hide the button while scrolling

window.addEventListener("scroll", () => {

    const shouldShow = window.scrollY > 400;

    backToTop.style.opacity = shouldShow ? "1" : "0";

    backToTop.style.visibility = shouldShow
        ? "visible"
        : "hidden";

    backToTop.style.transform = shouldShow
        ? "translateY(0)"
        : "translateY(10px)";

}, { passive: true });


// Scroll to top when clicked

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   11. DYNAMIC COPYRIGHT YEAR
===================================================== */

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================================
   12. INITIAL PAGE SETUP
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    closeMenu();

    console.log(
        "FlowDesk initialized successfully."
    );

    console.log(
        "Frontend features: Navigation, Validation, " +
        "Pricing, Dashboard and Scroll Interactions."
    );

});
