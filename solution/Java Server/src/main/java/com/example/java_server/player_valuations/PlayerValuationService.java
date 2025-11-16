package com.example.java_server.player_valuations;

import org.springframework.stereotype.Service;

@Service
public class PlayerValuationService {
    private final PlayerValuationRepository playerValuationRepository;

    public PlayerValuationService(PlayerValuationRepository playerValuationRepository) {
        this.playerValuationRepository = playerValuationRepository;
    }

    // Save a player valuation entity to the database.
    public PlayerValuation save(PlayerValuation playerValuation) {
        return playerValuationRepository.save(playerValuation);
    }
}
