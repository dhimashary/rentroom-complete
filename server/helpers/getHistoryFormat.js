module.exports = function (accommodation, email, options) {
  let description = ""
  if (options.status === "delete") {
    description = `Accommodation with id ${accommodation.id} permanently deleted`
  } else if (options.status === "put") {
    description = `Accommodation with id ${accommodation.id} updated`
  } else if (options.status === "create") {
    description = `Accommodation with id ${accommodation.id} created`
  } else if (options.status === "patch") {
    description = `Accommodation with id ${accommodation.id} status has been updated from ${options.oldStatus} to ${options.newStatus}`
  }
  return {
    accommodationId: accommodation.id,
    title: accommodation.name,
    description,
    updatedBy: email,
  };
};
