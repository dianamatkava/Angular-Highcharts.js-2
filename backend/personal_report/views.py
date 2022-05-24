from django.http import HttpResponse
from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
import pandas as pd


# Needs another approach

def generate_data():
    graph_1 = pd.read_csv('csv/HBD.Cohort_001_Graph1.csv')
    
    data = pd.DataFrame(graph_1)
    result = data.to_json(orient="split")
    parsed = json.loads(result)
    data = json.dumps(parsed, indent=4)  
    print(data)
    return data
  

@api_view(['GET'])
def report(request):
    # value = {
    #   "id": 2,
    #   "day_added": "2022-06-12T19:30",
    #   "reminder": False,
    #   "text": "New task"
    # }
    data = generate_data()

    return HttpResponse(json.dumps(data), content_type="application/json")
  
  
