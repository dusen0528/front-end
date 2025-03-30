const TodoApp = (function () {
  "use strict";
  const todoStore = localStorageStore();

  function createTodoList() {
    const daysInMonth = getDaysInMonth(
      Navigator.getYear(),
      Navigator.getRawMonth()
    );
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
        Navigator.getYear() +
        "-" +
        Navigator.getMonth() +
        "-" +
        Navigator.convertToZeroMonthAndDay(i);

      // form 전송 이벤트
      const form = todoItem.querySelector("form");
      form.addEventListener("submit", todoSubmit);

      // 모두 삭제 버튼 이벤트
      const removeAllBtn = todoItem.querySelector(".btn-remove-all");
      removeAllBtn.addEventListener("click", function () {
        const todoDateInput = this.closest(".todo-item").querySelector(
          "input[name=todoDate]"
        );
        const dateValue = todoDateInput.value;
        todoStore.deleteByTodoDate(dateValue);

        // UI 업데이트
        const todoItemList =
          this.closest(".todo-item").querySelector(".todo-item-list");
        todoItemList.innerHTML = "";
      });

      // 저장된 todo 불러오기
      const todoList = todoStore.getTodoItemList(todoDate);
      const todoItemList = todoItem.querySelector(".todo-item-list");

      todoList.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.todoSubject;
        li.dataset.id = item.id;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
          const todoId = li.dataset.id;
          const todoDateValue = todoDate.value;

          todoStore.delete(todoDateValue, todoId);

          li.remove();
        });

        li.appendChild(deleteBtn);
        todoItemList.appendChild(li);
      });

      // 컨테이너에 추가
      todoItemContainer.appendChild(todoItem);
    }
  }

  function getDaysInMonth(targetYear, targetMonth) {
    return new Date(targetYear, parseInt(targetMonth), 0).getDate();
  }

  function todoSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const todoDateInput = form.querySelector("input[name=todoDate]");
    const subjectInput = form.querySelector("input[name=todoSubject]");

    const todoDate = todoDateInput.value;
    const subject = subjectInput.value.trim();

    if (subject) {
      try {
        todoStore.save(todoDate, subject);
        // UI 업데이트
        const todoItemList = form
          .closest(".todo-item")
          .querySelector(".todo-item-list");

        // 새로 저장된 항목 가져오기 (마지막 항목)
        const todoList = todoStore.getTodoItemList(todoDate);
        const newTodo = todoList[todoList.length - 1];

        const li = document.createElement("li");
        li.textContent = subject;
        li.dataset.id = newTodo.id; // id 저장

        // 삭제 버튼 추가
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
          todoStore.delete(todoDate, newTodo.id);
          li.remove();
        });

        li.appendChild(deleteBtn);
        todoItemList.appendChild(li);

        // 입력 필드 초기화
        subjectInput.value = "";
      } catch (error) {
        // 오류 처리 (예: 일일 최대 todo 개수 초과)
        alert(error.message);
      }
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    createTodoList();
  });

  return {
    refresh: function () {
      createTodoList();
    },
  };
})();
