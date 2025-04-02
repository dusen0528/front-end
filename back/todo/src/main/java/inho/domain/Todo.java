package inho.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
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
    private  String createdAt;

}
