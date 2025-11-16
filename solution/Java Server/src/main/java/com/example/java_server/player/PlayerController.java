package com.example.java_server.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/postgres")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    // POST endpoint to insert a player.
    @PostMapping("/insert_player")
    public ResponseEntity<Player> insertPlayer(@RequestBody Player player) {
        // Save the player using the PlayerService.
        Player savedPlayer = playerService.save(player);
        // Return the saved player with HTTP status 201 (CREATED).
        return new ResponseEntity<>(savedPlayer, HttpStatus.CREATED);
    }

    // GET endpoint to get players by club.
    @GetMapping("/players")
    public ResponseEntity<List<PlayerDTO>> getPlayers(@RequestParam int club_id) {
        // Retrieve a list of players belonging to a specific club using the PlayerService.
        List<PlayerDTO> players = playerService.getPlayers(club_id);
        // Return the list of players as a response with HTTP status 200 (OK).
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    // GET endpoint to get player images by player_id.
    @GetMapping("/players_images")
    public ResponseEntity<List<String>> getPlayersImages(@RequestParam int player_id) {
        // Retrieve a list of image URLs associated with a specific player using the PlayerService.
        List<String> images = playerService.getPlayersImages(player_id);
        // Return the list of image URLs as a response with HTTP status 200 (OK).
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // GET endpoint to get player information by player_id.
    @GetMapping("/players_infos")
    public ResponseEntity<List<String>> getPlayersInfos(@RequestParam int player_id) {
        // Retrieve a list of player information by player_id using the PlayerService.
        List<String> infos = playerService.getPlayersInfos(player_id);
        // Return the list of player information as a response with HTTP status 200 (OK).
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }
}
