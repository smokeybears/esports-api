-- dogfish schema dump


--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE app_user (
    username character varying(40) NOT NULL,
    email character varying(40),
    password character varying(100),
    profile_image character varying(100),
    banner_image character varying(100),
    date_added timestamp without time zone DEFAULT now()
);


--
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comment (
    id integer NOT NULL,
    post_id integer NOT NULL,
    body character varying(10000) NOT NULL,
    author character varying(40) NOT NULL,
    score integer DEFAULT 0,
    date_added timestamp without time zone DEFAULT now()
);


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comment_id_seq OWNED BY comment.id;


--
-- Name: forum; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE forum (
    id integer NOT NULL,
    game integer NOT NULL,
    title character varying(60) NOT NULL,
    description character varying(250),
    banner_image character varying(100)
);


--
-- Name: forum_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE forum_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: forum_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE forum_id_seq OWNED BY forum.id;


--
-- Name: game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE game (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    publisher character varying(50)
);


--
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE game_id_seq OWNED BY game.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE post (
    id integer NOT NULL,
    forum_id integer NOT NULL,
    author character varying(40) NOT NULL,
    title character varying(100),
    body character varying(10000),
    multimedia character varying(100),
    score integer DEFAULT 0,
    date_added timestamp without time zone DEFAULT now()
);


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE post_id_seq OWNED BY post.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    migration_id character varying(128) NOT NULL
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE session (
    username character varying(40) NOT NULL,
    session_id uuid NOT NULL,
    expires timestamp without time zone DEFAULT '2019-02-19 00:00:00'::timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY forum ALTER COLUMN id SET DEFAULT nextval('forum_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY game ALTER COLUMN id SET DEFAULT nextval('game_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY post ALTER COLUMN id SET DEFAULT nextval('post_id_seq'::regclass);


--
-- Name: app_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY app_user
    ADD CONSTRAINT app_user_email_key UNIQUE (email);


--
-- Name: app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (username);


--
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: forum_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY forum
    ADD CONSTRAINT forum_pkey PRIMARY KEY (id);


--
-- Name: game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- Name: post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (migration_id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (session_id);


--
-- Name: comment_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES post(id);


--
-- Name: forum_game_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY forum
    ADD CONSTRAINT forum_game_fkey FOREIGN KEY (game) REFERENCES game(id);


--
-- Name: session_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_username_fkey FOREIGN KEY (username) REFERENCES app_user(username);


--
-- PostgreSQL database dump complete
--



-- Schema dump done. Now dumping migration tracking table:


--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO schema_migrations VALUES ('20190123155823');
INSERT INTO schema_migrations VALUES ('20190125002321');
INSERT INTO schema_migrations VALUES ('20190220162349');
INSERT INTO schema_migrations VALUES ('20190220162525');
INSERT INTO schema_migrations VALUES ('20190220162902');
INSERT INTO schema_migrations VALUES ('20190220163540');


--
-- PostgreSQL database dump complete
--

