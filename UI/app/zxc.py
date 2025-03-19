import pymysql

timeout = 10
connection = pymysql.connect(
    charset="utf8mb4",
    connect_timeout=timeout,
    cursorclass=pymysql.cursors.DictCursor,
    db="defaultdb",
    host="nagamed-database-kiwikun0-8384.e.aivencloud.com",
    password="AVNS_KtzNoq33R63CEyDpgv8",
    read_timeout=timeout,
    port=17697,
    user="avnadmin",
    write_timeout=timeout,
)

try:
    cursor = connection.cursor()
    
    # List all databases
    cursor.execute("SHOW DATABASES;")
    databases = cursor.fetchall()
    
    print("Databases:")
    for db in databases:
        print(db['Database']) 

finally:
    connection.close()
