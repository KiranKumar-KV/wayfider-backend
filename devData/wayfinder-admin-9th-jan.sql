--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.20
-- Dumped by pg_dump version 9.5.20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amenities (
    amenities_id integer NOT NULL,
    amenities_name character varying(255),
    amenities_path text,
    status boolean,
    mall_id integer,
    amenities_number integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.amenities OWNER TO postgres;

--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.amenities_amenities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.amenities_amenities_id_seq OWNER TO postgres;

--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.amenities_amenities_id_seq OWNED BY public.amenities.amenities_id;


--
-- Name: amenities_amenities_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.amenities_amenities_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.amenities_amenities_number_seq OWNER TO postgres;

--
-- Name: amenities_amenities_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.amenities_amenities_number_seq OWNED BY public.amenities.amenities_number;


--
-- Name: banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banners (
    banner_id integer NOT NULL,
    banner_name character varying(255),
    validity timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean,
    mall_id integer
);


ALTER TABLE public.banners OWNER TO postgres;

--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banners_id_seq OWNER TO postgres;

--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.banner_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.category_id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    event_name character varying(255),
    description character varying(255),
    startdate timestamp without time zone,
    enddate timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean,
    mall_id integer
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.event_id;


--
-- Name: floor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.floor (
    floor_id integer NOT NULL,
    floor_name character varying(255),
    alias character varying(255),
    atm boolean,
    wheelchair boolean,
    babycare boolean,
    washroom boolean,
    mall_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean
);


ALTER TABLE public.floor OWNER TO postgres;

--
-- Name: floor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.floor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.floor_id_seq OWNER TO postgres;

--
-- Name: floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.floor_id_seq OWNED BY public.floor.floor_id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    image_id integer NOT NULL,
    image_url character varying(255),
    image_type_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean,
    image_type character varying(255)
);


ALTER TABLE public.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_id_seq OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.image_id;


--
-- Name: main_card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.main_card (
    main_card_id integer NOT NULL,
    main_card_name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean,
    mall_id integer
);


ALTER TABLE public.main_card OWNER TO postgres;

--
-- Name: main_card_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.main_card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.main_card_id_seq OWNER TO postgres;

--
-- Name: main_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.main_card_id_seq OWNED BY public.main_card.main_card_id;


--
-- Name: mall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mall (
    mall_id integer NOT NULL,
    mall_name character varying(255),
    location character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean
);


ALTER TABLE public.mall OWNER TO postgres;

--
-- Name: mall_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mall_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mall_id_seq OWNER TO postgres;

--
-- Name: mall_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mall_id_seq OWNED BY public.mall.mall_id;


--
-- Name: mall_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mall_info (
    mall_info_id integer NOT NULL,
    helptext character varying(255),
    phone bigint,
    email character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    mall_id integer,
    status boolean
);


ALTER TABLE public.mall_info OWNER TO postgres;

--
-- Name: mall_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mall_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mall_info_id_seq OWNER TO postgres;

--
-- Name: mall_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mall_info_id_seq OWNED BY public.mall_info.mall_info_id;


