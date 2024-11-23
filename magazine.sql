--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

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
-- Name: customer_attendance(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.customer_attendance() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  -- Asigna el primer argumento del trigger a la variable event_id

  IF TG_OP = 'INSERT' THEN
    -- Verifica que event_id no sea NULL

    -- Inserta el registro en la tabla attendance
    INSERT INTO attendace (customer_id, event_id)
    VALUES (NEW.id, 1);

  END IF;

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Error al crear el registro de asistencia para el cliente %: %', NEW.id, SQLERRM;
  RETURN NULL; -- Retorna NULL si hay un error para evitar el registro en attendance

END;
$$;


ALTER FUNCTION public.customer_attendance() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: attendace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendace (
    id integer NOT NULL,
    customer_id integer,
    event_id integer,
    confirm_attendance boolean DEFAULT false,
    confirm_arrival boolean DEFAULT false,
    confirmation_time timestamp(6) without time zone,
    arrival_time timestamp(6) without time zone,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    state boolean DEFAULT true
);


ALTER TABLE public.attendace OWNER TO postgres;

--
-- Name: attendace_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendace_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attendace_id_seq OWNER TO postgres;

--
-- Name: attendace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendace_id_seq OWNED BY public.attendace.id;


--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    document character varying(100) NOT NULL,
    phone character varying(15),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    state boolean DEFAULT true
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO postgres;

--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id integer NOT NULL,
    event_name character varying(100) NOT NULL,
    date timestamp(6) without time zone NOT NULL,
    location character varying(255),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    state boolean DEFAULT true,
    place character varying(500),
    hour time(6) without time zone
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    nombre character varying,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    state boolean DEFAULT true
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    state boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: attendace id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendace ALTER COLUMN id SET DEFAULT nextval('public.attendace_id_seq'::regclass);


--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2d8ca245-749c-458b-b699-a6412ca9e84c	f792cc333e623721d4cb8bae476187ee9f69d4ba563c59df43055349201c3b57	2024-11-19 15:22:16.917365-05	20241119202216_	\N	\N	2024-11-19 15:22:16.685883-05	1
\.


--
-- Data for Name: attendace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendace (id, customer_id, event_id, confirm_attendance, confirm_arrival, confirmation_time, arrival_time, created_at, update_at, state) FROM stdin;
1	1	1	f	f	\N	\N	2024-11-20 16:30:04.0252	2024-11-20 16:30:04.0252	t
2	2	1	t	t	2024-11-22 21:47:38.531	2024-11-22 21:06:19.227	2024-11-20 16:30:07.993406	2024-11-20 16:30:07.993406	t
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (id, name, surname, document, phone, created_at, update_at, state) FROM stdin;
1	jhonny	agudelo tenorio	113645020	3127470718	2024-11-20 16:30:04.0252	2024-11-20 16:30:04.0252	t
2	mayuyu	prado	1113668835	3127470718	2024-11-20 16:30:07.993406	2024-11-20 16:30:07.993406	t
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (id, event_name, date, location, created_at, update_at, state, place, hour) FROM stdin;
1	Conectados por previser	2024-11-28 00:00:00	Cra 70 # 14-02 Salón Premiun	2024-11-19 17:25:40.393465	2024-11-19 17:25:40.393465	t	Portal La Hacienda	18:00:00
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, nombre, created_at, update_at, state) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role_id, username, password, created_at, update_at, state) FROM stdin;
\.


--
-- Name: attendace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendace_id_seq', 2, true);


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_id_seq', 2, true);


--
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_id_seq', 1, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: attendace attendace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendace
    ADD CONSTRAINT attendace_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: attendace_customer_id_event_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX attendace_customer_id_event_id_key ON public.attendace USING btree (customer_id, event_id);


--
-- Name: customer_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customer_email_key ON public.customer USING btree (document);


--
-- Name: customer after_customer_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER after_customer_insert AFTER INSERT ON public.customer FOR EACH ROW EXECUTE FUNCTION public.customer_attendance();


--
-- Name: attendace attendace_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendace
    ADD CONSTRAINT attendace_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE;


--
-- Name: attendace attendace_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendace
    ADD CONSTRAINT attendace_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

