import os
import re
import importlib
from django.conf import settings


class DocxExport():
    # docx config file              nullable = False
    # .values (type, docx template, variables to be rendered, )
    
    pass

    def generate_docx(self):
        # runs class in config file
        pass
    
    
class HighchartExportServer():
    config_file = 'config.py'       # null False
    config_path = 'etc/config'      # null False
    mod = None
    
    def __init__(self, config_file, config_path):
        self.config_file = config_file
        self.config_path = config_path
        self.mod = importlib.import_module('.'.join([*config_path.split('/'), config_file]))
        
        
    def create_chart(self):
        object = "dianaGera"
        obj_data = {
            'chart1': 10,
            'chart2': 30,
            'chart3': 20,
            'chart4': 1
        }
    
        regex = re.compile(r'\[([A-Z_]+)\]')
        file_names = dict()
        
        for chart in self.mod.product['charts']:
            for chart_settings in self.mod.product['charts'][chart]:
                
                template_path = self.mod.product['charts'][chart][chart_settings]['template_path']
                template_name = self.mod.product['charts'][chart][chart_settings]['template_name']
                
                # Defind default path to Render Settings and Callback files 
                file_names[chart_settings] = f"{os.path.join(settings.BASE_DIR, *template_path.split('/'), '_'.join(filter(None, [template_name])))}"
                upload_to = f"{self.mod.product['temp_files_location']['settings'], '_'.join(filter(None, [object, template_name]))}"
                print(file_names[chart_settings] )
                # if file has values that need to be replaced
                if self.mod.product['charts'][chart][chart_settings]['data']:
                    
                    # call function to get data. returns dict()
                    learner_data = self.mod.product['charts'][chart][chart_settings]['data'](obj_data[chart])
                    
                    with open(f"{file_names[chart_settings]}") as f:
                        contents = f.read()
                    
                    # Find all matching regex arguments and replace it by learner_data key value pairs
                    for key in re.findall(regex, contents):
                        value_name = re.compile(r'\[{}]'.format(key))
                        contents = value_name.sub(str(learner_data.get(key)), contents)
                    
                    with open(f"{upload_to}", 'w') as f:
                        f.write(contents) 
                        
                    file_names[chart_settings] = upload_to
            
                    
            cmd = f"cmd /c c: && highcharts-export-server --infile {file_names['settings_files']} --outfile {self.mod.product['temp_files_location']['images'], '_'.join(filter(None, [object, chart]))}.png"
            callback = f'--callback {file_names["callback_files"]}'                                         
            run_cmd = os.system(' '.join([cmd, callback if file_names["callback_files"] != 'None' else '']))   
    
    
class PersonalReport(HighchartExportServer):
    
    charts = dict()
    
    
    
    
   