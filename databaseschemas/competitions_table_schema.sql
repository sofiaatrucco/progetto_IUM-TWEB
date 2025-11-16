-- Table: public.competitions

-- DROP TABLE IF EXISTS public.competitions;

CREATE TABLE IF NOT EXISTS public.competitions
(
    id bigint NOT NULL DEFAULT nextval('competitions_id_seq'::regclass),
    competition_code character varying(255) COLLATE pg_catalog."default",
    competition_id character varying(255) COLLATE pg_catalog."default",
    competition_image character varying(255) COLLATE pg_catalog."default",
    confederation character varying(255) COLLATE pg_catalog."default",
    country_id integer,
    country_name character varying(255) COLLATE pg_catalog."default",
    domestic_league_code character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    sub_type character varying(255) COLLATE pg_catalog."default",
    type character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT competitions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.competitions
    OWNER to postgres;