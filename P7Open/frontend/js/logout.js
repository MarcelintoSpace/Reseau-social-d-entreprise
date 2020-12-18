//logout avec retour à la page d'accueil
function logout() {
    let logOutBtn = document.querySelectorAll("#logout");
    for (i = 0; i < logOutBtn.length; i++) {
      element = logOutBtn[i];
      element.addEventListener("click", () => {
        localStorage.clear();
        window.location = "login.html";
      });
    }
  }

  logout();
