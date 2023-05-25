package com.main.api.controller;

import com.main.api.dao.StoresRepository;
import com.main.api.entity.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import java.util.List;

@RestController
@RequestMapping("api/stores")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class StoresController {
    private StoresRepository storesRepository;

    @Autowired
    public StoresController(StoresRepository repository) {
        this.storesRepository = repository;
    }

    @PostMapping("/create-store")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<Store> createStore(@RequestBody Store store) {
         Store newStore = storesRepository.save(store);
         return new ResponseEntity<>(newStore, HttpStatus.OK);
    }

    @PutMapping("/update-store")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<Store> updateStore(@RequestBody Store store) {
        if (store.getStoreId() < 0 || store.getStoreId() > storesRepository.findAll().size()) {
            throw new NoResultException("Store does not exist.");
        }
        Store newStore = storesRepository.save(store);
        return new ResponseEntity<>(newStore, HttpStatus.OK);
    }

    @GetMapping("/get-all-stores")
    public ResponseEntity<List<Store>> getAllProduct() {
        List<Store> storeList = storesRepository.findAll();
        if (storeList == null || storeList.size() < 0) {
            throw new NoResultException("There is no stores available!");
        }

        return new ResponseEntity<>(storeList, HttpStatus.OK);
    }

    @GetMapping("/get-store-by-id/{storeId}")
    public ResponseEntity<Store> getStoreById(@PathVariable Long storeId) {
        Store existStore = storesRepository.findById(storeId).get();
        if (existStore == null || storeId >= storesRepository.findAll().size() || storeId <= 0) {
            throw new NoResultException("Store does not exist.");
        }

        return new ResponseEntity<>(existStore, HttpStatus.OK);
    }

    @DeleteMapping("/remove-store-by-id/{storeId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<String> removeStoreById(@PathVariable Long storeId) {
        Store existStore = storesRepository.findById(storeId).get();
        if (existStore == null || storeId >= storesRepository.findAll().size() || storeId <= 0) {
            throw new NoResultException("Store does not exist.");
        }

        storesRepository.deleteById(storeId);

        String result = "Delete successfully Store Id:" + storeId;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
