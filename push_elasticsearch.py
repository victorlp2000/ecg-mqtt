#!/usr/bin/env python
# encoding: utf-8

'''
    Created Sep. 1, 2015
    By Victor Weiping Liu
'''
import sys
from elasticsearch import Elasticsearch
from datetime import datetime

class MyElasticsearch:
    def __init__(self):
        self.es = Elasticsearch()
        self.offset = 5
        self.doc_index = "ecg"

    def getTimeStr(self, t):
        return datetime.fromtimestamp(int(t/1000)).strftime('%Y-%m-%d %H:%M:%S.') + str(int(t))[-3:]

    #
    # push data into elasticsearch
    #
    def push(self, data):
        if "time_ecg" not in data:
            print "wrong ecg data", data
            return
        time_ecg = float(data["time_ecg"])
        ecg = data["ecg"].split(",")
        doc_type = data["client_id"]
        # delete 5 seconds older data
        oldTime = self.getTimeStr(time_ecg - 5000)
        self.es.delete_by_query(index=self.doc_index, doc_type=doc_type, body={
            "query": {
                "range": {
                    "time": {"lt": oldTime}
                }
            }
        })
        
        for item in ecg:
            doc = {}
            # convert ecg_time into readable format: "yyyy-mm-dd HH:MM:SS.sssZ"
            doc["time"] = self.getTimeStr(time_ecg)
            time_ecg += 8.4
            # elasticsearch does not acept negtive item,
            # add offset to become positive
            doc["ecg"] = int(item) + self.offset
            print doc
            print self.es.index(index=self.doc_index, doc_type=doc_type, id=int(time_ecg), body=doc)


