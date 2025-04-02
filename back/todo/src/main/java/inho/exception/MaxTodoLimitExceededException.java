package inho.exception;

public class MaxTodoLimitExceededException extends RuntimeException {
    public MaxTodoLimitExceededException(String message) {
        super(message);
    }
}
