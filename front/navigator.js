"use strict";

const Navigator = {
  year: null,
  month: null,
  getYear: function () {
    return this.year;
  },
  getMonth: function () {
    return this.month;
  },
};

// 전역 변수 선언
let year = null;
let month = null;

// 페이지 로드 시 초기화
window.addEventListener("DOMContentLoaded", function () {
  initializeDate();
  displayYearMonth();
});

// URL에서 날짜 정보 가져오기 및 초기화
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

// 년월 표시 업데이트
function displayYearMonth() {
  document.getElementById("todo-nav-year").textContent = year;
  document.getElementById("todo-nav-month").textContent =
    convertToZeroMonthAndDay(month);
}

// 이전 달로 이동
function movePrevMonth() {
  let targetYear = year;
  let targetMonth = month - 1;

  if (targetMonth < 1) {
    targetMonth = 12;
    --targetYear;
  }

  navigate(targetYear, targetMonth);
}

// 다음 달로 이동
function moveNextMonth() {
  let targetYear = year;
  let targetMonth = month + 1;

  if (targetMonth > 12) {
    targetMonth = 1;
    ++targetYear;
  }

  navigate(targetYear, targetMonth);
}

// 오늘로 이동
function moveToday() {
  const today = new Date();
  navigate(today.getFullYear(), today.getMonth() + 1);
}

// 페이지 이동 함수
function navigate(targetYear, targetMonth) {
  window.location.href = `./index.html?year=${targetYear}&month=${convertToZeroMonthAndDay(
    targetMonth
  )}`;
}

// 10 미만의 숫자를 두 자리 형식으로 변환
function convertToZeroMonthAndDay(d) {
  return d < 10 ? `0${d}` : `${d}`;
}

// 현재 년도와 월 가져오기 함수
function getYear() {
  return year;
}

function getMonth() {
  return convertToZeroMonthAndDay(month);
}

function getRawMonth() {
  return month;
}
