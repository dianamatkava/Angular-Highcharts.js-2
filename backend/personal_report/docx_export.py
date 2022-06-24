import os
import re
import logging
import importlib

from .utils import generate_path

logger = logging.getLogger(__name__)

    
class HighchartExportServer():
    hc_config = dict()
    general_config = dict()
    
    def __init__(self, hc_config, general_config):
        self.hc_config = hc_config
        self.general_config = general_config
        
        
    def create_chart(self):
         # # Create charts
        
        LEARNER = "dianaGera"
        learner_get_data = {
            'c2_module_scores': 10,
            'chart2': 30,
            'chart3': 20,
            'chart4': 1
        }
        
        # Replace values in Render Settings and Callback files and create new settings files for each learner
        regex = re.compile(r'\[([A-Z_]+)\]')
        file_names = dict()
        run_cmd = int()
        
        for chart in self.hc_config['charts']:
            for chart_settings in self.hc_config['charts'][chart]['settings_files']:
                if self.hc_config['charts'][chart]['settings_files'][chart_settings]:
                
                    template_path = self.hc_config['charts'][chart]['settings_files'][chart_settings]['template_path']
                    template_name = self.hc_config['charts'][chart]['settings_files'][chart_settings]['template_name']
                    
                    # Defind default path to Render Settings and Callback files 
                    file_names[chart_settings] = f"{generate_path(template_path, [template_name])}"
                    upload_to = f"{generate_path(self.general_config['temp_files_location']['settings'], [LEARNER, template_name])}"
                    
                    # if file has values that need to be replaced
                    if self.hc_config['charts'][chart]['settings_files'][chart_settings]['data']:
                        # and product['charts'][chart][chart_settings]['data']
                        
                        # call function to get data. returns dict()
                        learner_data = self.hc_config['charts'][chart]['settings_files'][chart_settings]['data'](learner_get_data[chart])
                        
                        with open(f"{file_names[chart_settings]}") as f:
                            contents = f.read()
                        
                        # Find all matching regex arguments and replace it by learner_data key value pairs
                        for key in re.findall(regex, contents):
                            variable_name = re.compile(r'\[{}]'.format(key))
                            contents = variable_name.sub(str(learner_data.get(key)), contents)
                        
                        with open(f"{upload_to}", 'w') as f:
                            f.write(contents)
                            
                            
                        file_names[chart_settings] = upload_to
                    
            cmd = f"cmd /c c: && highcharts-export-server --infile {file_names['hc_render_file']} --outfile {generate_path(self.general_config['temp_files_location']['images'], [LEARNER, chart])}.png"
            callback = f'--callback {file_names["hc_callback_file"]}' if file_names.get("hc_callback_file", False) else ''
            run_cmd += os.system(' '.join([cmd, callback])) 
            
        if run_cmd: logger.error(f'Images for {LEARNER} was not created successfully')
        else: "Good"
        print(run_cmd)


class DocxExport():
    config_file = str()      # null False
    config_path = str()      # null False
    mod = None
    
    def __init__(self, config_file, config_path):
        self.config_file = config_file
        self.config_path = config_path
        self.mod = importlib.import_module('.'.join([*config_path.split('/'), config_file]))
        

    def generate_charts(self):
        # returns dictionary with path to images
        charts = HighchartExportServer(self.mod.hc_config, self.mod.general_config)
        charts.create_chart()
    