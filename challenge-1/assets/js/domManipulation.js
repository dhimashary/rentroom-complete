function setLocalStorage(data) {
  localStorage.access_token = data.accessToken;
  localStorage.role = data.role;
  localStorage.email = data.email;
  changeCurrentEmailAndRole(data);
}

function generateAccomodationRow(accommodation) {
  const {
    id,
    name,
    price,
    location,
    imgUrl,
    facility,
    roomCapacity,
    User,
    Type,
  } = accommodation;
  let availableAction;
  if (
    User.email === localStorage.getItem("email") ||
    localStorage.getItem("role") === "admin"
  ) {
    availableAction = `<button class="btn btn-success d-block mb-2 fs-6 col-12" onclick="showUpdateForm(${id})">Update</button>
      <button class="btn btn-warning d-block fs-6 col-12" onclick="deleteAccommodation(${id})">Delete</button>`;
  } else {
    availableAction = "-";
  }
  return `<tr>
    <td>${name}</td>
    <td>${facility.slice(0, 100) + "..."}</td>
    <td>${roomCapacity}</td>
    <td>
      <img src="${imgUrl}" class="img img-fluid">
    </td>
    <td>${User.email}</td>
    <td>${location}</td>
    <td>Rp. ${price}</td>
    <td>${Type.name}</td>
    <td>
      ${availableAction}
    </td>
  </tr>`;
}

function generateAccommodationsTable(accommodations) {
  let accommodationsTable = "";
  $("#accommodationRows").empty();
  accommodations.forEach((accommodation) => {
    accommodationsTable += generateAccomodationRow(accommodation);
  });
  $("#accommodationRows").append(accommodationsTable);
}

function changeCurrentEmailAndRole(data) {
  $("#currentEmail").text(data.email);
  $("#currentRole").text(data.role);
}

function showMainPage() {
  $("#registerPage").hide();
  $("#loginPage").hide();
  $("#app").show();
  $("#mainTable").show();
  $("#accommodationFormContainer").hide();
  $("#mainNotification").hide();
  getAccommodations();
}

function showRegisterPage() {
  $("#registerPage").show();
  $("#loginPage").hide();
  $("#app").hide();
}

function showLoginPage() {
  $("#registerPage").hide();
  $("#loginPage").show();
  $("#app").hide();
}

function toggleButtonAccommodationForm() {
  const toggleButton = $("#buttonAccommodationForm");
  if (toggleButton.hasClass("hide-form")) {
    toggleButton.removeClass("hide-form");
    toggleButton.text("Show Accommodation List");
    $("#app").show();
    $("#mainTable").hide();
    $("#accommodationFormContainer").show();
    $("#accommodationFormHeader").text("Add New Accommodation");
  } else {
    toggleButton.addClass("hide-form");
    toggleButton.text("Create New Accommodation");
    $("#app").show();
    $("#mainTable").show();
    $("#accommodationFormHeader").text("Show Accommodation");
    $("#accommodationFormContainer").hide();
  }
}

async function showUpdateForm(id) {
  currentPage = "update";
  updatedId = id;
  try {
    const toggleButton = $("#buttonAccommodationForm");
    $("#app").show();
    $("#mainTable").hide();
    $("#accommodationFormContainer").show();
    toggleButton.removeClass("hide-form");
    toggleButton.text("Show Accommodation List");
    $("#accommodationFormHeader").text("Update Accommodation");
    console.log(id);
    const accommodation = await getAccommodationById(id);
    const {
      name,
      roomCapacity,
      location,
      Type,
      price,
      facility,
      imgUrl,
    } = accommodation;
    $("#name").val(name);
    $("#roomCapacity").val(roomCapacity);
    $("#price").val(price);
    $("#typeId").val(Type.id);
    $("#location").val(location);
    $("#facility").text(facility);
    $("#imgUrl").val(imgUrl);
  } catch (error) {
    setAppNotif("alert-danger", "Oops Something is Wrong ! :(");
  }
}

function getAccommodationFormInput() {
  const newAccommodation = {};
  // const formInput = new FormData($("#accommodationForm"))
  const formInputChildren = $("#accommodationForm").children();
  $("#accommodationForm input, select, textarea").each(function () {
    var input = $(this); // This is the jquery object of the input, do what you will
    console.log(input.attr("id"));
    console.log(input.val());
    if (input.attr("type") === "number") {
      newAccommodation[input.attr("id")] = Number(input.val());
    } else {
      newAccommodation[input.attr("id")] = input.val();
    }
  });
  console.log(newAccommodation);
  return newAccommodation;
}

function setNotif(status, message) {
  let notifId;
  if (status === "error") {
    notifId = $("#notifFail");
  } else {
    notifId = $("#notifSuccess");
  }
  notifId.text(message);
  notifId.removeClass("d-none");
  setTimeout(() => {
    notifId.text("");
    notifId.addClass("d-none");
  }, 2000);
}

function setAppNotif(status, message) {
  let notifId = $("#mainNotification");
  let content = $("#notificationContent");
  if (status === "alert-success") {
    content.removeClass("alert-danger");
  } else {
    content.removeClass("alert-success");
  }
  notifId.show();
  content.addClass(status);
  content.text(message);
  console.log("IM HERE");
  setTimeout(() => {
    notifId.hide();
  }, 20000);
}
