package inho.repository;

import inho.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByEventAt(String eventAt);

    long countByEventAt(String eventAt);

    boolean existsById(Long id);

}
