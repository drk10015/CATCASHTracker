/**
 * Simulated server but probably will be nothing like this and I will hate myself
 */

class Server {

    constructor(mysql) {
        this.mysql = mysql;
        this.connection = null;
        this.connect = this.connect.bind(this);
        this.close = this.close.bind(this);
    }

    connect() {
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: "root",
            password: 'lunch10015',
            database: 'ccTracker',
            port: 3306,
        })
        this.connection.on('error', (err) => {
            console.error('Connection error:', err);
        });

        this.connection.on('timeout', () => {
            console.error('Connection timeout');
        });
        this.connection.connect((err) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("connected to server!")
        })
    }

    close() {
        this.connection.end();
        console.log("closed connection to server!")
    }


}

module.exports = { Server }