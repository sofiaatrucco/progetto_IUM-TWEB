package com.example.java_server.club;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/postgres")
public class ClubController {
    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    // POST endpoint for inserting a new club.
    @PostMapping("/insert_club")
    public ResponseEntity<Club> insertClub(@RequestBody Club club) {
        // Save the club using the ClubService.
        Club savedClub = clubService.save(club);
        // Return a ResponseEntity with the saved club and HTTP status CREATED.
        return new ResponseEntity<>(savedClub, HttpStatus.CREATED);
    }

    // GET endpoint for retrieving clubs based on competition_id.
    @GetMapping("/clubs")
    public ResponseEntity<List<ClubDTO>> getClubs(@RequestParam String competition_id) {
        // Get a list of clubs using the ClubService.
        List<ClubDTO> clubs = clubService.getClubs(competition_id);
        // Return a ResponseEntity with the list of clubs and HTTP status OK.
        return new ResponseEntity<>(clubs, HttpStatus.OK);
    }

    // GET endpoint for retrieving club images based on club_id.
    @GetMapping("/clubs_images")
    public ResponseEntity<List<String>> getClubsImages(@RequestParam int club_id) {
        // Get a list of club images using the ClubService.
        List<String> images = clubService.getClubsImages(club_id);
        // Return a ResponseEntity with the list of images and HTTP status OK.
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // GET endpoint for retrieving club information based on club_id.
    @GetMapping("/clubs_infos")
    public ResponseEntity<List<String>> getClubsInfos(@RequestParam int club_id) {
        // Get a list of club information using the ClubService.
        List<String> infos = clubService.getClubsInfos(club_id);
        // Return a ResponseEntity with the list of information and HTTP status OK.
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }

    // GET endpoint for counting the number of clubs based on competition_id.
    @GetMapping("/count_clubs")
    public ResponseEntity<List<Integer>> countClubs(@RequestParam String competition_id) {
        // Count the number of clubs using the ClubService.
        List<Integer> number = clubService.countClubs(competition_id);
        // Return a ResponseEntity with the count and HTTP status OK.
        return new ResponseEntity<>(number, HttpStatus.OK);
    }
}
