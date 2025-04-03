package inho.repository;

import inho.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    /**
     * 특정 날짜(eventAt)에 해당하는 모든 Todo 항목을 조회합니다.
     *
     * @param eventAt 조회할 날짜 (형식: "yyyy-MM-dd")
     * @return 해당 날짜에 등록된 Todo 리스트
     */
    List<Todo> findByEventAt(String eventAt);

    /**
     * 특정 날짜(eventAt)에 등록된 Todo 항목의 개수를 반환합니다.
     *
     * @param eventAt 조회할 날짜 (형식: "yyyy-MM-dd")
     * @return 해당 날짜에 등록된 Todo 항목의 개수
     */
    long countByEventAt(String eventAt);

    /**
     * 특정 ID에 해당하는 Todo 항목이 존재하는지 확인합니다.
     *
     * @param id 확인할 Todo 항목의 ID
     * @return 해당 ID가 존재하면 true, 그렇지 않으면 false
     */
    boolean existsById(Long id);

    /**
     * 특정 월(eventMonth)에 해당하는 모든 Todo 항목을 조회합니다.
     *
     * @param eventMonth 조회할 연도와 월 (형식: "yyyy-MM")
     * @return 해당 월에 등록된 Todo 리스트
     */

    @Query("SELECT t from Todo t where t.eventAt LIKE :eventMonth%")
    List<Todo> findEventAtStartingWith(String eventMonth);
}
