# Persistr CLI
CLI for interacting with Persistr

Available types of connection strings are:
memory - in-memory database
fs - file-system database in default location (~/.persistr.db)
fs:/path/to/db - file-system database in custom location
mysql://user@hostname:port/database - standard MySQL connection string
postgresql://user@hostname:port/database - standard PostgreSQL connection string
postgres://user@hostname:port/database - standard PostgreSQL connection string
sqlite:/path/to/db - standard SQLite3 connection string
mssql - Microsoft SQL Server
oracledb - Oracle SQL
