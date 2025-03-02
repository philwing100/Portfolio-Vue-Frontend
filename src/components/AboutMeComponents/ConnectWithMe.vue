<template>
    <div :class="['connect-container', isBlack ? 'black-theme' : 'white-theme']">
        <h2 class="connect-title">Let's Connect!</h2>
        <p class="connect-text">Interested in collaborating or just want to say hi? Feel free to reach out.</p>

        <div class="connect-links">
            <!-- Email link -->
            <div class="email-container">
                <a :href="'mailto:' + email" class="connect-link">
                    <i class="fa fa-envelope"></i> <span class="email-text">philwing100@gmail.com</span>
                </a>
            </div>

            <!-- GitHub link -->
            <a :href="githubLink" target="_blank" class="connect-link">
                <font-awesome-icon :icon="['fab', 'github']" class="icon github" />&nbsp;GitHub
            </a>

            <!-- LinkedIn link -->
            <a :href="linkedin" target="_blank" class="connect-link">
                <font-awesome-icon :icon="['fab', 'linkedin']" class="icon linkedin" />&nbsp;LinkedIn
            </a>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faLinkedin);

export default {
    components: {
        FontAwesomeIcon,
    },
    props: {
        isBlack: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            email: "philwing100@gmail.com",
            githubLink: "https://github.com/philwing100",
            linkedin: "https://www.linkedin.com/in/ring-phillip/"
        };
    }
};
</script>

<style scoped>
/* Style for GitHub and LinkedIn icons */
.github {
    color: black; /* GitHub icon in black */
}

.linkedin {
    color: #0a66c2; /* LinkedIn blue */
}

/* Shared styles */
.connect-container {
    text-align: center;
    padding: 30px;
    border-radius: 10px;
    transition: transform 0.2s ease-in-out;
}

.connect-container:hover {
    transform: scale(1.02);
}

/* Title & Text */
.connect-title {
    font-size: 1.8rem;
    margin-bottom: 10px;
}

.connect-text {
    font-size: 1rem;
    margin-bottom: 20px;
}

/* Links container */
.connect-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
}

/* Individual link styling */
.connect-link {
    text-decoration: none;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.connect-link i {
    margin-right: 10px;
}

/* Email container */
.email-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.email-text {
    margin-left: 5px;
}

.email-address {
    font-size: 0.9rem;
    display: block;
    margin-top: 5px;
    text-align: center;
}

/* Black theme */
.black-theme {
    background: #111;
    border: 2px solid #333;
    color: white;
}

.black-theme .connect-title,
.black-theme .connect-text {
    color: #fff;
}

.black-theme .connect-link {
    background: #222;
    color: #fff;
    border: 1px solid #444;
}

.black-theme .connect-link:hover {
    background: #333;
    border-color: #666;
}

.black-theme .email-address {
    color: #aaa;
}

/* White theme */
.white-theme {
    background: #f9f9f9;
    border: 2px solid #ddd;
    color: black;
}

.white-theme .connect-title,
.white-theme .connect-text {
    color: #222;
}

.white-theme .connect-link {
    background: #eee;
    color: #222;
    border: 1px solid #ccc;
}

.white-theme .connect-link:hover {
    background: #ddd;
    border-color: #bbb;
}

.white-theme .email-address {
    color: #444;
}
</style>
