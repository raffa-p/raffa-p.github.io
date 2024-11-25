document.addEventListener("DOMContentLoaded", () => {
    topBarNavigation();
    document.querySelector("[data-nav-theme]").addEventListener("click", changeTheme);
    window.addEventListener("resize", sidebarResponsive); 
    checkMinWidth();   
    window.addEventListener("resize", checkMinWidth);    
    

    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function () {
            if (form.checkValidity()) { formBtn.removeAttribute("disabled"); } 
            else { formBtn.setAttribute("disabled", ""); }
        });
    }

    document.getElementById("submit-btn").addEventListener("click", (e) => {
        e.preventDefault();
        sendEmail();
    });
});

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

function topBarNavigation(){
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    
    navigationLinks.forEach((link) => {
      link.addEventListener("click",  (e) => {
    
        pages.forEach((page) => page.classList.remove("active"));
        navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    
        const targetPage = e.target.innerText.toLowerCase();
        pages.forEach((page) => {
          if (page.dataset.page === targetPage) {
            page.classList.add("active");
          }
        });
    
        e.target.classList.add("active");
        window.scrollTo(0, 0);

        
      });
    });
}

function changeTheme(){
    const current = document.querySelector("html").getAttribute("data-theme");
    if(current === "light"){ document.querySelector("html").setAttribute("data-theme", "dark"); }
    else{ document.querySelector("html").setAttribute("data-theme", "light"); }
}


function sidebarResponsive(){
    let currentWidth = window.innerWidth;
    if (currentWidth < 768 && currentWidth > 580) {
        let sidebar = document.querySelector(".sidebar");
        const hLines = sidebar.querySelectorAll(".h-line");

        if (hLines.length >= 2) {
            let newDiv = document.querySelector("#temp-div");
            if (!newDiv) {
                newDiv = document.createElement("div");
                newDiv.id = "temp-div";
            }

            sidebar.insertBefore(newDiv, hLines[1]);

            const elements = document.querySelectorAll(".info-elem");
            elements.forEach(element => {
                newDiv.appendChild(element);
            });
        }
    }
    else{
        let sidebar = document.querySelector(".sidebar");
        const tempDiv = document.querySelector("#temp-div");

        if (tempDiv) {
            const hLines = sidebar.querySelectorAll(".h-line");
            if (hLines.length >= 2) {
                const elements = tempDiv.querySelectorAll(".info-elem");
                elements.forEach(element => {
                    sidebar.insertBefore(element, hLines[1]);
                });

                tempDiv.remove();
            }
        }
    }
}


function checkMinWidth(){
    let currentWidth = window.innerWidth;
    let div = document.getElementById("obscure");
    if (currentWidth < 450){ 
        div.style.display = "flex"; 
        document.querySelector("body").style.overflow = "hidden";
    }
    else{ 
        div.style.display = "none"; 
        document.querySelector("body").style.overflow = "auto";
    }
}






function sendEmail(){
    if(document.getElementById("submit-btn").disabled) return;
    
    const data = document.querySelectorAll("[data-form-input]");

    const bodyMessage = 'Full Name: ' + data[0].value + '<br> Email: ' + data[1].value + '<br>' + data[2].value + '';
//console.log(bodyMessage); return;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "personal.page.contacts@gmail.com",
        Password : "2FA70566A68F7B077ECA741AD538DD8CC9B7",
        To : 'personal.page.contacts@gmail.com',
        From : 'personal.page.contacts@gmail.com',
        Subject : "Contact request",
        Body : bodyMessage
    }).then(
      message => {
        const containerSpan = document.getElementById("response-container");
        const spanTarget = document.getElementById("message-response");
        if(message == "OK"){ spanTarget.innerText = "Message sent."; }
        else{ spanTarget.innerText = "Error occurred."; }

        let closebtncontainer = document.createElement("button");
        closebtncontainer.type = "button";
        closebtncontainer.id = "close-btn-response";
        let closebtn = document.createElement("i");
        closebtn.className = "material-icons";
        closebtn.innerHTML = "&#xe5cd;";
        closebtncontainer.appendChild(closebtn);
        spanTarget.appendChild(closebtncontainer);
        closebtncontainer.addEventListener("click", () => { containerSpan.classList.remove("active"); });
        containerSpan.classList.add("active");
        let timer = setTimeout(() => { containerSpan.classList.remove("active"); }, 5000);
      }
    );
}





