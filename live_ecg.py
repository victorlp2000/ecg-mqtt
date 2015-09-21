#
#	this script subscribe to MQTT server, receive messages and then
#	put data into MySQL/ECG/live_ecg
#
#   need to install MySQLdb:
#       $ sudo apt-get install python-mysqldb
#
import MySQLdb as mysql

class ecg_mysql:

    def __init__(self):
        self.cnx = None
        self.cursor = None
        self.sql_insert_row = ()
        self.sql_delete_rows = ()
        try:
            self.cnx = mysql.connect('localhost', 'vliu', 'password', 'ECG')
        except mysql.Error as err:
            print(err)
        else:
            self.cursor = self.cnx.cursor()
            self.sql_insert_row = ("INSERT INTO live_ecg"
                    "(client_id, start_ecg, data_str) "
                    "VALUES (%s, %s, %s)")
            self.sql_delete_rows = ("DELETE FROM live_ecg WHERE client_id = %s AND start_ecg < %s")

    def insert_row(self, values):
        if self.cursor is not None:
            try:
                self.cursor.execute(self.sql_insert_row, values)
                self.cnx.commit()
            except mysql.Error as err:
                print(err)

    def delete_rows(self, values):
        if self.cursor is not None:
            try:
                self.cursor.execute(self.sql_delete_rows, values)
                self.cnx.commit()
            except mysql.Error as err:
                print(err)

    def close(self):
        if self.cursor is not None:
            self.cursor.close()
            print('cursor closed');
        if self.cnx is not None:
            self.cnx.close()
            print('connection to db closed')

if __name__ == "__main__":
    db = ecg_mysql()
    values = ("id-str", 1234567890123, "string string")
    db.insert_row(values);
    db.close()
