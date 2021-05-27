function updateAccommodation(id) {
  const updatedAccommodation = getAccommodationFormInput();
  if (!formData.has("accommodationImage")) {
    updatedAccommodation.imgUrl = $("#imgUrl").text();
  }
  for (let key in updatedAccommodation) {
    formData.append(key, updatedAccommodation[key]);
  }
  setAppNotif("alert-success", "Updating new Data please wait");
  axios({
    method: "PUT",
    url: `${baseUrl}/accommodations/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: formData,
  })
    .then(({ data }) => {
      setAppNotif("alert-success", "Update Accommodation Success");
      setTimeout(() => {
        toggleButtonAccommodationForm();
        showMainPage();
      }, 500)
    })
    .catch((err) => {
      setAppNotif("alert-danger", err.response.data.message);
    })
    .finally((_) => {
      setAppNotifHide()
      updatedId = null;
      currentPage = null;
      $("#accommodationForm").trigger("reset");
      formData = new FormData();
      $("#fileInput").val(null);
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
        setAppNotif("alert-success", "Delete success");
        setTimeout(() => {
          showMainPage();
        }, 500)
      })
      .catch((err) => {
        setAppNotif("alert-danger", err.response.data);
      })
      .finally(_ => {
        setAppNotifHide()
      })
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
    setAppNotifHide()
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
      totalTablePage = Math.ceil(data.length / totalRowPage);
      currentTablePage = 1;
      accommodations = data;
      generatePagination();
      generateAccommodationsTable();
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewAccommodation() {
  const newAccommodation = getAccommodationFormInput();
  delete newAccommodation.imgUrl;
  if (formData.has("accommodationImage") === false) {
    setAppNotif("alert-danger", "Image must be provided");
    setAppNotifHide()
  } else {
    for (let key in newAccommodation) {
      formData.append(key, newAccommodation[key]);
    }
    setAppNotif("alert-success", "Uploading new Data please wait");
    axios({
      method: "POST",
      url: `${baseUrl}/accommodations`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: formData,
    })
      .then(({ data }) => {
        setAppNotif("alert-success", "Create new Accommodation Success");
        setTimeout(() => {
          toggleButtonAccommodationForm();
          showMainPage();
        }, 1000);
      })
      .catch((err) => {
        setAppNotif("alert-danger", err.response.data.message);
      })
      .finally((_) => {
        setAppNotifHide()
        $("#accommodationForm").trigger("reset");
        formData = new FormData();
        $("#fileInput").val(null);
      });
  }
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
