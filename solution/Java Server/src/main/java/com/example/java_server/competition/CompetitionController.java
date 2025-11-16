package com.example.java_server.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/postgres")
public class CompetitionController {
    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    // POST endpoint for inserting a new competition.
    @PostMapping("/insert_competition")
    public ResponseEntity<Competition> insertCompetition(@RequestBody Competition competition) {
        // Save the competition using the CompetitionService.
        Competition savedCompetition = competitionService.save(competition);
        // Return a ResponseEntity with the saved competition and HTTP status CREATED.
        return new ResponseEntity<>(savedCompetition, HttpStatus.CREATED);
    }

    // GET endpoint for retrieving a list of countries.
    @GetMapping("/countries")
    public ResponseEntity<List<String>> getCountries() {
        // Get a list of countries using the CompetitionService.
        List<String> countries = competitionService.getCountries();
        // Return a ResponseEntity with the list of countries and HTTP status OK.
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    // GET endpoint for retrieving competitions based on country.
    @GetMapping("/competitions")
    public ResponseEntity<List<CompetitionDTO>> getCompetitions(@RequestParam String country) {
        // Get a list of competitions for a specific country using the CompetitionService.
        List<CompetitionDTO> competitions = competitionService.getCompetitions(country);
        // Return a ResponseEntity with the list of competitions and HTTP status OK.
        return new ResponseEntity<>(competitions, HttpStatus.OK);
    }

    // GET endpoint for retrieving competition images based on competition_id.
    @GetMapping("/competitions_images")
    public ResponseEntity<List<String>> getCompetitionsImages(@RequestParam String competition_id) {
        // Get a list of competition images using the CompetitionService.
        List<String> images = competitionService.getCompetitionsImages(competition_id);
        // Return a ResponseEntity with the list of images and HTTP status OK.
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // GET endpoint for retrieving competition information based on competition_id.
    @GetMapping("/competitions_infos")
    public ResponseEntity<List<String>> getCompetitionsInfos(@RequestParam String competition_id) {
        // Get a list of competition information using the CompetitionService.
        List<String> infos = competitionService.getCompetitionsInfos(competition_id);
        // Return a ResponseEntity with the list of information and HTTP status OK.
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }
}
