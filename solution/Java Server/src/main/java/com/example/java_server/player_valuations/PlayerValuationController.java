package com.example.java_server.player_valuations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postgres")
public class PlayerValuationController {
    private final PlayerValuationService playerValuationService;

    @Autowired
    public PlayerValuationController(PlayerValuationService playerValuationService) {
        this.playerValuationService = playerValuationService;
    }

    // POST endpoint to insert a player valuation.
    @PostMapping("/insert_player_valuation")
    public ResponseEntity<PlayerValuation> insertPlayerValuation(@RequestBody PlayerValuation playerValuation) {
        // Save the player valuation using the PlayerValuationService.
        PlayerValuation savedPlayerValuation = playerValuationService.save(playerValuation);
        // Return the saved player valuation with HTTP status 201 (CREATED).
        return new ResponseEntity<>(savedPlayerValuation, HttpStatus.CREATED);
    }
}
