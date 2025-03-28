"use strict";

// 페이지 로드 시 초기화
window.addEventListener("DOMContentLoaded", function () {
  createTodoList();
});

// todo-item-template 이용해서 todolist 만들기
function createTodoList() {
  const daysInMonth = getDaysInMonth(getYear(), getRawMonth());
  console.log("daysInMonth:" + daysInMonth);
  const todoItemContainer = document.getElementById("todo-item-container");
  const template = document.getElementById("todo-item-template");

  todoItemContainer.innerHTML = "";

  for (let i = 1; i <= daysInMonth; i++) {
    // 템플릿 복제
    const todoItem = document.importNode(template.content, true);
    const todoItemDay = todoItem.querySelector(".todo-item-day");

    // 날짜 표시
    todoItemDay.textContent = i;

    // form 날짜 설정
    const todoDate = todoItem.querySelector("input[name=todoDate]");
    todoDate.value =
      getYear() + "-" + getMonth() + "-" + convertToZeroMonthAndDay(i);

    // form 전송 이벤트
    const form = todoItem.querySelector("form");
    form.addEventListener("submit", todoSubmit);

    // 모두 삭제 버튼 이벤트
    const removeAllBtn = todoItem.querySelector(".btn-remove-all");
    removeAllBtn.addEventListener("click", function () {
      const todoItemList =
        this.closest(".todo-item").querySelector(".todo-item-list");
      todoItemList.innerHTML = "";
      // 여기에 로컬 스토리지 데이터 삭제 로직 추가 가능
    });

    // 등록 버튼 이벤트
    const submitButton = todoItem.querySelector("button[type=submit]");
    const todoItemList = todoItem.querySelector(".todo-item-list");

    // 컨테이너에 추가
    todoItemContainer.appendChild(todoItem);
  }
}

// 날짜에 따른 해당 월의 일수 계산
function getDaysInMonth(targetYear, targetMonth) {
  return new Date(targetYear, parseInt(targetMonth), 0).getDate();
}

// 폼 제출 이벤트 처리
function todoSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const subjectInput = form.querySelector("input[name=todoSubject]");
  const subject = subjectInput.value.trim();

  if (subject) {
    const todoItemList = form
      .closest(".todo-item")
      .querySelector(".todo-item-list");
    const li = document.createElement("li");
    li.textContent = subject;
    todoItemList.appendChild(li);

    subjectInput.value = "";
  }
}
