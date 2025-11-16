package com.example.java_server.player;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    // Save a player entity to the database.
    public Player save(Player player) {
        return playerRepository.save(player);
    }

    // Get a list of player details (as DTOs) by club ID.
    public List<PlayerDTO> getPlayers(int club_id) {
        return playerRepository.findPlayersIdAndNamesByClubId(club_id);
    }

    // Get a list of player images by player ID.
    public List<String> getPlayersImages(int player_id) {
        return playerRepository.findPlayersImagesByPlayerId(player_id);
    }

    // Get a list of player information by player ID.
    public List<String> getPlayersInfos(int player_id) {
        return playerRepository.findPlayersInfosByPlayerId(player_id);
    }
}
