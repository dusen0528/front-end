package inho.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
@Table(name = "todos")
@Slf4j
public class Todo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject",nullable = false)
    private String subject;

    @Column(name = "event_at", nullable = false)
    private String eventAt;

    @Column(name = "created_at",nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @JsonCreator
    public Todo(
            @JsonProperty("subject") String subject,
            @JsonProperty("eventAt") String eventAt) {
        this.subject = subject;
        this.eventAt = eventAt;
        log.debug("evenetAt 테스트 {}", eventAt);
        this.createdAt = LocalDateTime.now(); // createdAt을 항상 설정
    }

    @PrePersist
    protected void onCreate() {
        if(this.eventAt == null || this.eventAt.isEmpty()) {
            throw new IllegalArgumentException("eventAt 필드는 필수입니다");
        }
        if(this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }


}
