#
# run this script
# from inside mysql:
#   mysql> source 'file_name'
#
# database ECG
#   CREATE USER 'vliu'@'localhost' IDENTIFIED BY 'password';
#   SET PASSWORD FOR 'vliu'@'localhost' = PASSWORD('password');
#   GRANT ALL PRIVILEGES ON ECG.* TO 'vliu'@'localhost';

SHOW DATABASES;
USE ECG;

DROP TABLE IF EXISTS live_ecg;
CREATE TABLE live_ecg (
    client_id VARCHAR(40),
    start_ecg BIGINT,
    data_str VARCHAR(4096)
);

DESCRIBE live_ecg;
SHOW GRANTS FOR 'vliu'@'localhost';


