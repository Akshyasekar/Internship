const API_URL = "http://localhost:5000";


// ========================================
// LOAD PROJECTS
// ========================================

async function loadProjects() {

    const container = document.getElementById("projects-container");

    try {

        const response = await fetch(
            `${API_URL}/api/projects`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const projects = await response.json();

        container.innerHTML = "";

        if (projects.length === 0) {

            container.innerHTML = `
                <p>No projects available.</p>
            `;

            return;
        }


        projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "project-card";


            card.innerHTML = `

                <h3>${project.title}</h3>

                <p>
                    ${project.description}
                </p>

                <p class="technologies">
                    Technologies:
                    ${project.technologies || "Not specified"}
                </p>

                <div class="project-links">

                    ${
                        project.github
                        ?
                        `<a href="${project.github}"
                            target="_blank">
                            GitHub
                        </a>`
                        :
                        ""
                    }

                    ${
                        project.demo
                        ?
                        `<a href="${project.demo}"
                            target="_blank">
                            Live Demo
                        </a>`
                        :
                        ""
                    }

                </div>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p>
                Unable to load projects.
                Please make sure the backend server is running.
            </p>
        `;
    }
}



// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contact-form");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const status =
        document.getElementById("contact-status");


    if (!name || !email || !message) {

        status.textContent =
            "Please fill all fields.";

        return;
    }


    try {

        status.textContent =
            "Sending message...";


        const response = await fetch(
            `${API_URL}/api/contacts`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to send message"
            );

        }


        status.textContent =
            "Message sent successfully!";


        contactForm.reset();


    } catch (error) {

        console.error(error);

        status.textContent =
            "Failed to send message. Please try again.";

    }

});



// ========================================
// RUN WHEN PAGE LOADS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadProjects
);
