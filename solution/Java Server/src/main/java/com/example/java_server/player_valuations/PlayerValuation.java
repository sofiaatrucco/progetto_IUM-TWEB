package com.example.java_server.player_valuations;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Table(name = "player_valuations")
public class PlayerValuation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_id")
    private int playerID;

    @Column(name = "last_season")
    private String lastSeason;

    @Column(name = "datetime")
    private Date datetime;

    @Column(name = "date")
    private String date;

    @Column(name = "dateweek")
    private String dateweek;

    @Column(name = "market_value_in_eur")
    private long marketValueInEur;

    @Column(name = "n")
    private int n;

    @Column(name = "current_club_id")
    private String currentClubID;

    @Column(name = "player_club_domestic_competition_id")
    private String playerClubDomesticCompetitionID;

    public PlayerValuation(Long id, int playerID, String lastSeason, Date datetime, String date, String dateweek, long marketValueInEur, int n, String currentClubID, String playerClubDomesticCompetitionID) {
        this.id = id;
        this.playerID = playerID;
        this.lastSeason = lastSeason;
        this.datetime = datetime;
        this.date = date;
        this.dateweek = dateweek;
        this.marketValueInEur = marketValueInEur;
        this.n = n;
        this.currentClubID = currentClubID;
        this.playerClubDomesticCompetitionID = playerClubDomesticCompetitionID;
    }

    public PlayerValuation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPlayerID() {
        return playerID;
    }

    public void setPlayerID(int playerID) {
        this.playerID = playerID;
    }

    public String getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(String lastSeason) {
        this.lastSeason = lastSeason;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDateweek() {
        return dateweek;
    }

    public void setDateweek(String dateweek) {
        this.dateweek = dateweek;
    }

    public long getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(long marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public String getCurrentClubID() {
        return currentClubID;
    }

    public void setCurrentClubID(String currentClubID) {
        this.currentClubID = currentClubID;
    }

    public String getPlayerClubDomesticCompetitionID() {
        return playerClubDomesticCompetitionID;
    }

    public void setPlayerClubDomesticCompetitionID(String playerClubDomesticCompetitionID) {
        this.playerClubDomesticCompetitionID = playerClubDomesticCompetitionID;
    }
}