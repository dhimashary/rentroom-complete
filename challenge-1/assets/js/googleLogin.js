function renderButton() {
  console.log("called");
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}

function renderButton2() {
  console.log("called");
  gapi.signin2.render("my-signin3", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}

function onSuccess(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  axios({
    method: "POST",
    url: `${baseUrl}/users/googlelogin`,
    data: {
      googleToken: id_token
    }
  })
  .then(({ data }) => {
    setLocalStorage(data);
    showMainPage();
  })
  .catch(err => {
    setNotif("error", "Oops Login with Google failed...")
  })
}

function onFailure(error) {
  console.log(error);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.clear();
    $("#loginPage").show();
    $("#app").hide();
  });
}
