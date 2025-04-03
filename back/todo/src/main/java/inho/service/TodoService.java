package inho.service;

import inho.domain.Todo;

import java.util.List;

public interface TodoService {
    public Todo saveTodo(String subject, String eventAt);

    public void deleteTodosByDate(String eventAt);

    public void deleteTodoById(Long id);

    public List<Todo> getTodosByDate(String eventAt);

    public List<Todo> getTodosByMonth(String eventMonth);

    long countTodosByDate(String date);
    Todo getTodoById(Long id);

}
