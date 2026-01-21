const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav_link");
function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
}
navLink.forEach(n => n.addEventListener("click", linkAction));

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        const link = document.querySelector(
            ".nav_menu a[href*=" + sectionId + "]"
        );

        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true
});

sr.reveal(".home_title", {});
sr.reveal(".home_scroll", { delay: 200 });
sr.reveal(".home_img", { origin: "right", delay: 400 });

sr.reveal(".about_img", { delay: 200 });
sr.reveal(".about_subtitle", { delay: 300 });
sr.reveal(".about_profession", { delay: 400 });
sr.reveal(".about_text", { delay: 500 });
sr.reveal(".about_social-icon", { delay: 600, interval: 200 });

sr.reveal(".education_content", { delay: 500 });
sr.reveal(".education_title", { interval: 200 })
sr.reveal(".education_school", { interval: 300 })
sr.reveal(".education_year", { interval: 400 })

sr.reveal(".skills_subtitle", {});
sr.reveal(".skills_name", { distance: "20px", delay: 50, interval: 100 });
sr.reveal(".skills_img", { delay: 400 });

sr.reveal(".certificates_img", { interval: 200 });

sr.reveal(".projects_card", { interval: 200 })

sr.reveal(".contact_subtitle", {});
sr.reveal(".contact_text", { interval: 200 });
sr.reveal(".contact_input", { delay: 400 });
sr.reveal(".contact_button", { delay: 600 });

const sound = new Howl({
    src: ["music/anywhere.mp3"],
    loop: true
});

const toggleBtn = document.getElementById("toggle-button");
if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        if (sound.playing()) {
            sound.pause();
            this.innerHTML = "<i class='bx bx-play'></i>";
        } else {
            sound.play();
            this.innerHTML = "<i class='bx bx-pause'></i>";
        }
    });
}

window.addEventListener("load", () => {
    sound.play();
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCR-xP1kadSWveBi8NnfN8ijJw9-PXpJVw",
    authDomain: "portfolio-database-83463.firebaseapp.com",
    projectId: "portfolio-database-83463",
    storageBucket: "portfolio-database-83463.firebasestorage.app",
    messagingSenderId: "414261455473",
    appId: "1:414261455473:web:f564e45db4a42646eb89d0",
    measurementId: "G-7NS0ENZ6KL"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            await addDoc(collection(db, "messages"), {
                name,
                email,
                message,
                createdAt: serverTimestamp()
            });

            alert("Message sent successfully!");
            contactForm.reset();
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    });
});
