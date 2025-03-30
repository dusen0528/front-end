"use strict";

const Navigator = (function () {
  let year = null;
  let month = null;

  function initializeDate() {
    const searchParam = new URLSearchParams(document.location.search);
    year = searchParam.get("year");
    month = searchParam.get("month");

    const today = new Date();

    if (year == null) {
      year = today.getFullYear();
    }

    if (month == null) {
      month = today.getMonth() + 1;
    }

    year = parseInt(year);
    month = parseInt(month);
  }

  function displayYearMonth() {
    document.getElementById("todo-nav-year").textContent = year;
    document.getElementById("todo-nav-month").textContent =
      convertToZeroMonthAndDay(month);
  }

  function convertToZeroMonthAndDay(d) {
    return d < 10 ? `0${d}` : `${d}`;
  }

  function navigate(targetYear, targetMonth) {
    window.location.href = `./index.html?year=${targetYear}&month=${convertToZeroMonthAndDay(
      targetMonth
    )}`;
  }

  // 초기화
  window.addEventListener("DOMContentLoaded", function () {
    initializeDate();
    displayYearMonth();
  });

  return {
    getYear: function () {
      return year;
    },
    getMonth: function () {
      return convertToZeroMonthAndDay(month);
    },
    getRawMonth: function () {
      return month;
    },
    movePrevMonth: function () {
      let targetYear = year;
      let targetMonth = month - 1;

      if (targetMonth < 1) {
        targetMonth = 12;
        --targetYear;
      }

      navigate(targetYear, targetMonth);
    },
    moveNextMonth: function () {
      let targetYear = year;
      let targetMonth = month + 1;

      if (targetMonth > 12) {
        targetMonth = 1;
        ++targetYear;
      }

      navigate(targetYear, targetMonth);
    },
    moveToday: function () {
      const today = new Date();
      navigate(today.getFullYear(), today.getMonth() + 1);
    },
    convertToZeroMonthAndDay: convertToZeroMonthAndDay,
  };
})();

window.movePrevMonth = function () {
  Navigator.movePrevMonth();
};

window.moveNextMonth = function () {
  Navigator.moveNextMonth();
};

window.moveToday = function () {
  Navigator.moveToday();
};
