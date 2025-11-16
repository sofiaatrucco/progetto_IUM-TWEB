package com.example.java_server.competition;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    // Save a competition entity to the database.
    public Competition save(Competition competition) {
        return competitionRepository.save(competition);
    }

    // Get a list of distinct country names.
    public List<String> getCountries() {
        return competitionRepository.findDistinctCountryNames();
    }

    // Get a list of competition details (as DTOs) by country.
    public List<CompetitionDTO> getCompetitions(String country) {
        return competitionRepository.findCompetitionDetailsByCountry(country);
    }

    // Get a list of competition images by competition ID.
    public List<String> getCompetitionsImages(String competition_id) {
        return competitionRepository.findCompetitionsImagesByCompetitionId(competition_id);
    }

    // Get a list of competition information by competition ID.
    public List<String> getCompetitionsInfos(String competition_id) {
        return competitionRepository.findCompetitionsInfosByCompetitionId(competition_id);
    }
}
