-- Table: public.players

-- DROP TABLE IF EXISTS public.players;

CREATE TABLE IF NOT EXISTS public.players
(
    id bigint NOT NULL DEFAULT nextval('players_id_seq'::regclass),
    agent_name character varying(255) COLLATE pg_catalog."default",
    city_of_birth character varying(255) COLLATE pg_catalog."default",
    contract_expiration_date timestamp(6) without time zone,
    country_of_birth character varying(255) COLLATE pg_catalog."default",
    country_of_citizenship character varying(255) COLLATE pg_catalog."default",
    current_club_domestic_competition_id character varying(255) COLLATE pg_catalog."default",
    current_club_id integer,
    current_club_name character varying(255) COLLATE pg_catalog."default",
    date_of_birth character varying(255) COLLATE pg_catalog."default",
    first_name character varying(255) COLLATE pg_catalog."default",
    foot character varying(255) COLLATE pg_catalog."default",
    height_in_cm integer,
    highest_market_value_in_eur bigint,
    image_url character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    last_season character varying(255) COLLATE pg_catalog."default",
    market_value_in_eur bigint,
    name character varying(255) COLLATE pg_catalog."default",
    player_code character varying(255) COLLATE pg_catalog."default",
    player_id integer,
    "position" character varying(255) COLLATE pg_catalog."default",
    sub_position character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT players_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.players
    OWNER to postgres;