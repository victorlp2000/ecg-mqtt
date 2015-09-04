from elasticsearch import Elasticsearch
import pprint

es = Elasticsearch()
pp = pprint.PrettyPrinter(indent=2)

res = es.search(index="ecg", body={"query": {"match_all": {}}})
pp.pprint(res)

print "count: ", es.count(index="ecg", doc_type="d:b448b82707")
#res = es.delete_by_query(index="ecg", doc_type="d:b448b82707", body={"query": {
#    "range": {"time": {"lt": "2015-09-02 21:31:00.045"}
#    }}})

print "count: ", es.count(index="ecg", doc_type="d:b448b82707")
#pp.pprint(res)
'''
DELETE /logs/event/_query
{
  "query": {
    "range": {
      "@timestamp": { 
        "lt": "now-90d"
      }
    }
  }
}
'''
