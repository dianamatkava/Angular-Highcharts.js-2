import os
import re
import time
from functools import wraps
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from docxtpl import DocxTemplate

from etc.docx_export import HighchartExportServer
from etc.config.hc_gbs_config import product

# https://highchart.azurewebsites.net/docx

def generate_path(path=None, filename=None, delimiter='_', *args):
    if filename:
        return os.path.join(settings.BASE_DIR, *path.split('/'), filename)
   

    
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
    # # Create charts
    
    LEARNER = "dianaGera"
    learner_get_data = {
        'c2_module_scores': 10,
        'chart2': 30,
        'chart3': 20,
        'chart4': 1
    }
    
    # charts = HighchartExportServer('gbs_config', 'etc/config')
    # charts.create_chart()
    
    # Replace values in Render Settings and Callback files and create new settings files for each learner
    regex = re.compile(r'\[([A-Z_]+)\]')
    file_names = dict()
    
    for chart in product['charts']:
        for chart_settings in product['charts'][chart]:
            
            template_path = product['charts'][chart][chart_settings]['template_path']
            template_name = product['charts'][chart][chart_settings]['template_name']
            
            # Defind default path to Render Settings and Callback files 
            file_names[chart_settings] = f"{generate_path(template_path, '_'.join(filter(None, [template_name])))}"
            upload_to = f"{generate_path(product['temp_files_location']['settings'], '_'.join(filter(None, [LEARNER, template_name])))}"
            
            # if file has values that need to be replaced
            if product['charts'][chart][chart_settings]:
                # and product['charts'][chart][chart_settings]['data']
                
                # call function to get data. returns dict()
                learner_data = product['charts'][chart][chart_settings]['data'](learner_get_data[chart])
                
                with open(f"{file_names[chart_settings]}") as f:
                    contents = f.read()
                
                # Find all matching regex arguments and replace it by learner_data key value pairs
                for key in re.findall(regex, contents):
                    variable_name = re.compile(r'\[{}]'.format(key))
                    contents = variable_name.sub(str(learner_data.get(key)), contents)
                
                with open(f"{upload_to}", 'w') as f:
                    f.write(contents)
                    
                    
                file_names[chart_settings] = upload_to
                
                
        cmd = f"cmd /c c: && highcharts-export-server --infile {file_names['settings_files']} --outfile {generate_path(product['temp_files_location']['images'], '-'.join(filter(None, [LEARNER, chart])))}.png"
        callback = f'--callback {file_names["callback_files"]}'
        run_cmd = os.system(' '.join([cmd, callback if file_names["callback_files"] != 'None' else '']))       
             
             
    if run_cmd:
        doc = DocxTemplate('media\\docx\\Personal Report Template - NEW FORMAT - 10M.docx')
        
        context = { 
            'TRAINEE': "Diana",
            'CLIENT_COHORT': 'ZZL Cohort 1', 
            'Product': 'Global Business Skills',
            'DATE': 'today',
            'SCORE': "100%",
            'CERT': "Excellent",
            'DESCRIPTION1': "Some custom description 1",
            'DESCRIPTION2': "Some custom description 2"
        }
        
        doc.render(context)
        for image in product['image_to_replace']:
            doc.replace_pic(product['image_to_replace'][image], f'.\etc\\temp\chart_images\{LEARNER}-{image}.png')
        doc.save('media\\docx\\example.docx')

    # return HttpResponse()




    # # Find images name
    # for s in document.inline_shapes:
    #    print (s.height.cm,s.width.cm,s._inline.graphic.graphicData.pic.nvPicPr.cNvPr.name)
    

    # 1.7768944444444446 5.96
    # 1.016661111111111 3.05 Picture 15
    # 10.16 16.4846 Picture 3
    # 20.32 16.483541666666667 Picture 2
    # 11.43 16.4846 Picture 1
    # 1.016 3.048 Cert - None.png
    # 1.016 3.048 Cert - Completion.png
    # 1.016 3.048 Cert - Merit.png
    # 1.016 3.048 Cert - Distinction.png

    # # print(chart, type(chart))       # 4058 file not found         # type <int>
    #                                   # 0 OK
    #                                   # 1 System cant find the path
    #                                   # if file is invalid the server will never stop, no error
    
