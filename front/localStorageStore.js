const localStorageStore = function () {
  "use strict";
  const storage = window.localStorage;
  const DAILY_MAX_TODO_COUNT = 8;
  const api = new Object();

  /*TODO#1 저장구현하기
    localStorage를 이용해서 구현합니다. 간단한 사용법은 아래 링크를 참고합니다.
    //https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage

    id는 uuid를 사용합니다.
    item 객체의 구조는 다음과 같습니다.
    {
        'id' : '36b8f84d-df4e-4d49-b662-bcde71a8764f',
        'todoDate' : '2023-03-01',
        'todoSubject' : 'js 하루종일 공부하기!'
    }
*/
    

  api.save = function (todoDate, todoSubject) {
    /*TODO#1-1
            id는 uuid를 사용합니다. 아래를 참고해서 만들어 주세요
            https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
        */
      const id = crypto.randomUUID();
      
    /*TODO#1-2 해당 날짜에 >=DAILY_MAX_TODO_COUNT 이면 적절한 Error 발생 시키기.
         countByTodoDate(todoDate); 사용해서 등록 count를 구합니다.
        */
       const count = countByTodoDate(todoDate);
       if (count >= DAILY_MAX_TODO_COUNT) {
         throw new Error(
           `${DAILY_MAX_TODO_COUNT}개보다 todo를 더 만들 수 없습니다`
         );
       }
      
    /*TODO#1-3 map  key인 todoDate로 조회
            1. value  존재하지 않는다면 : array를 생성 후 item을 push
            2. value가 존재하면 array에 바로 push ..
        */
      
       const item = {
         id: id,
         todoDate: todoDate,
         todoSubject: todoSubject,
       };
      
      let todos = [];
      const todosJson = storage.getItem(todoDate);
        
      if (todosJson) {
        todos = JSON.parse(todosJson);
      }

      todos.push(item);
      
    /*TODO#1-4 JSON Serialize...
            todo 1-1 ~ 1-3은 memoryStore.js 했던것과 비슷합니다.
            다만 map에서는 객체자체를 저장했지만.. localStorage에 저장하기 위해서는
            json 문자열로 변경하여 저장합니다.
        */
      
      
      storage.setItem(todoDate, JSON.stringify(todos));

      return id;
  };

  /*TODO#2- 삭제구현하기*/
  api.delete = function (todoDate, id) {
    /*
            TODO#2-1 todoMap에  todoDate가 존재하는 확인 후  존재하면
            해당 배열의 몇번째 index인지 찾습니다.
            해당 인덱스에 해당하는 요소를 삭제합니다.
            아래 두 함수를 참고해서 구현합니다.
            //https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
            //https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

            다만 구현할 때 localStorage에는 json 테스트가 배열로 담겨 있습니다. Json을 객체로 변환하여 삭제를 구현해주세요.
        */
        const todosJson = storage.getItem(todoDate);

       if (!todosJson) {
         throw new Error(`${todoDate} : todo 찾을 수 없음`);
       }
      
      const todos = JSON.parse(todosJson);
      const index = todos.findIndex(item => item.id === id);


      
            /*
            TODO#2-2 index가 존재하지 않는다면 적절한 Error를 발생해주세요.
            ex) `${id} not found` ..
        */
      
      if (index === -1) {
          throw new Error(`id : ${id}를 찾을 수 없습니다`);
      }

      todos.splice(index, 1);

      if (todos.length === 0) {
          storage.removeItem(todoDate);
      } else{
        storage.setItem(todoDate, JSON.stringify(todos));
      }

  };

  //TODO#3 해당 날짜에 존재하는 모든 todo 삭제하기
    api.deleteByTodoDate = function (todoDate) {
        storage.removeItem(todoDate);
  };

  //TODO#4 해당 날짜에 존재하는 모든 todo 조회, 존재하지 않는다면 빈 배열을 리턴합니다.
  api.getTodoItemList = function (todoDate) {
    //localStorage에서 얻는 값은 json 문자열입니다. 적절히 객체로 변환하여 리턴해주세요
      const todosJson = storage.getItem(todoDate);

      return !todosJson ? [] : JSON.parse(todosJson);
  };

  //TODO#5 해당 날짜의 모든 todo item count, 참고로 countByTodoDate 함수는 api 내부에서만 접근가능 합니다.
    function countByTodoDate(todoDate) {
        const todosJson = storage.getItem(todoDate);

    return !todosJson?0:JSON.parse(todosJson).length;
  }
  return api;
};
