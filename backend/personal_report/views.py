from django.http import HttpResponse
from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
import pandas as pd
import os 
import requests

# Works but has ADs
import aspose.words as aw

# no
import win32com.client
import pypandoc

# Not working at all
from htmldocx import HtmlToDocx




def generate_data():
    graph_1 = pd.read_csv('csv/HBD.Cohort_001_Graph1.csv')
    
    data = pd.DataFrame(graph_1)
    result = data.to_json(orient="split")
    parsed = json.loads(result)
    data = json.dumps(parsed, indent=4)  
    return data
  
  
def report(request):
    
# without charts
#     url = 'http://export.highcharts.com/'
#     headers = {
#     "Accept": "application/json",
#     # "Content-Type": "multipart/form-data",
#   }
    
#     chart_api = {
#         "options": {
#             "chart": {
#                     "type": "bar"
#                 },
#                 "title": {
#                     "text": "Fruit Consumption"
#                 },
#                 "xAxis": {
#                     "categories": ["Apples", "Bananas", "Oranges"]
#                 },
#                 "yAxis": {
#                     "title": {
#                         "text": "Fruit eaten"
#                     }
#                 },
#                 "series": [{
#                     "name": "Jane",
#                     "data": [1, 0, 4]
#                 }, {
#                     "name": "John",
#                     "data": [5, 7, 3]
#                 }]
#             },
        
#         "filename": "test.png",
#         "type": "image/png"
#     #   'async': True
#     }
    
#     r = requests.post(url, data=chart_api, headers=headers)

#     file = open("sample_image.png", "wb")
#     file.write(r.content)
#     file.close()
#     print(r.__dict__)
    
    
    
    #YES Works but has ADs
    # doc = aw.Document('csv\Highcharts.html')
    # doc.save("html-to-word.docx")
    
    
    #YES creates file without charts
    word = win32com.client.Dispatch("Word.Application")
    # in_file  = os.path.abspath(r'csv/Highcharts.html')
    
    in_file = requests.get('http://127.0.0.1:4200/')
    in_name  = in_file.text
    out_file = os.path.abspath("%s123.doc" % in_name)
    
    doc = word.Documents.Add(in_file)
    word.Selection.WholeStory()
    word.Selection.Copy()
    doc.Close()
    
    doc = word.Documents.Add()
    word.Selection.Paste()
    doc.SaveAs(out_file, FileFormat=0)
    doc.Close()

    word.Quit()
    
    
    
    #NO decode error
    # new_parser =
    # HtmlToDocx()
    # new_parser.parse_html_file('csv\Highcharts.html', 'Highcharts-out')
    
    
    
    #NO VEERY BED creates file without charts
    # import pypandoc
    # pypandoc.download_pandoc()
    # output = pypandoc.convert_file('csv\Highcharts.html', 'docx', outputfile="somefile.docx", extra_args=['-RTS'])
    # assert output == ""
    
    
    return HttpResponse()
  
  
