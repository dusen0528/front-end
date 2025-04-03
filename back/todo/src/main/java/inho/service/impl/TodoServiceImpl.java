package inho.service.impl;

import inho.domain.Todo;
import inho.exception.MaxTodoLimitExceededException;
import inho.exception.TodoNotFoundException;
import inho.repository.TodoRepository;
import inho.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    private static final int DAILY_MAX_TODO_COUNT = 8;


    /**
     * 새로운 TODO를 저장합니다.
     * <p>
     * 특정 날짜에 등록된 TODO 개수를 확인하고, 하루 최대 8개의 제한을 초과하면 예외를 발생시킵니다.
     * </p>
     *
     * @param subject 할 일의 제목 또는 내용
     * @param eventAt 할 일이 예정된 날짜 (형식: "yyyy-MM-dd")
     * @return 저장된 Todo 객체
     * @throws MaxTodoLimitExceededException 하루 최대 TODO 개수를 초과한 경우 발생
     */
    public Todo saveTodo(String subject, String eventAt) {
        long count = todoRepository.countByEventAt(eventAt);
        if (count >= DAILY_MAX_TODO_COUNT) {
            throw new MaxTodoLimitExceededException("하루 최대 8개의 TODO만 등록 가능합니다.");
        }
        Todo todo = new Todo(subject, eventAt);

        return todoRepository.save(todo);
    }

    /**
     * 특정 날짜에 등록된 모든 TODO를 삭제합니다.
     *
     * @param eventAt 삭제할 TODO가 등록된 날짜 (형식: "yyyy-MM-dd")
     * @throws TodoNotFoundException 해당 날짜에 등록된 TODO가 없는 경우 발생
     */
    public void deleteTodosByDate(String eventAt) {
        List<Todo> todos = todoRepository.findByEventAt(eventAt);
        if (todos.isEmpty()) {
            throw new TodoNotFoundException("해당 날짜(" + eventAt + ")에 등록된 TODO가 없습니다.");
        }

        todoRepository.deleteAll(todos);
    }

    /**
     * 특정 ID에 해당하는 TODO를 삭제합니다.
     *
     * @param id 삭제할 TODO의 ID
     * @throws TodoNotFoundException 해당 ID의 TODO가 존재하지 않는 경우 발생
     */
    public void deleteTodoById(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException("ID " + id + "에 해당하는 TODO가 존재하지 않습니다.");
        }

        todoRepository.deleteById(id);
    }

    /**
     * 특정 날짜에 등록된 모든 TODO를 조회합니다.
     *
     * @param eventAt 조회할 날짜 (형식: "yyyy-MM-dd")
     * @return 해당 날짜에 등록된 Todo 리스트
     * @throws TodoNotFoundException 해당 날짜에 등록된 TODO가 없는 경우 발생
     */
    public List<Todo> getTodosByDate(String eventAt) {
       return  findTodos(eventAt, false);
    }

    /**
     * 특정 월에 등록된 TODO 리스트를 조회합니다.
     *
     * @param eventMonth 조회할 연도와 월 (형식: "yyyy-MM")
     * @return 해당 월에 등록된 Todo 리스트
     */
    @Transactional(readOnly = true)
    public List<Todo> getTodosByMonth(String eventMonth) {
        return findTodos(eventMonth, true);
    }

    /**
     * 특정 날짜에 등록된 TODO 개수를 반환합니다.
     *
     * @param date 조회할 날짜 (형식: "yyyy-MM-dd")
     * @return 해당 날짜에 등록된 TODO 개수
     */
    @Override
    public long countTodosByDate(String date) {
        return todoRepository.countByEventAt(date);
    }

    /**
     * 특정 ID에 해당하는 TODO를 조회합니다.
     *
     * @param id 조회할 TODO의 ID
     * @return 조회된 Todo 객체
     * @throws TodoNotFoundException 해당 ID의 TODO가 존재하지 않을 경우 발생
     */
    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("ID " + id + "에 해당하는 TODO가 존재하지 않습니다."));
    }

    /**
     * 공통 로직: 특정 날짜 또는 월에 등록된 TODO 리스트를 조회합니다.
     *
     * @param queryParam 조회할 날짜 또는 월 (형식: "yyyy-MM" 또는 "yyyy-MM-dd")
     * @param isMonthly  월별 조회 여부 (true: 월별 조회, false: 일별 조회)
     * @return 해당 조건에 맞는 Todo 리스트
     * @throws TodoNotFoundException 조건에 맞는 TODO가 없는 경우 발생
     */
    private List<Todo> findTodos(String queryParam, boolean isMonthly){
        List<Todo> todos = isMonthly
                ? todoRepository.findEventAtStartingWith(queryParam) // 월별 조회
                : todoRepository.findByEventAt(queryParam);         // 일별 조회

        return todos;
    }
}
