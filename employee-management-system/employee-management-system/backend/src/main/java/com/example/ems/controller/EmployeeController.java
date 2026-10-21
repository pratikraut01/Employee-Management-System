package com.example.ems.controller;

import com.example.ems.exception.ApiExceptions.Conflict;
import com.example.ems.exception.ApiExceptions.NotFound;
import com.example.ems.model.Employee;
import com.example.ems.repository.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class EmployeeController {

    private final EmployeeRepository repo;

    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    // READ (all) + SEARCH: GET /api/employees?search=john
    @GetMapping
    public List<Employee> getAll(@RequestParam(required = false) String search) {
        if (search == null || search.isBlank()) return repo.findAll();
        return repo.search(search.trim());
    }

    // READ (one)
    @GetMapping("/{id}")
    public Employee getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFound("Employee " + id + " not found"));
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Employee create(@Valid @RequestBody Employee e) {
        if (repo.existsByEmail(e.getEmail())) throw new Conflict("Email already in use");
        e.setId(null);
        return repo.save(e);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @Valid @RequestBody Employee in) {
        Employee e = repo.findById(id).orElseThrow(() -> new NotFound("Employee " + id + " not found"));
        if (repo.existsByEmailAndIdNot(in.getEmail(), id)) throw new Conflict("Email already in use");
        e.setFirstName(in.getFirstName());
        e.setLastName(in.getLastName());
        e.setEmail(in.getEmail());
        e.setPhone(in.getPhone());
        e.setDepartment(in.getDepartment());
        e.setJobTitle(in.getJobTitle());
        e.setSalary(in.getSalary());
        e.setHireDate(in.getHireDate());
        return repo.save(e);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) throw new NotFound("Employee " + id + " not found");
        repo.deleteById(id);
    }
}
