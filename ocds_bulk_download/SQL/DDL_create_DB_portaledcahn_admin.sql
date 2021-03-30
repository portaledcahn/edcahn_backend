-- DROP SCHEMA portaledcahn_admin;

-- DROP TABLE portaledcahn_admin.descargas;

CREATE SCHEMA public AUTHORIZATION postgres;

CREATE TABLE public.descargas (
	id uuid NOT NULL,
	file jsonb NOT NULL,
	createddate timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	createdby varchar(100) NOT NULL,
	modifieddate timestamptz NULL,
	modifiedby varchar(100) NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT "primaryKey" PRIMARY KEY (id)
);