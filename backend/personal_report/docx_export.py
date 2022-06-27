import os
import re
import logging
import importlib

from docxtpl import DocxTemplate

from etc.config.docx_templates import templates
from .utils import generate_path, db_connect

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
            'c1_global_score': 10,
            'c2_module_scores': 10,
            'c3_subject_scores': 30,
            'c4_gap_to_goal': 1
        }
        
        # Replace values in Render Settings and Callback files and create new settings files for each learner
        regex = re.compile(r'\[([A-Z_]+)\]')
        file_names = dict()
        images_path = dict()
        
        for chart in self.hc_config['charts']:
            for chart_settings in self.hc_config['charts'][chart]['settings_files']:
                file_names[chart_settings] = None
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
                        
            img_path = f"{generate_path(self.general_config['temp_files_location']['images'], [LEARNER, chart])}.png"
            cmd = f"highcharts-export-server --infile {file_names['hc_render_file']} --outfile {img_path}"
            callback = f'--callback {file_names["hc_callback_file"]}' if file_names.get("hc_callback_file", False) else ''
            run_cmd += os.system(' '.join([cmd, callback]))
            
            if run_cmd: 
                logger.error(f'Image {chart} for {LEARNER} was not created successfully')
                return None
            else: 
                images_path[f"{self.hc_config['charts'][chart]['image_to_replace']}"] = img_path
        
        if self.hc_config['extra_images_to_replace']:
            for image in self.hc_config['extra_images_to_replace']:
                img = self.hc_config['extra_images_to_replace'][image]
                if img['data']:
                    img_name = img['data']() # will be user uuid
                    images_path[f"{img['name']}"] = generate_path(self.general_config['extra_images_location'], [f"Cert_{img_name}.png"])


        return images_path
                
         # or we can check if we had errors at the end 
         # if run_cmd: logger.error(f'Images for {LEARNER} was not created successfully')


class DocxExport():
    config_file = str()      # null False
    config_path = str()      # null False
    chart_images = dict()
    docx_content = dict()
    mod = None
    
    def __init__(self, config_file, config_path):
        self.config_file = config_file
        self.config_path = config_path
        self.mod = importlib.import_module('.'.join([*config_path.split('/'), config_file]))
        

    def generate_charts(self):
        # returns dictionary with path to images
        charts = HighchartExportServer(self.mod.hc_config, self.mod.general_config)
        self.chart_images = charts.create_chart()
        
    def generate_content(self): 
        # returns dictionary with content
        pass
    
    def create_docx(self):
        template_path = templates[self.mod.general_config['docx_template_name']]['path']
        template_name = templates[self.mod.general_config['docx_template_name']]['name']
        template = generate_path(template_path, [template_name])
        
        doc = DocxTemplate(template)
           
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
        
        for s in doc.inline_shapes:
            image_name = s._inline.graphic.graphicData.pic.nvPicPr.cNvPr.get('descr', None)
            if image_name:
                doc.replace_pic(image_name, self.chart_images[image_name])
            
            
        doc.save(f"{generate_path(self.mod.general_config['output_file_location'], [context['TRAINEE'], context['CLIENT_COHORT'], self.mod.general_config['docx_template_name']], extension='docx')}.docx")

    