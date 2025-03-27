/**
 * 함수명이 대문자로 시작하면 관례적으로 생성자 함수 입니다.
 * @param {*} uiBtnPrevMonthId 이전 button id
 * @param {*} uiBtnNextMonthId  다음 button id
 * @param {*} uiBtnCurrentMonthId 오늘 button id
 * @returns
 */
function Navigator(uiBtnPrevMonthId, uiBtnNextMonthId, uiBtnCurrentMonthId) {
  //TODO#0 strict mode 선언하기
    'use strict';
    
  let year = null;
  let month = null;

  //TODO#1
  //생성자 함수의 parameter로 넘어오는 uiBtnPrevMonthId, uiBtnNextMonthId, uiBtnCurrentMonthId 초기화 해주세요
    uiBtnPrevMonthId = uiBtnPrevMonthId;
    uiBtnNextMonthId = uiBtnNextMonthId;
    uiBtnCurrentMonthId = uiBtnCurrentMonthId;

  
    /*
     //TODO#2
     //즉시 실행함수 : url 주소를 기준으로 year, month를 얻습니다.
     //url 주소 : ..../index.html?year=2023&month=04
     //year == null or year == null 이면 오늘 날짜로 설정합니다.
     //month <10 이면 01,02,03 .. 형태로 설정합니다. 
     */

      // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
  const searchParam = new URLSearchParams(document.location.search);
  //TODO#2-1 query parameter 파싱해서 year, month 설정.
  year = searchParam.get('year');
  month = searchParam.get('month');

  const today = new Date();
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
  if (year == null) {
    //TODO#2-2 year 설정
    
    year = today.getFullYear();
  }

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
  if (month == null) {
    //TODO#2-3 month설정 0부터 시작 즉 1월은 = 0
    month = today.getMonth()+1;
  }
    
  month = parseInt(month);


  //TODO#3
  //button event 설정 , DOMContentLoaded 시점에 ..
  window.addEventListener("DOMContentLoaded", function () {
    let btnPrevMonth = document.getElementById(uiBtnPrevMonthId);
    let btnNextMonth = document.getElementById(uiBtnNextMonthId);
    let btnCurrentMonth = document.getElementById(uiBtnCurrentMonthId);

    //developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error
    https: if (btnPrevMonth == null) {
      //TODO#3-1 이전 button을 찾을 수 없다면 오류던지기
      throw Error("이전 버튼을 찾을 수 없습니다" + e.message);
    }
    if (btnNextMonth == null) {
      //TODO#3-2 다음 button을 찾을 수 없다면 오류던지기
      throw Error("다음 버튼을 찾을 수 없습니다" + e.message);
    }
    if (btnCurrentMonth == null) {
      //TODO#3-3 오늘 button을 찾을 수 없다면 오류던지기
      throw Error("오늘 버튼을 찾을 수 없습니다" + e.message);
    }

    //버튼 이벤트 등록
    //이전
    btnPrevMonth.addEventListener("click", function () {
      //TODO#3-4 이전 button click event 구현 : 이전 달 이동
      let targetYear = year;
      let targetMonth = month-1;
      //...

      if (targetMonth < 1) {
        targetMonth = 12;
        --targetYear;
      }

      _navigate(targetYear, targetMonth);
    });

    //다음
    btnNextMonth.addEventListener("click", function () {
      //TODO#3-5 다음 button click event 구현 : 다음 달 이동
      let targetYear = year;
      let targetMonth = month+1;
      //...

      if (targetMonth > 12) {
        targetMonth = 1;
        ++targetYear;
      }

      _navigate(targetYear, targetMonth);
    });
    //오늘
    btnCurrentMonth.addEventListener("click", function () {
      //TODO#3-6 오늘 button click event 구현 : 이번 달 이동

           _navigate(new Date().getFullYear(), new Date().getMonth() + 1);
    });

       this.document.getElementById("todo-nav-year").textContent = year;
       this.document.getElementById("todo-nav-month").textContent = _convertToZeroMonthAndDay(month);
  });

  //TODO#4
  function _navigate(targetYear, targetMonth) {
    //페이지 이동 : ./index.html?year=2023&month=03
    //https://developer.mozilla.org/en-US/docs/Web/API/Location
            window.location.href = `./index.html?year=${targetYear}&month=${_convertToZeroMonthAndDay(
              targetMonth
            )}`;

  }
  //TODO#5 month or day -> d=9 return "09" 형태로 반환하는 함수구현
  //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  function _convertToZeroMonthAndDay(d) {
    //...
        return d < 10 ? `0${d}` : `${d}`;
  }

  return {
    getYear: function () {
      return year;
    },
    getMonth: function () {
      return _convertToZeroMonthAndDay(month);
    },
    convertToZeroMonthAndDay: function (d) {
      return _convertToZeroMonthAndDay(d);
    },
  };
}


const nav = new Navigator(
  "btn-prev-month",
  "btn-next-month",
  "btn-current-month"
);