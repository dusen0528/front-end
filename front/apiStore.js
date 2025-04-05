//https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch

const apiStore = function () {
  ("use strict");
  //api 서버 주소입니다.
  const SERVER_URL = "http://localhost:8080";

  //user id는 변경해주세요
  const X_USER_ID = "dusen0528";
  const DAILY_MAX_TODO_COUNT = 8;
  const api = new Object();

  //공통으로 사용하는 header 입니다. 인증이 필요한 부분은 user 아이디가 포함됩니다.
  //X-USER-ID가 header에 포함되지 않는다면 error 발생할 수 있습니다.
  const headers = {
    "Content-Type": "application/json",
    "X-USER-ID": X_USER_ID,
  };

  /*TODO#1 저장구현하기
        api 서버를 이용해서 저장을 합니다.
        별도의 uuid를 만들어서 사용할 필요 없습니다.
        비동기 통신을 위해서 async await fetch를 사용합니다.
        api 명세서를 참고하여 구현합니다.
        https://nhnacademy.dooray.com/share/pages/7i6-W8S2TI6e-oKUJVL57g/3373349495003408976
    */
  api.save = async function (todoDate, todoSubject) {
    /*TODO#1-1 해당 날짜에 >=DAILY_MAX_TODO_COUNT 이면 적절한 Error 발생 시키기.
            countByTodoDate(todoDate); 사용해서 등록 count를 구합니다.
        */

    const count = await countByTodoDate(todoDate);
    if (count >= DAILY_MAX_TODO_COUNT) {
      throw new Error(
        `${DAILY_MAX_TODO_COUNT}개보다 todo를 더 만들 수 없습니다`
      );
    }
    /*TODO#1-2  저장구현

            POST /api/calendar/events
            Content-Type: application/json
            X-USER-ID: marco

            {
                "subject" : "html/css/javasciprt study",
                "eventAt": "2023-02-15"
            }
        */
    const url = SERVER_URL + "/api/calendar/events";
    const data = {
      subject: todoSubject,
      eventAt: todoDate,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    /*TODO#1-3 응답코드가 2xx가 아니다면 적절한 error처리 */
    //참고로 응답코드가 몇번으로 return 되는지 console.log로 남겨서 직접확인해보세요.
    try {
      const response = await fetch(url, options);
      console.log("resopnse code : ", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `저장 실패 ${errorData.message || response.statusText}`
        );
      }
      const result = await response.json();
      return result.id;
    } catch (error) {
      console.error("저장 중 오류:", error);
      throw error;
    }
  };

  /*TODO#2 삭제 구현하기
        todo2번 부터는 option 객체를 적절히 생성하셔서 .. 처리해주세요.
    */
  api.delete = async function (todoDate, id) {
    const url = SERVER_URL + "/api/calendar/events/" + id;
    //TODO#2-1 삭제 구현.
    const options = {
      method: "DELETE",
      headers: headers,
    };
    //TODO#2-2 응답코드를 확인해주세요. error발생시 적절하 error처리 해주세요.
    try {
      const response = await fetch(url, options);
      console.log("삭제 응답 코드 :", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `삭제 실패 ${errorData.message || response.statusText}`
        );
      }
      return true;
    } catch (error) {
      console.error(`ID ${id} 삭제 중 오류 발생:`, error);
      throw error;
    }
  };

  /*TODO#3 해당날짜에 해당되는 모든 todo 삭제하기
   */
  api.deleteByTodoDate = async function (todoDate) {
    const url = SERVER_URL + "/api/calendar/events/daily/" + todoDate;

    //TODO#3-1 삭제 구현하기
    const options = {
      method: "DELETE",
      headers: headers,
    };
    //TODO#3-2 Error 응답이 200번대가 아니라면 적절한 error 처리
    try {
      const response = await fetch(url, options);
      console.log("날짜별 삭제 응답 상태 코드:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `날짜별 삭제 실패: ${errorData.message || response.statusText}`
        );
      }

      return true;
    } catch (error) {
      console.error(`${todoDate} 날짜 항목 삭제 중 오류 발생:`, error);
      throw error;
    }
  };

  //TODO#4 해당 날짜에 존재하는 모든 todo 조회, 존재하지 않는다면 빈 배열을 리턴합니다.
  api.getTodoItemList = async function (todoDate) {
    const arr = todoDate.split("-");
    let year = arr[0];
    let month = arr[1];
    let day = arr[2];

    const url =
      SERVER_URL +
      "/api/calendar/events/?year=" +
      year +
      "&month=" +
      month +
      "&day=" +
      day;

    const options = {
      method: "GET",
      headers: headers,
    };

    //TODO#4-1 조회 구현
    try {
      const response = await fetch(url, options);
      console.log("조회 response status code", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `조회 실패: ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json();

      return data.map((item) => ({
        id: item.id,
        todoDate: item.eventAt,
        todoSubject: item.subject,
      }));
    } catch (error) {
      //TODO#4-2 응답 코드를 확인 후 error 처리
      console.error(`${todoDate} 조회 중 오류 발생:`, error);
      return [];
    }
  };

  //TODO#5 해당 날짜의 모든 todo item count, 참고로 countByTodoDate 함수는 api 내부에서만 접근가능 합니다.
  async function countByTodoDate(todoDate) {
    const url =
      SERVER_URL + "/api/calendar/daily-register-count?date=" + todoDate;

    //TODO#5-1 구현
    const options = {
      method: "GET",
      headers: headers,
    };
    try {
      const response = await fetch(url, options);
      console.log("countByTodoDate status Code :", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `카운트 조회 실패: ${errorData.message || response.statusText}`
        );
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      //TODO#5-2 응답 코드를 확인 후 error 처리
      console.error(`${todoDate} 카운트 조회 중 오류 발생:`, error);
      return 0;
    }
  }

  // event id로 조회
  api.getEventById = async function (id) {
    const url = SERVER_URL + "/api/calendar/events/" + id;
    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, options);
      console.log("이벤트 조회 응답 코드:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `이벤트 조회 실패: ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json();
      return {
        id: data.id,
        todoDate: data.eventAt,
        todoSubject: data.subject,
        createdAt: data.createdAt,
      };
    } catch (error) {
      console.error(`ID ${id} 이벤트 조회 중 오류 발생:`, error);
      throw error;
    }
  };

  //event 월단위로 조회하기
  api.getMonthlyTodoList = async function (year, month) {
    const url =
      SERVER_URL + "/api/calendar/events/?year=" + year + "&month=" + month;

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, options);
      console.log("월단위 조회 response status code: ", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `조회 실패: ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json();
      return data.map((item) => ({
        id: item.id,
        subject: item.subject,
        eventAt: item.eventAt,
        createdAt: item.createdAt,
      }));
    } catch (error) {
      console.error(`${year} : ${month} 조회 중 오류 발생:`, error);
      return [];
    }
  };

  return api;
};
