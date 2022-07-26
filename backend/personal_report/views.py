import time
import json
import logging
from functools import wraps
from django.shortcuts import render

# from etc.config.config_map import template_conf, rpt_conf
from .docx_export import ReportConfig, GenerateReportingData

# https://highchart.azurewebsites.net/docx

logger = logging.getLogger(__name__)

    
def execution_speed(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        start = time.time()
        func(request)
        end = time.time()
        print(f'execution_speed is {end-start}')
        return render(request, 'demo.html', context={'time': end-start})
    return wrapper


@execution_speed
def python_docs(request): 
         
    general_conf = {
        # general settings (which can be defined directly in frontend)
        'data_type': 'db',                      # options: db, exel, json
        'data_strategy': 'personal_report',     # options: cohort_report, personal_report, whatever report
        'chart_type': 'highchart',              # options: highchart, bokeh, null
        'chart_output': 'img',                  # img by default, (json in case of web representation)
        
        'lookup_values': {'cohort': 'Future Fibres.Cohort_002', 'learner': 'Diana'},   # (optional) which is **kwags (can be multiple lookup values and perfomance depends on <data_strategy> class)
        'chart_config_id': 1,                   # which can easely be db object
        'template': 'PersonalReportTemplate_V1' # can be id as well, for now i use unic name
    }
    
    conf = ReportConfig(general_conf)
    
    
    # Generate data for Report. Takes strategy and lookup value/s
    data = GenerateReportingData().get_initial_data(conf.rpt_data, **conf.lookup_values)
    print('Initial data for Report:', json.dumps(data, indent=4), '\n')
    
    # # Generate charts settings
    # chart_settings = conf.rpt_chart_type.prepare_charts(data)
    # print('Chart settings:', json.dumps(chart_settings, indent=4), '\n')
    
    # # Generate charts
    # chart_output = conf.rpt_chart_output.generate_charts(chart_settings)  # always returns dict with path to chart (img or json)
    # print('Chart output:', json.dumps(chart_output, indent=4), '\n')
        
    
    
    
    # docx = DocxExport('hc_gbs1_config', 'etc/config')
    
    # cohort = 'Future Fibres.Cohort_002'
    
    # data = get_learenr_all(cohort)
    
    # for i in range(len(data[2])-28):
    #     parent_data = {
    #         'id': data[1][i],
    #         'name': data[1][i]
    #     }
    #     child_data = {
    #         'id': data[2][i],
    #         'name': data[3][i]
    #     }
    #     docx.generate_charts(parent_data, child_data)
    #     docx.generate_content(parent_data, child_data)
    #     docx.create_docx()
        
   
    
