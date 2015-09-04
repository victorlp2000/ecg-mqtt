curl -XDELETE http://localhost:9200/_all
curl -XPUT http://localhost:9200/ecg -d '
{
    "mappings": {
        "_default_": {
            "properties": {
                "time": {
                    "type":"date", "format":"yyyy-MM-dd HH:mm:ss.SSS"
                }
            }
        }
    }
}'
