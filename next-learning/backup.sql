--
-- PostgreSQL database dump
--

\restrict KGQLF1TxYekcfj4nyeEayjT7taTpMITsqWrXmZ8fLTyTV6BOEfS0Z38FbC4B6bh

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Entry" DROP CONSTRAINT IF EXISTS "Entry_pkey";
ALTER TABLE IF EXISTS public."Entry" ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP SEQUENCE IF EXISTS public."Entry_id_seq";
DROP TABLE IF EXISTS public."Entry";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Entry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Entry" (
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Entry" OWNER TO postgres;

--
-- Name: Entry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Entry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Entry_id_seq" OWNER TO postgres;

--
-- Name: Entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Entry_id_seq" OWNED BY public."Entry".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Entry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Entry" ALTER COLUMN id SET DEFAULT nextval('public."Entry_id_seq"'::regclass);


--
-- Data for Name: Entry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Entry" (text, "createdAt", "updatedAt", id) FROM stdin;
fuga	2026-07-09 22:15:12.381	2026-07-09 22:15:12.381	2
piyo	2026-07-09 22:15:15.769	2026-07-09 22:15:15.769	3
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e58548cc-3916-4b40-95bb-73fe4c69caaa	fe540a2e8e3737bf7e868c67e2ffc669477d4e6c3ae1a157c43a433d3b966f5a	2026-07-09 22:14:45.963102+00	20260708052104_init	\N	\N	2026-07-09 22:14:45.950329+00	1
f4dd3e64-c91c-492d-9577-9b3211583982	72cc6d5253b48d2e19c6ca6ccec5d8162b8d7ca14433e63b5cac0c89e1bee9d0	2026-07-09 22:14:45.981342+00	20260708121626_entry_id_to_int	\N	\N	2026-07-09 22:14:45.965197+00	1
\.


--
-- Name: Entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Entry_id_seq"', 4, true);


--
-- Name: Entry Entry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Entry"
    ADD CONSTRAINT "Entry_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict KGQLF1TxYekcfj4nyeEayjT7taTpMITsqWrXmZ8fLTyTV6BOEfS0Z38FbC4B6bh

