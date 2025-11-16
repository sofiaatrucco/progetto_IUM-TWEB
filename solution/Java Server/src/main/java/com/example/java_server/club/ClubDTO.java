package com.example.java_server.club;

public class ClubDTO {
    private int club_id;
    private String club_name;

    public ClubDTO(int club_id, String club_name) {
        this.club_id = club_id;
        this.club_name = club_name;
    }

    public int getClub_id() {
        return club_id;
    }

    public void setClub_id(int club_id) {
        this.club_id = club_id;
    }

    public String getClub_name() {
        return club_name;
    }

    public void setClub_name(String club_name) {
        this.club_name = club_name;
    }
}
