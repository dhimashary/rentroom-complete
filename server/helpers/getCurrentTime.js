module.exports = function () {
  const createdAt = new Date();
  const date = createdAt.getDate();
  const year = createdAt.getFullYear();
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const month = createdAt.getMonth();
  return {
    createdAt,
    date,
    year,
    hours,
    minutes,
    month
  }
}