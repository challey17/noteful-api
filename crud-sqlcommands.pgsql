UPDATE "noteful_notes" SET modified='now()' WHERE id=3;

SELECT * FROM "noteful_notes" LIMIT 1000;

SELECT * FROM "noteful_folders";

--INSERT INTO "noteful_notes"(note_name, folderId, content) VALUES ('test note', 3, 'test content');