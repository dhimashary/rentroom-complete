function updateAccommodation(id) {
  const updatedAccommodation = getAccommodationFormInput();
  axios({
    method: "PUT",
    url: `${baseUrl}/accommodations/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: updatedAccommodation,
  })
    .then(({ data }) => {
      setAppNotif("alert-success", "Update Accommodation Success");
      toggleButtonAccommodationForm();
      showMainPage();
    })
    .catch((err) => {
      setAppNotif("alert-danger", err.response.data.message);
    })
    .finally((_) => {
      updatedId = null;
      currentPage = null;
      $("#accommodationForm").trigger("reset");
    });
}

function deleteAccommodation(id) {
  const deleteConfirmation = confirm(
    "Are you sure want to delete this Accommodation?"
  );
  if (deleteConfirmation) {
    axios({
      method: "DELETE",
      url: `${baseUrl}/accommodations/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        showMainPage();
      })
      .catch((err) => {
        setAppNotif("alert-danger", err.response.data);
      });
  }
}

async function getAccommodationById(id) {
  try {
    const accommodation = await axios({
      method: "GET",
      url: `${baseUrl}/accommodations/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return accommodation.data;
  } catch (error) {
    setAppNotif("alert-danger", error.response.data);
  }
}

function getAccommodations() {
  axios({
    method: "GET",
    url: `${baseUrl}/accommodations`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .then(({ data }) => {
      generateAccommodationsTable(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewAccommodation() {
  const newAccommodation = getAccommodationFormInput();
  axios({
    method: "POST",
    url: `${baseUrl}/accommodations`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: newAccommodation,
  })
    .then(({ data }) => {
      setAppNotif("alert-success", "Create new Accommodation Success");
      toggleButtonAccommodationForm();
      showMainPage();
    })
    .catch((err) => {
      setAppNotif("alert-danger", err.response.data.message);
    })
    .finally((_) => {
      $("#accommodationForm").trigger("reset");
    });
}


function login() {
  const email = $("#emailLogin").val();
  const password = $("#passwordLogin").val();
  axios({
    method: "POST",
    url: `${baseUrl}/users/login`,
    data: {
      email,
      password,
    },
  })
    .then(({ data }) => {
      setLocalStorage(data);
      showMainPage();
    })
    .catch((err) => {
      setNotif("error", err.response.data.message);
    })
    .finally((_) => {
      $("#formLogin").trigger("reset");
    });
}

function register() {
  const email = $("#emailRegister").val();
  const password = $("#passwordRegister").val();
  axios({
    method: "POST",
    url: `${baseUrl}/users/register`,
    data: {
      email,
      password,
    },
  })
    .then(({ data }) => {
      setLocalStorage(data);
      showMainPage();
    })
    .catch((err) => {
      setNotif("error", err.response.data.message);
    })
    .finally((_) => {
      $("#formRegister").trigger("reset");
    });
}
