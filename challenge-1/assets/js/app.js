$(document).ready(function () {
  if (localStorage.access_token) {
    changeCurrentEmailAndRole({
      email: localStorage.email,
      role: localStorage.role,
    });
    showMainPage();
  } else {
    showRegisterPage();
  }
  $("#formLogin").on("submit", (e) => {
    e.preventDefault();
    login();
  });
  $("#formRegister").on("submit", (e) => {
    e.preventDefault();
    register();
  });
  $("#accommodationForm").on("submit", (e) => {
    e.preventDefault();
    if (currentPage !== "update") {
      createNewAccommodation();
    } else {
      console.log(updatedId);
      updateAccommodation(+updatedId);
    }
  });
});