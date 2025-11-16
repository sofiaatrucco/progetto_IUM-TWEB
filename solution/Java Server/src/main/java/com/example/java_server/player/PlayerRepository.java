package com.example.java_server.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    // Find player IDs, names, and positions by club ID.
    @Query(value = "SELECT new com.example.java_server.player.PlayerDTO(p.playerID, p.name, p.position) " +
            "FROM Player p " +
            "WHERE p.currentClubID = :club_id")
    List<PlayerDTO> findPlayersIdAndNamesByClubId(int club_id);

    // Find player information (name, country of birth, date of birth, height, current club name, position, highest market value) by player ID.
    @Query(value = "SELECT pl.name, pl.countryOfBirth, pl.dateOfBirth, pl.heightInCm, pl.currentClubName, pl.position, pl.highestMarketInEur " +
            "FROM Player pl " +
            "WHERE pl.playerID = :player_id")
    List<String> findPlayersInfosByPlayerId(int player_id);

    // Find player images by player ID.
    @Query(value = "SELECT pl.imageUrl " +
            "FROM Player pl " +
            "WHERE pl.playerID = :player_id")
    List<String> findPlayersImagesByPlayerId(int player_id);
}
