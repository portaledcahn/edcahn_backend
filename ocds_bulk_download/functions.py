import psycopg2, datetime, sys, os.path

con = None
carpetaArchivos = "archivos_estaticos"
nombreArchivo = "releases.csv"

select = """
    select
        r.release_id,
        r.ocid,
        d.hash_md5,
        r.package_data_id,
        d."data" as "release",
        pd."data" as "package" 
    from release r
        inner join data d on r.data_id = d.id 
        inner join package_data pd on r.package_data_id = pd.id
    order by
        d.id
    limit 10
"""

startDate = datetime.datetime.now()
print(datetime.datetime.now())

try:
    raiz = os.path.dirname(os.path.realpath(__file__))
    archivoSalida = os.path.join(raiz, carpetaArchivos, nombreArchivo)
    # archivoSalida1 = "{0}\\{1}/{2}".format(raiz, carpetaArchivos, nombreArchivo)
    query = "copy ({0}) To STDOUT With CSV DELIMITER '|';".format(select)

    print(archivoSalida)

    con = psycopg2.connect(
        host='192.168.1.50', 
        database='postgres', 
        user='postgres', 
        password='123456'
    )

    cur = con.cursor()

    with open(archivoSalida, 'w') as f_output:
        cur.copy_expert(query, f_output)

    f_output.close()

except psycopg2.DatabaseError as e:
    print(f'Error {e}')
    sys.exit(1)

except IOError as e:
    print(f'Error {e}')
    sys.exit(1)

finally:
    if con:
        con.close()

endDate = datetime.datetime.now()
print(datetime.datetime.now())

# elapsedTime = endDate-startDate
minutes = ((endDate-startDate).seconds) / 60

print("Tiempo transcurrido: " + str(minutes) + " minutos")