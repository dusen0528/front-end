package inho.service;

import inho.domain.Todo;
import inho.exception.MaxTodoLimitExceededException;
import inho.exception.TodoNotFoundException;
import inho.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private static final int DAILY_MAX_TODO_COUNT = 8;

    /*
    새로운 TODO 저장
     */
    public Todo saveTodo(String subject, String eventAt){
        long count = todoRepository.countByEventAt(eventAt);
        if (count >= DAILY_MAX_TODO_COUNT) {
            throw new MaxTodoLimitExceededException("하루 최대 8개의 TODO만 등록 가능합니다.");
        }
        Todo todo = new Todo(subject, eventAt);

        return todoRepository.save(todo);
    }

    /*
    특정 날짜의 모든 TODO 삭제
     */
    public void deleteTodosByDate(String eventAt){
        List<Todo> todos = todoRepository.findByEventAt(eventAt);
        if (todos.isEmpty()) {
            throw new TodoNotFoundException("해당 날짜(" + eventAt + ")에 등록된 TODO가 없습니다.");
        }

        todoRepository.deleteAll(todos);
    }

    /*
    특정 ID TODO 삭제
     */
    public void deleteTodoById(Long id){
        if(!todoRepository.existsById(id)){
            throw new TodoNotFoundException("ID " + id + "에 해당하는 TODO가 존재하지 않습니다.");
        }

        todoRepository.deleteById(id);
    }

    /*
    특장 날짜의 모든 TODO 조회
     */

    public List<Todo> getTodosByDate(String eventAt){
        List<Todo> todos = todoRepository.findByEventAt(eventAt);
        if(todos.isEmpty()){
            throw new TodoNotFoundException("해당 날짜(" + eventAt + ")에 등록된 TODO가 없습니다.");
        }

        return todos;
    }


}
