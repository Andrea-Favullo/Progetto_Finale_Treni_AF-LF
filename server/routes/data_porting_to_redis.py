import pymongo
import pandas as pd
import redis
import json
from tqdm import tqdm

r = redis.Redis(host='redis-14928.c261.us-east-1-4.ec2.cloud.redislabs.com', port=14928, password='vLSxkdwH5zB2yanVvmOr6yTBfbwI7o9U', db=0)
client = pymongo.MongoClient(
    "mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@clustersdg16.dnkc2.mongodb.net/ClusterSDG16?retryWrites=true&w=majority")
db = client.TreniDB
collection = db.dati_geospaziali
database_mongo = collection.find()
database_mongo = pd.DataFrame(list(database_mongo))
print(database_mongo)
for index, row in tqdm(database_mongo.iterrows()):
    comando = '\"id_staz\": \"{}\", \"coordinates\": [\"{}\", \"{}\"], \"id_reg\": \"{}\", \"regione\": \"{}\"'.format(
        str(row['id_staz']),
        float(row['coordinates'][0]),
        float(row['coordinates'][1]),
        int(row['id_reg']),
        str(row['regione'])
    )
    r.execute_command('JSON.SET', row['name'], '.', "{" + comando + "}")
    

reply = json.loads(r.execute_command('JSON.GET', 'Milano Lambrate'))
print(reply)