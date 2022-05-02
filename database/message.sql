CREATE TABLE message(
   id  SERIAL PRIMARY KEY,
   author  TEXT       NOT NULL,
   subject  TEXT      NOT NULL,
   body     TEXT      NOT NULL,
   createdat timestamp NOT NULL DEFAULT NOW()
);