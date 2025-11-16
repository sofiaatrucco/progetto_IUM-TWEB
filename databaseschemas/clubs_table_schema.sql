-- Table: public.clubs

-- DROP TABLE IF EXISTS public.clubs;

CREATE TABLE IF NOT EXISTS public.clubs
(
    id bigint NOT NULL DEFAULT nextval('clubs_id_seq'::regclass),
    average_age double precision,
    club_code character varying(255) COLLATE pg_catalog."default",
    club_id integer,
    club_image character varying(255) COLLATE pg_catalog."default",
    coach_name character varying(255) COLLATE pg_catalog."default",
    domestic_competition_id character varying(255) COLLATE pg_catalog."default",
    foreigners_number integer,
    foreigners_percentage double precision,
    last_season integer,
    name character varying(255) COLLATE pg_catalog."default",
    national_team_players integer,
    net_transfer_record character varying(255) COLLATE pg_catalog."default",
    squad_size integer,
    stadium_name character varying(255) COLLATE pg_catalog."default",
    stadium_seats integer,
    total_market_value bigint,
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT clubs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clubs
    OWNER to postgres;