--
-- Name: offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers (
    offer_id integer NOT NULL,
    offer_name character varying(255),
    description text,
    validity timestamp without time zone,
    shop_id integer,
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.offers OWNER TO postgres;

--
-- Name: offers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_id_seq OWNER TO postgres;

--
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.offer_id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name character varying(255),
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.role_id;


--
-- Name: shops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shops (
    shop_id integer NOT NULL,
    shop_name character varying(255),
    contact_number bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean
);


ALTER TABLE public.shops OWNER TO postgres;

--
-- Name: shops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shops_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shops_id_seq OWNER TO postgres;

--
-- Name: shops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shops_id_seq OWNED BY public.shops.shop_id;


--
-- Name: store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store (
    store_id integer NOT NULL,
    store_number integer,
    floor_id integer,
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.store OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.store_id_seq OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.store_id_seq OWNED BY public.store.store_id;


--
-- Name: tbl_store_shop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_store_shop (
    id integer NOT NULL,
    store_id integer,
    shop_id integer,
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tbl_store_shop OWNER TO postgres;

--
-- Name: tbl_floor_shops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_floor_shops_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_floor_shops_id_seq OWNER TO postgres;

--
-- Name: tbl_floor_shops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_floor_shops_id_seq OWNED BY public.tbl_store_shop.id;


--
-- Name: tbl_screen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_screen (
    screen_id integer NOT NULL,
    device_unique_id integer,
    mall_id integer,
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    device_name character varying(255)
);


ALTER TABLE public.tbl_screen OWNER TO postgres;

--
-- Name: tbl_screen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_screen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_screen_id_seq OWNER TO postgres;

--
-- Name: tbl_screen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_screen_id_seq OWNED BY public.tbl_screen.screen_id;


--
-- Name: tbl_shop_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_shop_category (
    id integer NOT NULL,
    shop_id integer,
    category_id integer,
    status boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tbl_shop_category OWNER TO postgres;

--
-- Name: tbl_shop_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_shop_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_shop_category_id_seq OWNER TO postgres;

--
-- Name: tbl_shop_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_shop_category_id_seq OWNED BY public.tbl_shop_category.id;


--
-- Name: tbl_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_user (
    user_id integer NOT NULL,
    name character varying(255),
    password character varying(50),
    mall_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status boolean,
    email character varying(255),
    phone bigint,
    role_id integer
);


ALTER TABLE public.tbl_user OWNER TO postgres;

--
-- Name: tbl_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_user_id_seq OWNER TO postgres;

--
-- Name: tbl_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_user_id_seq OWNED BY public.tbl_user.user_id;


--
-- Name: amenities_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities ALTER COLUMN amenities_id SET DEFAULT nextval('public.amenities_amenities_id_seq'::regclass);


--
-- Name: amenities_number; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities ALTER COLUMN amenities_number SET DEFAULT nextval('public.amenities_amenities_number_seq'::regclass);


--
-- Name: banner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners ALTER COLUMN banner_id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: floor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor ALTER COLUMN floor_id SET DEFAULT nextval('public.floor_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN image_id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: main_card_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_card ALTER COLUMN main_card_id SET DEFAULT nextval('public.main_card_id_seq'::regclass);


--
-- Name: mall_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mall ALTER COLUMN mall_id SET DEFAULT nextval('public.mall_id_seq'::regclass);


--
-- Name: mall_info_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mall_info ALTER COLUMN mall_info_id SET DEFAULT nextval('public.mall_info_id_seq'::regclass);


--
-- Name: offer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers ALTER COLUMN offer_id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- Name: role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: shop_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops ALTER COLUMN shop_id SET DEFAULT nextval('public.shops_id_seq'::regclass);


--
-- Name: store_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store ALTER COLUMN store_id SET DEFAULT nextval('public.store_id_seq'::regclass);


--
-- Name: screen_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_screen ALTER COLUMN screen_id SET DEFAULT nextval('public.tbl_screen_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_shop_category ALTER COLUMN id SET DEFAULT nextval('public.tbl_shop_category_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_store_shop ALTER COLUMN id SET DEFAULT nextval('public.tbl_floor_shops_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_user_id_seq'::regclass);


--
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amenities (amenities_id, amenities_name, amenities_path, status, mall_id, amenities_number, created_at, updated_at) FROM stdin;
2	ATM	amenities-27zg18xs.json	t	1	2	2020-01-08 12:15:36	2020-01-08 12:15:36
3	ATM	amenities-n5yikz69.json	t	1	3	2020-01-08 12:16:30	2020-01-08 12:16:30
4	ATM	amenities-f9fhnjh.json	t	1	4	2020-01-08 12:17:24	2020-01-08 12:17:24
1	ATM	amenities-4vhj0qdo.json	t	1	1	2020-01-08 12:14:37	2020-01-08 13:05:49
\.


--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.amenities_amenities_id_seq', 4, true);


--
-- Name: amenities_amenities_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.amenities_amenities_number_seq', 4, true);


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banners (banner_id, banner_name, validity, created_at, updated_at, status, mall_id) FROM stdin;
2	banner1	2010-01-01 00:00:00	2019-12-05 12:50:32	2019-12-05 12:50:32	t	1
5	banner new	2020-01-31 12:00:00	2019-12-11 12:30:15	2019-12-11 12:30:15	t	2
6	banner1	2020-01-31 12:00:00	2019-12-23 09:43:11	2019-12-23 09:43:11	t	5
4	banner2	2020-02-15 10:00:00	2019-12-07 15:42:28	2019-12-31 12:53:16	t	4
1	banner1	2010-01-01 00:00:00	2019-12-05 12:34:02	2019-12-31 12:53:16	f	1
\.


--
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banners_id_seq', 6, true);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name, created_at, updated_at, status) FROM stdin;
2	electronics	2019-12-06 16:59:24	2019-12-06 16:59:24	t
1	home applience	2019-11-29 12:00:00	2019-12-06 17:36:24	t
3	toys	2019-12-10 13:58:02	2019-12-10 13:58:02	t
4	stationary	2019-12-30 13:39:24	2019-12-30 14:24:09	t
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 4, true);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (event_id, event_name, description, startdate, enddate, created_at, updated_at, status, mall_id) FROM stdin;
11	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:06:01	2019-12-04 13:06:01	t	1
12	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:06:13	2019-12-04 13:06:13	t	1
6	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:04:12	2019-12-04 13:04:12	t	1
13	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:06:51	2019-12-04 13:06:51	t	1
3	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 12:59:18	2019-12-04 12:59:18	t	1
7	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:05:03	2019-12-04 13:05:03	t	1
14	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 16:44:42	2019-12-04 16:44:42	t	1
16	christmas	christmas	2019-12-05 00:00:00	2019-12-05 00:00:00	2019-12-05 10:51:40	2019-12-05 10:51:40	t	1
5	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:01:44	2019-12-04 13:01:44	t	1
17	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:13:09	2019-12-09 12:13:09	t	1
19	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:13:55	2019-12-09 12:13:55	t	1
20	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:14:23	2019-12-09 12:14:23	t	1
21	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:15:08	2019-12-09 12:15:08	t	1
22	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:15:58	2019-12-09 12:15:58	t	1
23	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:16:13	2019-12-09 12:16:13	t	1
24	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:16:35	2019-12-09 12:16:35	t	1
4	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 12:59:58	2019-12-04 12:59:58	t	2
10	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:05:49	2019-12-04 13:05:49	t	8
9	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 13:05:33	2019-12-04 13:05:33	t	4
15	christmas	christmas	2019-12-04 00:00:00	2019-12-04 00:00:00	2019-12-04 16:44:59	2019-12-04 16:44:59	t	2
18	forum-event	christmas event	2019-12-02 00:00:00	2020-01-05 00:00:00	2019-12-09 12:13:39	2019-12-31 12:53:16	f	1
8	christmas event	christmas event	2019-12-02 09:00:00	2020-01-05 21:00:00	2019-12-04 13:05:20	2019-12-31 12:56:43	t	1
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 24, true);


--
-- Data for Name: floor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.floor (floor_id, floor_name, alias, atm, wheelchair, babycare, washroom, mall_id, created_at, updated_at, status) FROM stdin;
19	upper ground	UG	t	t	t	t	1	2019-12-06 15:46:19	2019-12-06 15:46:19	t
20	first floor	I	t	t	t	t	2	2019-12-11 15:42:04	2019-12-11 15:42:04	t
18	Lower ground	LG	t	f	t	f	1	2019-11-27 15:57:36	2019-12-31 10:16:04	t
\.


--
-- Name: floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.floor_id_seq', 20, true);


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image (image_id, image_url, image_type_id, created_at, updated_at, status, image_type) FROM stdin;
5	d53j558q.png	18	2019-11-27 15:57:36	2019-11-27 15:57:36	t	floor
7	storeqg8cogn4.json	4	2019-11-28 12:35:00	2019-11-28 12:35:00	f	store-path
8	storer7mda5d.json	4	2019-11-28 14:41:25	2019-11-28 14:55:56	f	store-path
11	shoplogo-uwurwldo.jpg	4	2019-11-28 16:05:02	2019-11-28 16:05:02	t	shop-logo
12	shopimage-uwurwldo.jpg	4	2019-11-28 16:05:02	2019-11-28 16:05:02	t	shop-image
91	mall-logo-y61moqb.png	1	2019-12-06 13:13:47	2019-12-06 13:13:47	t	mall-logo
13	shoplogo-essjf76.jpg	5	2019-11-28 17:49:33	2019-11-29 11:13:17	f	shop-logo
15	shoplogo-0b5zmdje.jpg	5	2019-11-29 11:13:17	2019-11-29 11:13:17	t	shop-logo
67	event-zci7lsg.png	9	2019-12-04 16:40:45	2019-12-04 16:40:45	t	event
10	shoplogo-0krrj6bc.jpg	15	2019-11-28 16:03:42	2019-11-28 16:03:42	t	shop-logo
16	shopimage-73e5se8.jpg	5	2019-11-29 11:22:41	2019-11-29 11:22:41	t	shop-image
17	main-card-floor-image-3hkd32cl.png	1	2019-11-29 17:22:46	2019-11-29 17:22:46	f	main-card-name-image
20	main-card-offers-image-3krh90d.png	3	2019-11-29 17:23:42	2019-11-29 17:23:42	f	main-card-offers-image
19	main-card-offers-image-3krh90d.png	3	2019-11-29 17:23:42	2019-11-29 17:23:42	f	main-card-offers-image
18	main-card-floor-image-shtxrosd.png	2	2019-11-29 17:23:04	2019-11-29 17:23:04	f	main-card-name-image
21	main-card-offers-image-3krh90d.png	3	2019-11-29 17:23:42	2019-11-29 17:23:42	f	main-card-offers-image
23	main-card-offers-image-pbd3h1ax.png	4	2019-11-29 17:26:52	2019-11-29 17:26:52	f	main-card-name-image
24	main-card-offers-image-pbd3h1ax.png	4	2019-11-29 17:26:52	2019-11-29 17:26:52	f	main-card-offers-image
22	main-card-offers-image-pbd3h1ax.png	4	2019-11-29 17:26:52	2019-11-29 17:26:52	f	main-card-floor-image
25	main-card-floor-image-m8anl64n.png	5	2019-11-29 17:28:08	2019-11-29 17:28:08	t	main-card-floor-image
26	main-card-name-image-akjkierg.png	5	2019-11-29 17:28:08	2019-11-29 17:28:08	t	main-card-name-image
27	main-card-offers-image-7vy5t0e.png	5	2019-11-29 17:28:08	2019-11-29 17:28:08	t	main-card-offers-image
28	eventl0ok5cvc.png	2	2019-12-04 12:57:55	2019-12-04 12:57:55	t	event
29	eventc3tt2lwi.png	2	2019-12-04 12:57:55	2019-12-04 12:57:55	t	event
30	eventfmavtpw.png	2	2019-12-04 12:57:55	2019-12-04 12:57:55	t	event
34	event-d7yth1z.png	4	2019-12-04 12:59:58	2019-12-04 12:59:58	t	event
35	event-5qq2928p.png	4	2019-12-04 12:59:58	2019-12-04 12:59:58	t	event
36	event-cr9b1wuo.png	4	2019-12-04 12:59:58	2019-12-04 12:59:58	t	event
37	event-ugvvfcs.png	5	2019-12-04 13:01:44	2019-12-04 13:01:44	t	event
38	event-uk05c5n9.png	5	2019-12-04 13:01:44	2019-12-04 13:01:44	t	event
39	event-ajjcie0p.png	5	2019-12-04 13:01:44	2019-12-04 13:01:44	t	event
40	event-hq4o9wk.png	6	2019-12-04 13:04:12	2019-12-04 13:04:12	t	event
41	event-stp9j3g6.png	6	2019-12-04 13:04:12	2019-12-04 13:04:12	t	event
42	event-d652bkp.png	6	2019-12-04 13:04:12	2019-12-04 13:04:12	t	event
43	event-xbywtwq6.png	7	2019-12-04 13:05:03	2019-12-04 13:05:03	t	event
44	event-tti76rm.png	7	2019-12-04 13:05:03	2019-12-04 13:05:03	t	event
45	event-t7u8t8l.png	7	2019-12-04 13:05:03	2019-12-04 13:05:03	t	event
46	event-ycbxh9b.png	8	2019-12-04 13:05:20	2019-12-04 13:05:20	t	event
47	event-a5u2i5pr.png	8	2019-12-04 13:05:20	2019-12-04 13:05:20	t	event
48	event-mst97ume.png	8	2019-12-04 13:05:20	2019-12-04 13:05:20	t	event
49	event-ye0lp92l.png	9	2019-12-04 13:05:33	2019-12-04 13:05:33	t	event
50	event-8k8cgzsr.png	9	2019-12-04 13:05:33	2019-12-04 13:05:33	t	event
51	event-9s3c0o8.png	9	2019-12-04 13:05:33	2019-12-04 13:05:33	t	event
52	event-uwinfj0h.png	10	2019-12-04 13:05:49	2019-12-04 13:05:49	t	event
53	event-kb6xsem4.png	10	2019-12-04 13:05:49	2019-12-04 13:05:49	t	event
54	event-8xy03wh.png	10	2019-12-04 13:05:49	2019-12-04 13:05:49	t	event
55	event-3c7566wr.png	11	2019-12-04 13:06:01	2019-12-04 13:06:01	t	event
56	event-2hpf8ok.png	11	2019-12-04 13:06:01	2019-12-04 13:06:01	t	event
57	event-lybdv0oe.png	11	2019-12-04 13:06:01	2019-12-04 13:06:01	t	event
58	event-eof2hfkt.png	12	2019-12-04 13:06:13	2019-12-04 13:06:13	t	event
59	event-pj8l5nle.png	12	2019-12-04 13:06:13	2019-12-04 13:06:13	t	event
60	event-z4ohg3tb.png	12	2019-12-04 13:06:13	2019-12-04 13:06:13	t	event
61	event-f3c0l4c.png	13	2019-12-04 13:06:51	2019-12-04 13:06:51	t	event
62	event-x0wrtnje.png	13	2019-12-04 13:06:51	2019-12-04 13:06:51	t	event
63	event-j146kud.png	13	2019-12-04 13:06:51	2019-12-04 13:06:51	t	event
64	event-m5ilkncl.png	9	2019-12-04 16:07:09	2019-12-04 16:07:09	t	event
65	event-tafa4kwr.png	9	2019-12-04 16:07:09	2019-12-04 16:07:09	t	event
66	event-2njwywpd.png	9	2019-12-04 16:07:09	2019-12-04 16:07:09	t	event
68	event-adrtekfp.png	9	2019-12-04 16:41:22	2019-12-04 16:41:22	t	event
69	event-8ebc824.png	9	2019-12-04 16:41:55	2019-12-04 16:41:55	t	event
70	event-z0qh1738.png	9	2019-12-04 16:42:22	2019-12-04 16:42:22	t	event
71	event-i5wvc1ckv.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
72	event-3l17l0a8.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
73	event-hs8gbyw.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
74	event-wus4bk4a.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
75	event-x0dsjmym.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
76	event-xpwcz9c8.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
77	event-9lpsjbx.png	9	2019-12-04 16:42:23	2019-12-04 16:42:23	t	event
78	event-ky4rbl9o.png	14	2019-12-04 16:44:42	2019-12-04 16:44:42	t	event
80	event-mcg99win.png	14	2019-12-04 16:44:42	2019-12-04 16:44:42	t	event
81	event-76o8vzgg.png	15	2019-12-04 16:44:59	2019-12-04 16:44:59	t	event
79	event-l0z8qsck.png	14	2019-12-04 16:44:42	2019-12-05 10:43:26	f	event
82	event-yovmvu46.png	16	2019-12-05 10:51:40	2019-12-05 10:51:40	t	event-cover-image
83	event-e67mhd0k.png	16	2019-12-05 10:51:40	2019-12-05 10:51:40	t	event
84	event-rv956ml.png	16	2019-12-05 10:51:40	2019-12-05 10:51:40	t	event
85	event-es6vku1.png	16	2019-12-05 10:51:40	2019-12-05 10:51:40	t	event
88	mall-logo-oqoouail.png	5	2019-12-05 15:51:02	2019-12-05 15:51:02	t	mall-logo
89	mall-logo-e54lhl0n.png	6	2019-12-06 13:08:43	2019-12-06 13:08:43	t	mall-logo
90	mall-logo-ezykmmo.png	7	2019-12-06 13:13:04	2019-12-06 13:13:04	t	mall-logo
93	floor-ay07mo7g.png	2	2019-12-06 16:18:55	2019-12-06 16:20:23	f	floor
92	cwvhm6v.png	19	2019-12-06 15:46:19	2019-12-06 15:46:19	f	floor
87	banner-cz1nn9xm.png	2	2019-12-05 12:50:32	2019-12-06 16:18:55	t	banner
94	floor-6kqtpbic.png	19	2019-12-06 16:20:23	2019-12-06 16:20:23	t	floor
95	shoplogo-x69oskf.png	6	2019-12-06 17:49:08	2019-12-06 17:49:08	t	shop-logo
86	banner-o1eevtye.png	1	2019-12-05 12:34:02	2019-12-09 10:08:14	f	banner
96	shopimage-x69oskf.png	6	2019-12-06 17:49:08	2019-12-06 17:49:08	t	shop-image
97	shoplogo-1bv4meuk.png	12	2019-12-06 18:08:47	2019-12-06 18:08:47	t	shop-logo
98	shopimage-1bv4meuk.png	12	2019-12-06 18:08:47	2019-12-06 18:08:47	t	shop-image
99	shoplogo-czw04i2o.png	13	2019-12-06 18:09:39	2019-12-06 18:09:39	t	shop-logo
100	shopimage-czw04i2o.png	13	2019-12-06 18:09:39	2019-12-06 18:09:39	t	shop-image
9	storemln1ngpo.json	4	2019-11-28 14:55:56	2019-12-07 12:11:49	f	store-path
101	store-t4qzge7t.json	4	2019-12-07 12:11:49	2019-12-07 12:11:49	t	store-path
102	store-obvzd00v.json	5	2019-12-07 12:16:49	2019-12-07 12:16:49	t	store-path
103	store-5vlr8u6l.json	6	2019-12-07 12:17:41	2019-12-07 12:17:41	t	store-path
104	banner-kq4udvz.png	4	2019-12-07 15:42:28	2019-12-07 15:42:28	t	banner
105	banner-sfd3ozh.png	1	2019-12-09 10:08:14	2019-12-09 10:08:14	t	banner
106	main-card-floor-image-cg46ql7l.png	6	2019-12-09 10:50:01	2019-12-09 10:50:01	t	main-card-floor-image
107	main-card-name-image-cnlpgzxs6.png	6	2019-12-09 10:50:01	2019-12-09 10:50:01	t	main-card-name-image
108	main-card-offers-image-spr9tzi.png	6	2019-12-09 10:50:01	2019-12-09 10:50:01	t	main-card-offers-image
109	main-card-floor-image-hf70i0mr.png	7	2019-12-09 10:51:18	2019-12-09 10:51:18	t	main-card-floor-image
110	main-card-name-image-aflnln7.png	7	2019-12-09 10:51:18	2019-12-09 10:51:18	t	main-card-name-image
111	main-card-offers-image-zzfxy8ic.png	7	2019-12-09 10:51:18	2019-12-09 10:51:18	t	main-card-offers-image
112	main-card-floor-image-05nxos3j.png	8	2019-12-09 10:52:25	2019-12-09 10:52:25	t	main-card-floor-image
113	main-card-offers-image-px1m7x6m.png	8	2019-12-09 10:52:25	2019-12-09 10:52:25	t	main-card-offers-image
114	main-card-name-image-6hokucwm.png	8	2019-12-09 10:52:25	2019-12-09 10:52:25	t	main-card-name-image
115	main-card-floor-image-ldf8lun.png	9	2019-12-09 10:53:04	2019-12-09 10:53:04	t	main-card-floor-image
116	main-card-name-image-07483p6q.png	9	2019-12-09 10:53:04	2019-12-09 10:53:04	t	main-card-name-image
117	main-card-offers-image-2r0pyktr.png	9	2019-12-09 10:53:04	2019-12-09 10:53:04	t	main-card-offers-image
118	main-card-floor-image-aejhrz.png	10	2019-12-09 10:53:17	2019-12-09 10:53:17	t	main-card-floor-image
119	main-card-name-image-trtnmpf.png	10	2019-12-09 10:53:17	2019-12-09 10:53:17	t	main-card-name-image
120	main-card-offers-image-209k2jhe.png	10	2019-12-09 10:53:17	2019-12-09 10:53:17	t	main-card-offers-image
121	main-card-floor-image-tcuba0n6.png	11	2019-12-09 10:53:39	2019-12-09 10:53:39	t	main-card-floor-image
122	main-card-name-image-xx3g1jce.png	11	2019-12-09 10:53:39	2019-12-09 10:53:39	t	main-card-name-image
123	main-card-offers-image-2rvh509h.png	11	2019-12-09 10:53:39	2019-12-09 10:53:39	t	main-card-offers-image
124	main-card-floor-image-bduumkv.png	12	2019-12-09 10:54:16	2019-12-09 10:54:16	t	main-card-floor-image
126	main-card-offers-image-3qoqn4pn.png	12	2019-12-09 10:54:16	2019-12-09 10:54:16	t	main-card-offers-image
125	main-card-name-image-ezi0fxhh.png	12	2019-12-09 10:54:16	2019-12-09 11:31:28	f	main-card-name-image
127	main-card-name-image-33h6z6ti.png	12	2019-12-09 11:31:28	2019-12-09 11:34:16	f	main-card-name-image
128	main-card-name-image-wyxtxnx.png	12	2019-12-09 11:34:16	2019-12-09 11:34:16	t	main-card-name-image
129	event-w7ww9kde.png	17	2019-12-09 12:13:09	2019-12-09 12:13:09	t	event-cover-image
130	event-4bstkffs.png	18	2019-12-09 12:13:39	2019-12-09 12:13:39	t	event-cover-image
131	event-9jbg73v.png	18	2019-12-09 12:13:39	2019-12-09 12:13:39	t	event
132	event-41g3j3d.png	19	2019-12-09 12:13:55	2019-12-09 12:13:55	t	event-cover-image
133	event-td1zhj6a.png	20	2019-12-09 12:14:23	2019-12-09 12:14:23	t	event-cover-image
134	event-rrg6o5b8.png	21	2019-12-09 12:15:08	2019-12-09 12:15:08	t	event-cover-image
135	event-pqf24mh.png	21	2019-12-09 12:15:08	2019-12-09 12:15:08	t	event
136	event-6dlgbk2p.png	21	2019-12-09 12:15:08	2019-12-09 12:15:08	t	event
137	event-c27bz9p.png	22	2019-12-09 12:15:58	2019-12-09 12:15:58	t	event-cover-image
138	event-5g3dhvjo.png	22	2019-12-09 12:15:58	2019-12-09 12:15:58	t	event
139	event-qm34y3mj.png	22	2019-12-09 12:15:58	2019-12-09 12:15:58	t	event
140	event-mbdbrerc.png	23	2019-12-09 12:16:13	2019-12-09 12:16:13	t	event-cover-image
141	event-4yna0ndi.png	23	2019-12-09 12:16:13	2019-12-09 12:16:13	t	event
142	event-65fb7elp.png	23	2019-12-09 12:16:13	2019-12-09 12:16:13	t	event
144	event-guqgta8f.png	24	2019-12-09 12:16:35	2019-12-09 12:16:35	t	event
145	event-a85vmrmc.png	24	2019-12-09 12:16:35	2019-12-09 12:16:35	t	event
146	event-ea7imz4p.png	8	2019-12-09 15:00:23	2019-12-09 15:00:23	t	event
147	event-cg8w9k05.png	8	2019-12-09 15:00:23	2019-12-09 15:00:23	t	event
149	event-gqjk41s.png	8	2019-12-09 15:00:23	2019-12-09 15:00:23	t	event
150	event-x09xp5pm.png	7	2019-12-09 15:05:24	2019-12-09 15:05:24	t	event
151	event-kq87ks2.png	7	2019-12-09 15:05:24	2019-12-09 15:05:24	t	event
152	event-suzlu57.png	7	2019-12-09 15:05:24	2019-12-09 15:05:24	t	event
153	event-xunh2n2.png	7	2019-12-09 15:05:24	2019-12-09 15:05:24	t	event
154	event-mxcrustc.png	7	2019-12-09 15:06:10	2019-12-09 15:06:10	t	event
155	event-bqx506i.png	7	2019-12-09 15:06:10	2019-12-09 15:06:10	t	event
156	event-vh6k3nbo.png	7	2019-12-09 15:06:10	2019-12-09 15:06:10	t	event
157	event-9ybl1cqg.png	7	2019-12-09 15:06:10	2019-12-09 15:06:10	t	event
143	event-yc8wzmel.png	24	2019-12-09 12:16:35	2019-12-09 15:29:51	f	event-cover-image
158	event-htvlfd09.png	24	2019-12-09 15:29:51	2019-12-09 15:29:51	t	event-cover-image
159	offer-image-lyrn3vpi.png	1	2019-12-09 17:48:31	2019-12-10 09:45:31	f	offer-image
160	offer-image-g7cvevto.png	1	2019-12-10 09:45:31	2019-12-10 09:45:31	t	offer-image
161	shoplogo-zzldr3l9.png	14	2019-12-10 14:22:38	2019-12-10 14:22:38	t	shop-logo
162	shopimage-zzldr3l9.png	14	2019-12-10 14:22:38	2019-12-10 14:22:38	t	shop-image
163	shoplogo-typvlvom.png	16	2019-12-11 11:36:03	2019-12-11 11:36:03	t	shop-logo
164	shopimage-typvlvom.png	16	2019-12-11 11:36:03	2019-12-11 11:36:03	t	shop-image
165	shoplogo-7636fn54.png	17	2019-12-11 11:40:10	2019-12-11 11:50:11	f	shop-logo
167	shoplogo-43jmlqjk.png	17	2019-12-11 11:50:11	2019-12-11 11:50:11	t	shop-logo
166	shopimage-7636fn54.png	17	2019-12-11 11:40:10	2019-12-11 11:57:53	f	shop-image
168	shopimage-801tx89d.png	17	2019-12-11 11:57:53	2019-12-11 11:57:53	t	shop-image
169	banner-es0mtmbi.png	5	2019-12-11 12:30:15	2019-12-11 12:30:15	t	banner
170	store-mb934zus.json	7	2019-12-11 13:02:58	2019-12-11 13:02:58	t	store-path
171	floor-uzyu2zv9.png	20	2019-12-11 15:42:04	2019-12-11 15:42:04	t	floor
172	store-1sw7rat.json	8	2019-12-11 16:01:28	2019-12-11 16:01:28	t	store-path
173	offer-image-95p6bctj.png	2	2019-12-12 15:59:19	2019-12-12 15:59:19	t	offer-image
174	shoplogo-983x7nst.png	18	2019-12-19 10:26:13	2019-12-19 10:26:13	t	shop-logo
175	shopimage-983x7nst.png	18	2019-12-19 10:26:13	2019-12-19 10:26:13	t	shop-image
176	offer-image-eedrszb.png	3	2019-12-19 13:48:15	2019-12-19 13:48:15	t	offer-image
177	banner-085hgi7t.png	6	2019-12-23 09:43:11	2019-12-23 09:43:11	t	banner
178	offer-image-9hx1vjx.png	4	2019-12-23 16:34:35	2019-12-23 16:34:35	t	offer-image
148	event-p6seukzf.png	8	2019-12-09 15:00:23	2019-12-31 12:59:05	f	event
14	shopimage-essjf76.jpg	15	2019-11-28 17:49:33	2019-11-29 11:22:41	t	shop-image
\.


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 178, true);


--
-- Data for Name: main_card; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.main_card (main_card_id, main_card_name, created_at, updated_at, status, mall_id) FROM stdin;
3	forum main card	2019-11-29 17:23:42	2019-11-29 17:23:42	t	1
1	forum main card	2019-11-29 17:22:46	2019-11-29 17:22:46	f	1
2	forum main card	2019-11-29 17:23:04	2019-11-29 17:23:04	f	1
4	forum main card	2019-11-29 17:26:52	2019-11-29 17:26:52	t	1
5	forum main card	2019-11-29 17:28:08	2019-11-29 17:28:08	t	1
6	city-center-main-cards	2019-12-09 10:50:01	2019-12-09 10:50:01	t	2
7	city-center-main-cards	2019-12-09 10:51:18	2019-12-09 10:51:18	t	2
9	city-center-main-cards	2019-12-09 10:53:04	2019-12-09 10:53:04	t	2
10	city-center-main-cards	2019-12-09 10:53:17	2019-12-09 10:53:17	t	2
11	city-center-main-cards	2019-12-09 10:53:39	2019-12-09 10:53:39	t	2
12	city-center-main-cards	2019-12-09 10:54:15	2019-12-30 17:45:51	t	7
8	city-center-main-cards	2019-12-09 10:52:25	2019-12-30 18:11:26	f	2
\.


--
-- Name: main_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.main_card_id_seq', 12, true);


--
-- Data for Name: mall; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mall (mall_id, mall_name, location, created_at, updated_at, status) FROM stdin;
2	city-centre	mangalore	2019-11-25 17:03:20	2019-11-25 17:03:20	t
3	forum-fiza-mall	bangalore	2019-12-05 15:48:54	2019-12-05 15:48:54	t
4	forum-fiza-mall	chennai	2019-12-05 15:50:27	2019-12-05 15:50:27	t
6	forum-mall-mumbai	mumbai	2019-12-06 13:08:43	2019-12-06 13:08:43	t
7	forum-mall-mumbai	mumbai	2019-12-06 13:13:04	2019-12-06 13:13:04	t
8	forum-mall-mumbai	mumbai	2019-12-06 13:13:47	2019-12-06 13:13:47	t
1	forum-fiza	mangalore	2019-11-25 16:20:56	2019-12-06 13:25:40	t
5	forum-fiza-mall	chennai	2019-12-05 15:51:02	2019-12-30 11:30:41	t
\.


--
-- Name: mall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mall_id_seq', 8, true);


--
-- Data for Name: mall_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mall_info (mall_info_id, helptext, phone, email, created_at, updated_at, mall_id, status) FROM stdin;
1	helpdesk	9876543210	helpdesk@gmail.com	2019-12-09 16:11:08	2019-12-09 16:11:08	1	t
3	child-safety	9876543210	helpdesk@gmail.com	2019-12-09 16:29:10	2019-12-09 16:29:10	1	t
2	fire-help-desk	8798899785	fire@forum.com	2019-12-09 16:26:40	2019-12-09 16:54:45	2	f
5	helpdesk	9876543210	helpdesk@gmail.com	2019-12-30 14:43:19	2019-12-30 14:43:19	7	t
4	fire-help-desk	8798899785	fire@forum.com	2019-12-30 14:42:31	2019-12-30 15:09:35	7	t
\.


--
-- Name: mall_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mall_info_id_seq', 5, true);


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (offer_id, offer_name, description, validity, shop_id, status, created_at, updated_at) FROM stdin;
2	flat80	flat 50 percent offer 	2020-01-30 23:00:00	13	t	2019-12-12 15:59:19	2019-12-12 15:59:19
3	flat50	flat 50 percent offer 	2020-01-30 23:00:00	18	t	2019-12-19 13:48:15	2019-12-19 13:48:15
4	flat50	flat 50 percent offer 	2020-01-30 23:00:00	13	t	2019-12-23 16:34:35	2019-12-23 16:34:35
1	christmas dhamaka	christmas offers	2020-02-16 12:00:00	13	f	2019-12-09 17:48:31	2019-12-31 13:21:19
5	flat50	flat 50 percent offer 	2020-01-30 23:00:00	13	t	2020-01-02 17:15:50	2020-01-02 17:15:50
6	flat50	flat 50 percent offer 	2020-01-30 23:00:00	14	t	2020-01-02 17:16:45	2020-01-02 17:16:45
\.


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 6, true);


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (role_id, role_name, status, created_at, updated_at) FROM stdin;
2	admin	t	2019-11-25 15:08:14	2019-11-25 15:08:14
1	superadmin	t	2019-11-25 15:08:14	2019-12-06 13:27:15
3	staff	f	2019-12-06 13:32:49	2019-12-30 15:34:24
4	staff	t	2019-12-30 15:34:24	2019-12-30 15:34:24
\.


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 4, true);


--
-- Data for Name: shops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shops (shop_id, shop_name, contact_number, created_at, updated_at, status) FROM stdin;
18	bata	456585254	2019-12-19 10:26:13	2019-12-19 10:26:13	t
17	bata	7898654532	2019-12-11 11:40:10	2019-12-31 13:51:18	t
13	puma	9989898899	2019-12-06 18:09:39	2019-12-06 18:09:39	t
14	woodlands	9989898899	2019-12-10 14:22:38	2019-12-10 14:22:38	t
16	reliance digital	4565852545	2019-12-11 11:36:03	2019-12-11 11:36:03	t
15	arrow	4565852545	2019-12-11 11:34:57	2019-12-11 11:34:57	t
\.


--
-- Name: shops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shops_id_seq', 18, true);


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store (store_id, store_number, floor_id, status, created_at, updated_at) FROM stdin;
6	202	19	t	2019-12-07 12:17:41	2019-12-07 12:17:41
5	201	19	t	2019-12-07 12:16:49	2019-12-07 12:16:49
7	203	19	t	2019-12-11 13:02:58	2019-12-11 13:02:58
8	204	20	t	2019-12-11 16:01:28	2019-12-11 16:01:28
4	101	18	t	2019-11-28 12:35:00	2019-12-31 13:51:18
\.


--
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.store_id_seq', 8, true);


--
-- Name: tbl_floor_shops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_floor_shops_id_seq', 73, true);


--
-- Data for Name: tbl_screen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_screen (screen_id, device_unique_id, mall_id, status, created_at, updated_at, device_name) FROM stdin;
1	1	1	t	2019-12-28 10:26:16	2019-12-28 10:26:16	display1
13	5	5	t	2019-12-30 15:46:19	2019-12-30 15:46:19	display5
5	4	5	f	2019-12-28 10:45:23	2019-12-28 10:45:23	display4
3	2	1	t	2019-12-28 10:26:59	2019-12-28 10:26:59	display2
4	3	2	f	2019-12-28 10:45:13	2019-12-28 10:45:13	display3
14	6	5	t	2020-01-03 16:48:10	2020-01-03 16:48:10	device6
\.


--
-- Name: tbl_screen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_screen_id_seq', 14, true);


--
-- Data for Name: tbl_shop_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_shop_category (id, shop_id, category_id, status, created_at, updated_at) FROM stdin;
28	7	1	f	2019-12-11 12:03:53	2019-12-11 12:15:00
1	4	1	t	2019-11-28 17:49:33	2019-11-28 17:49:33
29	7	3	f	2019-12-11 12:03:53	2019-12-11 12:15:00
30	7	1	f	2019-12-11 12:06:49	2019-12-11 12:15:00
31	7	3	f	2019-12-11 12:06:49	2019-12-11 12:15:00
32	7	1	f	2019-12-11 12:07:01	2019-12-11 12:15:00
33	7	3	f	2019-12-11 12:07:01	2019-12-11 12:15:00
34	7	1	f	2019-12-11 12:07:09	2019-12-11 12:15:00
35	7	3	f	2019-12-11 12:07:09	2019-12-11 12:15:00
36	7	1	f	2019-12-11 12:08:00	2019-12-11 12:15:00
37	7	3	f	2019-12-11 12:08:00	2019-12-11 12:15:00
38	7	1	f	2019-12-11 12:13:50	2019-12-11 12:15:00
39	7	3	f	2019-12-11 12:13:50	2019-12-11 12:15:00
40	7	1	t	2019-12-11 12:15:00	2019-12-11 12:15:00
41	7	3	t	2019-12-11 12:15:00	2019-12-11 12:15:00
27	17	3	f	2019-12-11 11:40:10	2019-12-31 13:51:18
42	17	1	f	2019-12-11 12:16:45	2019-12-31 13:51:18
43	17	3	f	2019-12-11 12:16:45	2019-12-31 13:51:18
2	5	1	f	2019-11-28 17:49:33	2019-11-29 15:28:23
3	5	2	f	2019-11-28 17:49:33	2019-11-29 15:28:23
4	5	3	f	2019-11-28 17:49:33	2019-11-29 15:28:23
5	5	8	f	2019-11-29 15:25:44	2019-11-29 15:28:23
6	5	7	f	2019-11-29 15:25:44	2019-11-29 15:28:23
7	5	9	f	2019-11-29 15:25:44	2019-11-29 15:28:23
8	5	8	f	2019-11-29 15:26:23	2019-11-29 15:28:23
9	5	7	f	2019-11-29 15:26:23	2019-11-29 15:28:23
10	5	9	f	2019-11-29 15:26:23	2019-11-29 15:28:23
11	5	8	f	2019-11-29 15:27:45	2019-11-29 15:28:23
12	5	7	f	2019-11-29 15:27:45	2019-11-29 15:28:23
13	5	9	f	2019-11-29 15:27:45	2019-11-29 15:28:23
14	5	8	t	2019-11-29 15:28:23	2019-11-29 15:28:23
15	5	7	t	2019-11-29 15:28:23	2019-11-29 15:28:23
16	5	9	t	2019-11-29 15:28:23	2019-11-29 15:28:23
17	6	1	t	2019-12-06 17:49:08	2019-12-06 17:49:08
18	6	2	t	2019-12-06 17:49:08	2019-12-06 17:49:08
19	6	3	t	2019-12-06 17:49:08	2019-12-06 17:49:08
20	12	1	t	2019-12-06 18:08:47	2019-12-06 18:08:47
21	12	2	t	2019-12-06 18:08:47	2019-12-06 18:08:47
22	13	1	t	2019-12-06 18:09:39	2019-12-06 18:09:39
24	14	1	t	2019-12-10 14:22:38	2019-12-10 14:22:38
25	14	2	t	2019-12-10 14:22:38	2019-12-10 14:22:38
44	17	1	f	2019-12-11 12:17:22	2019-12-31 13:51:18
23	13	2	t	2019-12-06 18:09:39	2019-12-06 18:09:39
26	16	3	t	2019-12-11 11:36:03	2019-12-11 11:36:03
45	17	3	f	2019-12-11 12:17:22	2019-12-31 13:51:18
46	17	1	f	2019-12-11 12:17:41	2019-12-31 13:51:18
47	17	3	f	2019-12-11 12:17:41	2019-12-31 13:51:18
48	17	1	f	2019-12-11 12:18:00	2019-12-31 13:51:18
49	17	3	f	2019-12-11 12:18:00	2019-12-31 13:51:18
50	17	1	f	2019-12-11 12:19:17	2019-12-31 13:51:18
51	17	3	f	2019-12-11 12:19:17	2019-12-31 13:51:18
52	17	1	f	2019-12-11 12:19:33	2019-12-31 13:51:18
53	17	3	f	2019-12-11 12:19:33	2019-12-31 13:51:18
54	17	1	f	2019-12-11 12:21:08	2019-12-31 13:51:18
55	17	3	f	2019-12-11 12:21:08	2019-12-31 13:51:18
56	17	1	f	2019-12-11 12:21:49	2019-12-31 13:51:18
96	17	1	f	2019-12-11 12:45:25	2019-12-31 13:51:18
97	17	3	f	2019-12-11 12:45:25	2019-12-31 13:51:18
98	17	1	f	2019-12-11 12:45:46	2019-12-31 13:51:18
99	17	3	f	2019-12-11 12:45:46	2019-12-31 13:51:18
102	17	1	f	2019-12-11 12:46:32	2019-12-31 13:51:18
103	17	3	f	2019-12-11 12:46:32	2019-12-31 13:51:18
110	18	3	t	2019-12-19 10:26:13	2019-12-19 10:26:13
104	17	1	f	2019-12-11 12:47:00	2019-12-31 13:51:18
105	17	3	f	2019-12-11 12:47:00	2019-12-31 13:51:18
108	17	1	f	2019-12-11 12:48:06	2019-12-31 13:51:18
109	17	3	f	2019-12-11 12:48:06	2019-12-31 13:51:18
111	17	1	f	2019-12-31 13:47:41	2019-12-31 13:51:18
112	17	3	f	2019-12-31 13:47:41	2019-12-31 13:51:18
115	17	1	t	2019-12-31 13:51:18	2019-12-31 13:51:18
116	17	3	t	2019-12-31 13:51:18	2019-12-31 13:51:18
57	17	3	f	2019-12-11 12:21:49	2019-12-31 13:51:18
58	17	1	f	2019-12-11 12:22:13	2019-12-31 13:51:18
74	17	1	f	2019-12-11 12:27:51	2019-12-31 13:51:18
75	17	3	f	2019-12-11 12:27:51	2019-12-31 13:51:18
78	17	1	f	2019-12-11 12:29:11	2019-12-31 13:51:18
79	17	3	f	2019-12-11 12:29:11	2019-12-31 13:51:18
86	17	1	f	2019-12-11 12:42:25	2019-12-31 13:51:18
87	17	3	f	2019-12-11 12:42:25	2019-12-31 13:51:18
88	17	1	f	2019-12-11 12:43:03	2019-12-31 13:51:18
89	17	3	f	2019-12-11 12:43:03	2019-12-31 13:51:18
82	17	1	f	2019-12-11 12:35:57	2019-12-31 13:51:18
83	17	3	f	2019-12-11 12:35:57	2019-12-31 13:51:18
59	17	3	f	2019-12-11 12:22:13	2019-12-31 13:51:18
60	17	1	f	2019-12-11 12:22:36	2019-12-31 13:51:18
61	17	3	f	2019-12-11 12:22:36	2019-12-31 13:51:18
62	17	1	f	2019-12-11 12:24:04	2019-12-31 13:51:18
63	17	3	f	2019-12-11 12:24:04	2019-12-31 13:51:18
64	17	1	f	2019-12-11 12:24:43	2019-12-31 13:51:18
65	17	3	f	2019-12-11 12:24:43	2019-12-31 13:51:18
66	17	1	f	2019-12-11 12:25:10	2019-12-31 13:51:18
67	17	3	f	2019-12-11 12:25:10	2019-12-31 13:51:18
68	17	1	f	2019-12-11 12:25:54	2019-12-31 13:51:18
69	17	3	f	2019-12-11 12:25:54	2019-12-31 13:51:18
70	17	1	f	2019-12-11 12:27:30	2019-12-31 13:51:18
71	17	3	f	2019-12-11 12:27:30	2019-12-31 13:51:18
72	17	1	f	2019-12-11 12:27:38	2019-12-31 13:51:18
106	17	1	f	2019-12-11 12:47:31	2019-12-31 13:51:18
107	17	3	f	2019-12-11 12:47:31	2019-12-31 13:51:18
113	17	1	f	2019-12-31 13:49:30	2019-12-31 13:51:18
114	17	3	f	2019-12-31 13:49:30	2019-12-31 13:51:18
73	17	3	f	2019-12-11 12:27:38	2019-12-31 13:51:18
76	17	1	f	2019-12-11 12:28:39	2019-12-31 13:51:18
77	17	3	f	2019-12-11 12:28:39	2019-12-31 13:51:18
80	17	1	f	2019-12-11 12:29:26	2019-12-31 13:51:18
81	17	3	f	2019-12-11 12:29:26	2019-12-31 13:51:18
84	17	1	f	2019-12-11 12:41:41	2019-12-31 13:51:18
85	17	3	f	2019-12-11 12:41:41	2019-12-31 13:51:18
90	17	1	f	2019-12-11 12:43:38	2019-12-31 13:51:18
91	17	3	f	2019-12-11 12:43:38	2019-12-31 13:51:18
92	17	1	f	2019-12-11 12:44:18	2019-12-31 13:51:18
93	17	3	f	2019-12-11 12:44:18	2019-12-31 13:51:18
94	17	1	f	2019-12-11 12:44:32	2019-12-31 13:51:18
95	17	3	f	2019-12-11 12:44:32	2019-12-31 13:51:18
101	17	3	f	2019-12-11 12:46:00	2019-12-31 13:51:18
100	15	2	t	2019-12-11 12:46:00	2019-12-31 13:51:18
\.


--
-- Name: tbl_shop_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_shop_category_id_seq', 116, true);


--
-- Data for Name: tbl_store_shop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_store_shop (id, store_id, shop_id, status, created_at, updated_at) FROM stdin;
23	6	14	f	2019-12-10 14:22:38	2019-12-10 14:22:38
20	8	13	f	2019-12-06 18:09:39	2019-12-06 18:09:39
24	4	16	f	2019-12-11 11:36:03	2019-12-11 11:36:03
28	4	7	f	2019-12-11 12:03:53	2019-12-11 12:15:00
29	4	7	f	2019-12-11 12:06:49	2019-12-11 12:15:00
30	4	7	f	2019-12-11 12:07:01	2019-12-11 12:15:00
31	4	7	f	2019-12-11 12:07:09	2019-12-11 12:15:00
32	4	7	f	2019-12-11 12:08:00	2019-12-11 12:15:00
33	4	7	f	2019-12-11 12:13:50	2019-12-11 12:15:00
69	4	18	f	2019-12-19 10:26:13	2019-12-19 10:26:13
34	4	7	f	2019-12-11 12:15:00	2019-12-11 12:15:00
21	4	14	f	2019-12-10 14:22:38	2019-12-10 14:22:38
73	4	14	t	2019-12-31 13:51:18	2019-12-31 13:51:18
25	6	14	t	2019-12-11 11:36:03	2019-12-11 11:36:03
22	8	16	t	2019-12-10 14:22:38	2019-12-10 14:22:38
70	8	18	f	2019-12-19 10:26:13	2019-12-19 10:26:13
26	4	17	f	2019-12-11 11:40:10	2019-12-31 13:51:18
27	6	17	f	2019-12-11 11:40:10	2019-12-31 13:51:18
35	4	17	f	2019-12-11 12:16:45	2019-12-31 13:51:18
36	4	17	f	2019-12-11 12:17:22	2019-12-31 13:51:18
37	4	17	f	2019-12-11 12:17:41	2019-12-31 13:51:18
38	4	17	f	2019-12-11 12:18:00	2019-12-31 13:51:18
39	4	17	f	2019-12-11 12:19:17	2019-12-31 13:51:18
40	4	17	f	2019-12-11 12:19:33	2019-12-31 13:51:18
41	4	17	f	2019-12-11 12:21:08	2019-12-31 13:51:18
42	4	17	f	2019-12-11 12:21:49	2019-12-31 13:51:18
43	4	17	f	2019-12-11 12:22:13	2019-12-31 13:51:18
44	4	17	f	2019-12-11 12:22:36	2019-12-31 13:51:18
45	4	17	f	2019-12-11 12:24:04	2019-12-31 13:51:18
46	4	17	f	2019-12-11 12:24:43	2019-12-31 13:51:18
47	4	17	f	2019-12-11 12:25:10	2019-12-31 13:51:18
62	4	17	f	2019-12-11 12:45:25	2019-12-31 13:51:18
64	4	17	f	2019-12-11 12:46:00	2019-12-31 13:51:18
68	6	17	f	2019-12-11 12:48:06	2019-12-31 13:51:18
66	4	17	f	2019-12-11 12:47:00	2019-12-31 13:51:18
71	4	17	f	2019-12-31 13:47:41	2019-12-31 13:51:18
72	5	13	t	2019-12-31 13:49:30	2019-12-31 13:51:18
67	7	15	t	2019-12-11 12:47:31	2019-12-31 13:51:18
48	4	17	f	2019-12-11 12:25:54	2019-12-31 13:51:18
49	4	17	f	2019-12-11 12:27:30	2019-12-31 13:51:18
50	4	17	f	2019-12-11 12:27:38	2019-12-31 13:51:18
51	4	17	f	2019-12-11 12:27:51	2019-12-31 13:51:18
54	4	17	f	2019-12-11 12:29:26	2019-12-31 13:51:18
55	4	17	f	2019-12-11 12:35:57	2019-12-31 13:51:18
56	4	17	f	2019-12-11 12:41:41	2019-12-31 13:51:18
57	4	17	f	2019-12-11 12:42:25	2019-12-31 13:51:18
58	4	17	f	2019-12-11 12:43:03	2019-12-31 13:51:18
59	4	17	f	2019-12-11 12:43:38	2019-12-31 13:51:18
60	4	17	f	2019-12-11 12:44:18	2019-12-31 13:51:18
61	4	17	f	2019-12-11 12:44:32	2019-12-31 13:51:18
63	4	17	f	2019-12-11 12:45:46	2019-12-31 13:51:18
53	8	17	f	2019-12-11 12:29:11	2019-12-31 13:51:18
65	8	17	f	2019-12-11 12:46:32	2019-12-31 13:51:18
52	8	17	f	2019-12-11 12:28:39	2019-12-31 13:51:18
\.


--
-- Data for Name: tbl_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_user (user_id, name, password, mall_id, created_at, updated_at, status, email, phone, role_id) FROM stdin;
7	kiran	919329	2	2019-12-06 11:32:10	2019-12-30 10:48:39	t	kiranbhatkv@gmail.com	8765486985	1
8	sharath	667834	2	2019-12-06 12:14:56	2019-12-30 13:09:28	t	sharathacharya723@gmail.com	9878987898	2
9	deepak	312400	2	2019-12-30 12:50:59	2019-12-30 13:09:44	f	deepakpai@gmail.com	4561327895	1
5	vaishak	750224	1	2019-12-06 10:47:32	2019-12-31 13:51:18	t	vaishakshettykudlu@gmail.com	8765484545	3
\.


--
-- Name: tbl_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_user_id_seq', 9, true);


--
-- Name: amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_pkey PRIMARY KEY (amenities_id);


--
-- Name: banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (banner_id);


--
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: floor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT floor_pkey PRIMARY KEY (floor_id);


--
-- Name: image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (image_id);


--
-- Name: main_card_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_card
    ADD CONSTRAINT main_card_pkey PRIMARY KEY (main_card_id);


--
-- Name: mall_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mall_info
    ADD CONSTRAINT mall_info_pkey PRIMARY KEY (mall_info_id);


--
-- Name: mall_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mall
    ADD CONSTRAINT mall_pkey PRIMARY KEY (mall_id);


--
-- Name: offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (offer_id);


--
-- Name: role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: shops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT shops_pkey PRIMARY KEY (shop_id);


--
-- Name: store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (store_id);


--
-- Name: tbl_floor_shops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_store_shop
    ADD CONSTRAINT tbl_floor_shops_pkey PRIMARY KEY (id);


--
-- Name: tbl_screen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_screen
    ADD CONSTRAINT tbl_screen_pkey PRIMARY KEY (screen_id);


--
-- Name: tbl_screen_screen_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_screen
    ADD CONSTRAINT tbl_screen_screen_id_key UNIQUE (device_unique_id);


--
-- Name: tbl_shop_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_shop_category
    ADD CONSTRAINT tbl_shop_category_pkey PRIMARY KEY (id);


--
-- Name: tbl_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_email_key UNIQUE (email);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

