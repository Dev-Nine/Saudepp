--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: user_type_enum; Type: TYPE; Schema: public; Owner: saudepp
--

CREATE TYPE public.user_type_enum AS ENUM (
    '0',
    '2'
);


ALTER TYPE public.user_type_enum OWNER TO saudepp;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    content character varying NOT NULL,
    date timestamp without time zone NOT NULL,
    "noticeId" integer,
    "userId" integer
);


ALTER TABLE public.comment OWNER TO saudepp;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO saudepp;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- Name: covid_info; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.covid_info (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    deaths integer DEFAULT 0 NOT NULL,
    confirmed integer DEFAULT 0 NOT NULL,
    recovered integer DEFAULT 0 NOT NULL,
    lethality character varying DEFAULT 0 NOT NULL
);


ALTER TABLE public.covid_info OWNER TO saudepp;

--
-- Name: covid_info_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.covid_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.covid_info_id_seq OWNER TO saudepp;

--
-- Name: covid_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.covid_info_id_seq OWNED BY public.covid_info.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO saudepp;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO saudepp;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notice; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.notice (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    "userId" integer,
    views integer DEFAULT 0 NOT NULL,
    title character varying(70) NOT NULL,
    abstract character varying(120) NOT NULL,
    text text NOT NULL,
    "imageId" character varying(8),
    "imageType" character varying(5),
    "deleteHash" character varying(16)
);


ALTER TABLE public.notice OWNER TO saudepp;

--
-- Name: notice_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.notice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notice_id_seq OWNER TO saudepp;

--
-- Name: notice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.notice_id_seq OWNED BY public.notice.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.tag (
    description character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.tag OWNER TO saudepp;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO saudepp;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- Name: tag_notice; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public.tag_notice (
    "noticeId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public.tag_notice OWNER TO saudepp;

--
-- Name: user; Type: TABLE; Schema: public; Owner: saudepp
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    type public.user_type_enum DEFAULT '2'::public.user_type_enum NOT NULL,
    username character varying(20) NOT NULL,
    "identifierType" character varying DEFAULT 'cpf'::character varying NOT NULL,
    identifier character varying NOT NULL,
    password character varying(72) NOT NULL,
    "imageId" character varying(8),
    "imageType" character varying(5),
    "deleteHash" character varying(16)
);


ALTER TABLE public."user" OWNER TO saudepp;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: saudepp
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO saudepp;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saudepp
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- Name: covid_info id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.covid_info ALTER COLUMN id SET DEFAULT nextval('public.covid_info_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: notice id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.notice ALTER COLUMN id SET DEFAULT nextval('public.notice_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- Name: notice PK_705062b14410ff1a04998f86d72; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY (id);


--
-- Name: covid_info PK_7b67463c8fda429346f1a3667e5; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.covid_info
    ADD CONSTRAINT "PK_7b67463c8fda429346f1a3667e5" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- Name: tag_notice PK_ca472fa482b939a79e1c185614f; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag_notice
    ADD CONSTRAINT "PK_ca472fa482b939a79e1c185614f" PRIMARY KEY ("noticeId", "tagId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: tag UQ_6351d651f2af2f6a558ddfae9c1; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "UQ_6351d651f2af2f6a558ddfae9c1" UNIQUE (description);


--
-- Name: covid_info UQ_7618b20a3798c64ab3729808f60; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.covid_info
    ADD CONSTRAINT "UQ_7618b20a3798c64ab3729808f60" UNIQUE (date);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_88415e12a223edce017506fdc3; Type: INDEX; Schema: public; Owner: saudepp
--

CREATE INDEX "IDX_88415e12a223edce017506fdc3" ON public.tag_notice USING btree ("tagId");


--
-- Name: IDX_f6b82d8c4e917bac0c993eb926; Type: INDEX; Schema: public; Owner: saudepp
--

CREATE INDEX "IDX_f6b82d8c4e917bac0c993eb926" ON public.tag_notice USING btree ("noticeId");


--
-- Name: comment FK_02184cee9b85295f6ac887d120c; Type: FK CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_02184cee9b85295f6ac887d120c" FOREIGN KEY ("noticeId") REFERENCES public.notice(id) ON DELETE CASCADE;


--
-- Name: tag_notice FK_88415e12a223edce017506fdc3f; Type: FK CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag_notice
    ADD CONSTRAINT "FK_88415e12a223edce017506fdc3f" FOREIGN KEY ("tagId") REFERENCES public.tag(id) ON DELETE CASCADE;


--
-- Name: comment FK_c0354a9a009d3bb45a08655ce3b; Type: FK CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: notice FK_d0d4b8dac89a99634b7e1fde052; Type: FK CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT "FK_d0d4b8dac89a99634b7e1fde052" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: tag_notice FK_f6b82d8c4e917bac0c993eb926f; Type: FK CONSTRAINT; Schema: public; Owner: saudepp
--

ALTER TABLE ONLY public.tag_notice
    ADD CONSTRAINT "FK_f6b82d8c4e917bac0c993eb926f" FOREIGN KEY ("noticeId") REFERENCES public.notice(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

