package com.example.java_server.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    // Find distinct country names from competitions.
    @Query(value = "SELECT DISTINCT c.countryName " +
            "FROM Competition c")
    List<String> findDistinctCountryNames();

    // Find competition details (competition ID and name) by country name.
    @Query("SELECT new com.example.java_server.competition.CompetitionDTO(c.competitionID, c.name) " +
            "FROM Competition c " +
            "WHERE c.countryName = :country_name")
    List<CompetitionDTO> findCompetitionDetailsByCountry(String country_name);

    // Find competition images by competition ID.
    @Query(value = "SELECT c.competitionImage " +
            "FROM Competition c " +
            "WHERE c.competitionID = :competition_id")
    List<String> findCompetitionsImagesByCompetitionId(String competition_id);

    // Find competition information (name, country name, and subType) by competition ID.
    @Query(value = "SELECT c.name, c.countryName, c.subType " +
            "FROM Competition c " +
            "WHERE c.competitionID = :competition_id")
    List<String> findCompetitionsInfosByCompetitionId(String competition_id);
}
