from django.http import HttpResponse
from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
import pandas as pd
import os 


# Works but has ADs
import aspose.words as aw

# Not working
import win32com.client
from htmldocx import HtmlToDocx
import pypandoc



def generate_data():
    graph_1 = pd.read_csv('csv/HBD.Cohort_001_Graph1.csv')
    
    data = pd.DataFrame(graph_1)
    result = data.to_json(orient="split")
    parsed = json.loads(result)
    data = json.dumps(parsed, indent=4)  
    print(data)
    return data
  
  
def report(request):
    
    #YES Works but has ADs
    doc = aw.Document('csv\Highcharts.html')
    doc.save("html-to-word.docx")
    
    #NO creates file without charts
    word = win32com.client.Dispatch("Word.Application")

    in_file  = os.path.abspath(r'csv/Highcharts.html')
    in_name  = os.path.splitext(os.path.split(in_file)[1])[0]
    out_file = os.path.abspath("%s.doc" % in_name)
    
    doc = word.Documents.Add(in_file)
    word.Selection.WholeStory()
    word.Selection.Copy()
    doc.Close()
    
    doc = word.Documents.Add()
    word.Selection.Paste()
    doc.SaveAs(out_file, FileFormat=0)
    doc.Close()

    word.Quit()
    
    #decode error
    # new_parser =
    # HtmlToDocx()
    # new_parser.parse_html_file('csv\Highcharts.html', 'Highcharts-out')
    
    #VEERY BED creates file without charts
    # import pypandoc
    # pypandoc.download_pandoc()
    # output = pypandoc.convert_file('csv\Highcharts.html', 'docx', outputfile="somefile.docx", extra_args=['-RTS'])
    # assert output == ""
    
    
    return HttpResponse()
  
  
