package com.example.java_server.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    // Find club IDs and names by competition ID.
    @Query(value = "SELECT new com.example.java_server.club.ClubDTO(cl.clubID, cl.name) " +
            "FROM Club cl " +
            "WHERE cl.domesticCompetitionID = :competition_id")
    List<ClubDTO> findClubsIdAndNameByCompetitionId(String competition_id);

    // Find club images by club ID.
    @Query(value = "SELECT cl.clubImage " +
            "FROM Club cl " +
            "WHERE cl.clubID = :club_id")
    List<String> findClubsImagesByClubId(int club_id);

    // Find club information (name, squad size, stadium name, net transfer record) by club ID.
    @Query(value = "SELECT cl.name, cl.squadSize, cl.stadiumName, cl.netTransferRecord " +
            "FROM Club cl " +
            "WHERE cl.clubID = :club_id")
    List<String> findClubsInfosByClubId(int club_id);

    // Find the number of clubs by competition ID.
    @Query(value = "SELECT COUNT(cl) " +
            "FROM Club cl " +
            "WHERE cl.domesticCompetitionID = :competition_id")
    List<Integer> findNumberOfClubsByCompetitionId(String competition_id);
}
