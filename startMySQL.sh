export MYSQLCS_HOST=${MYSQLCS_CONNECT_STRING%:*}
node server.js verbose=true
