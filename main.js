// THEME ----------

// Get user theme settings saved by the site (if they exist)
var theme = localStorage.getItem("theme");
var has_set_theme = localStorage.getItem("has_set_theme");

// Set the user's color scheme
function getColorScheme(){
    if(theme !== null){ // If user has visited prior
        document.documentElement.setAttribute("data-theme", theme);
        return;
    }

    // Check user system preference, then set accordingly
    theme = "light";
    if(prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches){
        theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

getColorScheme() // Run before page draws

// On page load, check the checkbox if the user prefers dark mode and then add a listener for the checkbox
window.onload = function applyCheck(){
    if(!has_set_theme){
        var fv_label = document.querySelector("#night-light + label");
        fv_label.classList.add("first_visit");
    }

    document.documentElement.style.setProperty("--night-light-url", `url(/img/night_light/nl_${theme}.png)`);

    var other = "dark";
    switch(theme){
        case "dark":
            document.getElementById("night-light").checked = true
            other = "light";
            break;
        default:
            break;
    }

    // Toggle dark mode via the night light
    var checkbox = document.getElementById("night-light");
    
    var v_checkbox = document.getElementById("night-light-label");

    v_checkbox.addEventListener("mousedown", function() {
        this.classList.add("pulldown");
    });
    v_checkbox.addEventListener("mouseup", function() {
        this.classList.remove("pulldown");
        if(checkbox.checked){
            theme = "light";
        }
        else{
            theme = "dark";
        }
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        localStorage.setItem("has_set_theme", true);
        document.documentElement.style.setProperty("--night-light-url", `url(/img/night_light/nl_${theme}.png)`);
        
        if(has_set_theme){
            return;
        }

        fv_label.classList.add("theme_is_set")

    });
}



// SVG ----------

function applyHeight(element){
    element.setAttribute("width", "100%");
    element.setAttribute("height", `${Math.floor(element.getBoundingClientRect().height)}px`);
}



// Hamburger Menu ----------

window.addEventListener("load", () => {

    var hamburger = document.getElementById("hamburger"),
        frame_left = document.querySelector(".frame_left"),
        blackout = document.getElementById("mobile-blackout");

    hamburger.addEventListener("change", function() {
        controlNav(hamburger.checked);
    });

    blackout.addEventListener("click", function() {
        hamburger.checked = false;
        controlNav(hamburger.checked);
    });

    function controlNav(state){
        if(state){
            frame_left.classList.add("hamburger_pullout");
            blackout.classList.add("hamburger_pullout");
        } else {
            frame_left.classList.remove("hamburger_pullout");
            blackout.classList.remove("hamburger_pullout");
        }
    }

});