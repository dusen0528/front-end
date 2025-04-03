package inho.controller;

import inho.domain.Todo;
import inho.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class TodoController {

    private final TodoService todoService;

    /**
     * 새로운 TODO를 생성합니다.
     *
     * @param todo 요청 본문으로 전달되는 Todo 객체 (subject, eventAt 필드 포함)
     * @return 생성된 Todo 객체
     */
    @PostMapping("/events")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.saveTodo(todo.getSubject(), todo.getEventAt());
        return ResponseEntity.status(201).body(savedTodo); // 201 Created
    }

    /**
     * 특정 ID의 TODO를 삭제합니다.
     *
     * @param id 삭제할 TODO의 ID
     * @return 성공적으로 삭제되었음을 나타내는 응답 (204 No Content)
     */
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        todoService.deleteTodoById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    /**
     * 특정 날짜의 모든 TODO를 삭제합니다.
     *
     * @param eventAt 삭제할 TODO가 등록된 날짜 (형식: "yyyy-MM-dd")
     * @return 성공적으로 삭제되었음을 나타내는 응답 (204 No Content)
     */
    @DeleteMapping("/events/daily/{eventAt}")
    public ResponseEntity<Void> deleteTodosByDate(@PathVariable String eventAt) {
        todoService.deleteTodosByDate(eventAt);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    /**
     * 특정 날짜의 TODO 리스트를 조회합니다.
     *
     * @param year  조회할 연도
     * @param month 조회할 월
     * @param day   조회할 일
     * @return 해당 날짜에 등록된 Todo 리스트 (빈 결과도 200 OK로 반환)
     */
    @GetMapping(value = "/events/", params = {"year", "month", "day"})
    public ResponseEntity<List<Todo>> getTodosByDate(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam int day
    ){
        String eventAt = String.format("%04d-%02d-%02d", year, month, day);
        List<Todo> todos = todoService.getTodosByDate(eventAt);

        // 빈 결과라도 200 OK로 반환
        return ResponseEntity.ok(todos);
    }

    /**
     * 특정 월의 TODO 리스트를 조회합니다.
     *
     * @param year  조회할 연도
     * @param month 조회할 월
     * @return 해당 월에 등록된 Todo 리스트 (빈 결과도 200 OK로 반환)
     */
    @GetMapping(value = "/events/", params = {"year","month"})
    public ResponseEntity<List<Todo>> getTodosByMonth(
            @RequestParam int year,
            @RequestParam int month
    ){
        String eventMonth = String.format("%04d-%02d", year, month);
        List<Todo> todos = todoService.getTodosByMonth(eventMonth);

        // 빈 결과라도 200 OK로 반환
        return ResponseEntity.ok(todos);
    }

    /**
     * 특정 날짜의 TODO 개수를 반환합니다.
     *
     * @param date 조회할 날짜 (형식: "yyyy-MM-dd")
     * @return 해당 날짜에 등록된 TODO 개수 (0인 경우도 200 OK로 반환)
     */
    @GetMapping("/daily-register-count")
    public ResponseEntity<Long> getDailyRegisterCount(@RequestParam String date) {
        long count = todoService.countTodosByDate(date);

        // 0인 경우도 200 OK로 반환
        return ResponseEntity.ok(count);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }
}
