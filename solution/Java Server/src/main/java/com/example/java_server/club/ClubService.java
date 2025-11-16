package com.example.java_server.club;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    // Save a club entity to the database.
    public Club save(Club club) {
        return clubRepository.save(club);
    }

    // Get a list of clubs (as DTOs) by competition ID.
    public List<ClubDTO> getClubs(String competition_id) {
        return clubRepository.findClubsIdAndNameByCompetitionId(competition_id);
    }

    // Get a list of club images by club ID.
    public List<String> getClubsImages(int club_id) {
        return clubRepository.findClubsImagesByClubId(club_id);
    }

    // Get a list of club information by club ID.
    public List<String> getClubsInfos(int club_id) {
        return clubRepository.findClubsInfosByClubId(club_id);
    }

    // Count the number of clubs by competition ID.
    public List<Integer> countClubs(String competition_id) {
        return clubRepository.findNumberOfClubsByCompetitionId(competition_id);
    }
}
