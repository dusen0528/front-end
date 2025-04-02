package inho.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String eventAt;

    @Column(nullable = false, updatable = false)
    private  LocalDateTime createdAt;

    public Todo(String subject, String eventAt) {
        this.subject = subject;
        this.eventAt = eventAt;
        this.createdAt = LocalDateTime.now();
    }
}
