source .env
mongodump --uri $DATABASE_DUMP_URL --db development --out dbbackup
mongorestore --uri $DATABASE_DUMP_URL --db production ./dbbackup/development/ --drop
rm -r dbbackup