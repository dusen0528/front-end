package inho.repository;

import inho.domain.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TodoRepositoryTest {

    @Autowired
    TodoRepository todoRepository;

    @BeforeEach
    void setUp() {
        // 테스트 데이터 초기화
        todoRepository.deleteAll();

        // 테스트 데이터 생성
        todoRepository.save(new Todo("할 일 1", "2025-04-01"));
        todoRepository.save(new Todo("할 일 2", "2025-04-01"));
        todoRepository.save(new Todo("할 일 3", "2025-04-02"));
        todoRepository.save(new Todo("할 일 4", "2025-05-01"));
    }

    @Test
    @DisplayName("특정 날짜 TODO 조회")
    void findByEventAt() {
        List<Todo> todos = todoRepository.findByEventAt("2025-04-01");

        assertNotNull(todos);

        assertEquals(2, todos.size());
        assertTrue(todos.stream().anyMatch(todo -> "할 일 1".equals(todo.getSubject())));
        assertTrue(todos.stream().anyMatch(todo -> "할 일 2".equals(todo.getSubject())));
    }

    @Test
    @DisplayName("특정 날짜에 등록된 TODO 개수 반환")
    void countByEventAt() {
        long count = todoRepository.countByEventAt("2025-04-01");

        assertNotNull(count);
        assertEquals(count, 2);

        // 존재하지 않는 날짜의 경우 0 반환 확인
        long notExistCount = todoRepository.countByEventAt("2025-01-01");

        assertNotNull(notExistCount);
        assertEquals(0, notExistCount);

    }

    @Test
    @DisplayName("ID로 TODO 존재 여부 확인")
    void existsById() {
        Todo savedTodo = todoRepository.save(new Todo("테스트 할 일", "2025-04-03"));

        // 존재하는 ID 확인
        boolean exists = todoRepository.existsById(savedTodo.getId());
        assertTrue(exists);

        // 존재하지 않는 ID 확인
        boolean notExists = todoRepository.existsById(9999L);
        assertFalse(notExists);
    }

    @Test
    @DisplayName("특정 월 TODO 목록 조회")
    void findEventAtStartingWith() {
        List<Todo> aprilTodos = todoRepository.findEventAtStartingWith("2025-04");

        assertNotNull(aprilTodos);
        assertEquals(3, aprilTodos.size());

        for (Todo todo : aprilTodos) {
            assertTrue(todo.getEventAt().startsWith("2025-04"));
        }

        List<Todo> mayTodos = todoRepository.findEventAtStartingWith("2025-05");
        assertEquals(1, mayTodos.size());
        assertEquals("할 일 4", mayTodos.get(0).getSubject());
    }
}