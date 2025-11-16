package com.example.java_server.club;

import jakarta.persistence.*;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "club_id")
    private int clubID;

    @Column(name = "club_code")
    private String clubCode;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private String domesticCompetitionID;

    @Column(name = "total_market_value")
    private long totalMarketvalue;

    @Column(name = "squad_size")
    private int squadSize;

    @Column(name = "average_age")
    private double averageAge;

    @Column(name = "foreigners_number")
    private int foreignersNumber;

    @Column(name = "foreigners_percentage")
    private double foreignersPercentage;

    @Column(name = "national_team_players")
    private int nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private int stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "coach_name")
    private String coachName;

    @Column(name = "last_season")
    private int lastSeason;

    @Column(name = "url")
    private String url;

    @Column(name = "club_image")
    private String clubImage;

    public Club() {
    }

    public Club(Long id, int clubID, String clubCode, String name, String domesticCompetitionID, Long totalMarketvalue, int squadSize, double averageAge, int foreignersNumber, double foreignersPercentage, int nationalTeamPlayers, String stadiumName, int stadiumSeats, String netTransferRecord, String coachName, int lastSeason, String url, String clubImage) {
        this.id = id;
        this.clubID = clubID;
        this.clubCode = clubCode;
        this.name = name;
        this.domesticCompetitionID = domesticCompetitionID;
        this.totalMarketvalue = totalMarketvalue;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.coachName = coachName;
        this.lastSeason = lastSeason;
        this.url = url;
        this.clubImage = clubImage;
    }

    public Long getId() {
        return id;
    }

    public int getClubID() {
        return clubID;
    }

    public void setClubID(int clubID) {
        this.clubID = clubID;
    }

    public String getClubCode() {
        return clubCode;
    }

    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionID() {
        return domesticCompetitionID;
    }

    public void setDomesticCompetitionID(String domesticCompetitionID) {
        this.domesticCompetitionID = domesticCompetitionID;
    }

    public Long getTotalMarketvalue() {
        return totalMarketvalue;
    }

    public void setTotalMarketvalue(Long totalMarketvalue) {
        this.totalMarketvalue = totalMarketvalue;
    }

    public int getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(int squadSize) {
        this.squadSize = squadSize;
    }

    public double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(double averageAge) {
        this.averageAge = averageAge;
    }

    public int getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(int foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public int getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(int nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public int getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(int stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getClubImage() { return clubImage; }

    public void setClubImage(String clubImage) { this.clubImage = clubImage; }
}
