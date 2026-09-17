/* =========================================
   ELECTRA — INTERACTIVE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    if (mobileMenu.style.display === "flex") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "flex";
    }

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
    });

});


/* =========================================
   INFORMATION MODAL
========================================= */

const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");


const information = {

    election: {
        title: "How Elections Work",
        text:
        "Elections are organized processes through which eligible citizens select representatives or decide on questions according to the applicable electoral system. The exact process, dates and rules depend on the jurisdiction."
    },

    eligibility: {
        title: "Voter Eligibility",
        text:
        "Voter eligibility depends on the laws applicable to a particular election. Requirements can include citizenship, minimum age, registration and other legal conditions. Always check the relevant official election authority for current requirements."
    },

    process: {
        title: "Voting Process",
        text:
        "A typical polling process can involve verifying voter information, checking identification where required, receiving authorization to vote, making a selection privately, and completing the voting procedure. Exact procedures vary by jurisdiction."
    }

};


function showInfo(type) {

    const data = information[type];

    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modal.classList.add("active");

}


function closeModal() {

    modal.classList.remove("active");

}


modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


/* =========================================
   VOTING SIMULATOR
========================================= */

let selectedCandidate = null;

const candidateButtons =
    document.querySelectorAll(".candidate-option");

const continueButton =
    document.getElementById("continueButton");


/* Candidate selection */

candidateButtons.forEach(button => {

    button.addEventListener("click", () => {

        candidateButtons.forEach(item => {
            item.classList.remove("selected");

            const radio = item.querySelector(".radio");

            radio.classList.remove("checked");
        });


        button.classList.add("selected");

        const radio = button.querySelector(".radio");

        radio.classList.add("checked");


        selectedCandidate =
            button.dataset.candidate;


        continueButton.disabled = false;

    });

});


/* Continue to review */

continueButton.addEventListener("click", () => {

    if (!selectedCandidate) return;

    document.getElementById(
        "selectedCandidate"
    ).textContent = selectedCandidate;


    goToStep(2);

});


/* =========================================
   STEP NAVIGATION
========================================= */

function goToStep(stepNumber) {

    const steps =
        document.querySelectorAll(".sim-step");

    steps.forEach(step => {
        step.classList.remove("active");
    });


    document.getElementById(
        `simStep${stepNumber}`
    ).classList.add("active");


    updateStepIndicators(stepNumber);

}


function updateStepIndicators(stepNumber) {

    for (let i = 1; i <= 4; i++) {

        const indicator =
            document.getElementById(
                `stepIndicator${i}`
            );

        indicator.classList.remove("active");

        if (i <= stepNumber) {
            indicator.classList.add("active");
        }

    }

}


/* =========================================
   CONFIRM VOTE
========================================= */

function confirmVote() {

    if (!selectedCandidate) {
        return;
    }


    document.getElementById(
        "evmCandidate"
    ).textContent = selectedCandidate;


    document.getElementById(
        "vvpatCandidate"
    ).textContent = selectedCandidate;


    generateVoteId();


    goToStep(4);

}


/* =========================================
   DEMO VOTE ID
========================================= */

function generateVoteId() {

    const number =
        Math.floor(
            10000 + Math.random() * 90000
        );


    document.getElementById(
        "voteId"
    ).textContent =
        `DEMO-${number}`;

}


/* =========================================
   RESET SIMULATOR
========================================= */

function resetSimulator() {

    selectedCandidate = null;


    candidateButtons.forEach(button => {

        button.classList.remove("selected");

        button.querySelector(".radio")
            .classList.remove("checked");

    });


    continueButton.disabled = true;


    goToStep(1);

}


/* =========================================
   KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        ".feature-card, .info-card, .learning-card"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity .5s ease, transform .5s ease";

        observer.observe(element);

    });