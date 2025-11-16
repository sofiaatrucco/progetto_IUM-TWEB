-- Table: public.player_valuations

-- DROP TABLE IF EXISTS public.player_valuations;

CREATE TABLE IF NOT EXISTS public.player_valuations
(
    id bigint NOT NULL DEFAULT nextval('player_valuations_id_seq'::regclass),
    current_club_id character varying(255) COLLATE pg_catalog."default",
    date character varying(255) COLLATE pg_catalog."default",
    datetime timestamp(6) without time zone,
    dateweek character varying(255) COLLATE pg_catalog."default",
    last_season character varying(255) COLLATE pg_catalog."default",
    market_value_in_eur bigint,
    n integer,
    player_club_domestic_competition_id character varying(255) COLLATE pg_catalog."default",
    player_id integer,
    CONSTRAINT player_valuations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.player_valuations
    OWNER to postgres;