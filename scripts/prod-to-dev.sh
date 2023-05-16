source .env
mongodump --uri $DATABASE_DUMP_URL --db production --out dbbackup
mongorestore --uri $DATABASE_DUMP_URL --db development ./dbbackup/production/ --drop
rm -r dbbackup