package com.example.java_server.competition;

public class CompetitionDTO {
    private String competition_id;
    private String competition_name;

    public CompetitionDTO(String competition_id, String competition_name) {
        this.competition_id = competition_id;
        this.competition_name = competition_name;
    }

    public String getCompetition_id() {
        return competition_id;
    }

    public void setCompetition_id(String competition_id) {
        this.competition_id = competition_id;
    }

    public String getCompetition_name() {
        return competition_name;
    }

    public void setCompetition_name(String competition_name) {
        this.competition_name = competition_name;
    }
}
