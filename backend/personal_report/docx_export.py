import os
import re
import logging
import importlib

from docxtpl import DocxTemplate

from etc.config.docx_templates import templates
from .utils import generate_path

logger = logging.getLogger(__name__)


class HighchartExportServer():
    hc_config = dict
    general_config = dict
    
    def __init__(self, hc_config, general_config):
        self.hc_config = hc_config
        self.general_config = general_config
        
        
    @staticmethod
    def create_chart(hc_config, general_config, parent_data, child_data):
        
        # Replace values in Render Settings and Callback files and create new settings files for each learner
        regex = re.compile(r'\[([A-Z_]+)\]')
        file_names = dict()
        images_path = dict()
        
        for chart in hc_config['charts']:
            for chart_settings in hc_config['charts'][chart]['settings_files']:
                file_names[chart_settings] = None
                chart_settings = hc_config['charts'][chart]['settings_files'][chart_settings]
                if chart_settings:
                    
                    # Defind default path to Render Settings and Callback files 
                    file_names[chart_settings] = f"{generate_path(chart_settings['template_path'], [chart_settings['template_name']])}"
                    upload_to = f"{generate_path(general_config['temp_files_location']['settings'], [child_data['name'], chart_settings['template_name']])}"
                    
                    # if file has values that need to be replaced
                    if chart_settings['data']:
                        # and product['charts'][chart][chart_settings]['data']
                        
                        # call function to get data. returns dict()
                        learner_data = chart_settings['data'](parent_data['name'], child_data['id'])
                        
                        with open(f"{file_names[chart_settings]}") as f:
                            contents = f.read()
                        
                        # Find all matching regex arguments and replace it by learner_data key value pairs
                        for key in re.findall(regex, contents):
                            variable_name = re.compile(r'\[{}]'.format(key))
                            contents = variable_name.sub(str(learner_data.get(key)), contents)
                        
                        with open(f"{upload_to}", 'w') as f:
                            f.write(contents)
                            
                        file_names[chart_settings] = upload_to
                        
            img_path = f"{generate_path(general_config['temp_files_location']['images'], [child_data['name'], chart])}.png"
            cmd = f"highcharts-export-server --infile {file_names['hc_render_file']} --outfile {img_path}"
            callback = f'--callback {file_names["hc_callback_file"]}' if file_names.get("hc_callback_file", False) else ''
            run_cmd = os.system(' '.join([cmd, callback]))
            
            if run_cmd: 
                logger.error(f"Image {chart} for {child_data['name']} was not created successfully")
                return None
            else: 
                images_path[f"{hc_config['charts'][chart]['image_to_replace']}"] = img_path
        
        if hc_config['extra_images_to_replace']:
            for image in hc_config['extra_images_to_replace']:
                img = hc_config['extra_images_to_replace'][image]
                if img['data']:
                    img_name = img['data']() # will be user uuid
                    images_path[f"{img['name']}"] = generate_path(general_config['extra_images_location'], [f"Cert_{img_name}.png"])

        return images_path
                
                
# class ReportConfig
# class ReportData
#     db, exel, output json

# class ReportChart
#     data that required
#     ReportData
#     can come from dif resources
    
# class ReportTemplateClass
 
#     list of all CharsetMatches
#     name template to use
    
# class ReportGenerate    
#     will call every time to create file
        
                
class DocxExport():
    config_file = str()      # null False
    config_path = str()      # null False
    
    chart_images = dict()
    docx_content = dict()
    
    
    def __init__(self, config_file, config_path):
        self.config_file = config_file
        self.config_path = config_path
        self.mod = importlib.import_module('.'.join([*config_path.split('/'), config_file]))
        

    def generate_charts(self, parent_data, child_data):
        # returns dictionary with path to images
        self.chart_images = HighchartExportServer.create_chart(self.mod.hc_config, self.mod.general_config, parent_data, child_data)
        
    def generate_content(self, parent, child): 
        # returns dictionary with content
        docx_content = { 
            'filename': ' '.join(filter(None, [child['name'], parent['name']])),
            'TRAINEE': "Diana",
            'CLIENT_COHORT': 'ZZL Cohort 1', 
            'Product': 'Global Business Skills',
            'DATE': 'today',
            'SCORE': "100%",
            'CERT': "Excellent",
            'DESCRIPTION1': "Some custom description 1",
            'DESCRIPTION2': "Some custom description 2"
        }
        self.docx_content = docx_content
    
        
    def create_docx(self):
        template_path = templates[self.mod.general_config['docx_template_name']]['path']
        template_name = templates[self.mod.general_config['docx_template_name']]['name']
        template = generate_path(template_path, [template_name])
        
        # for now lets imaging we have some logic here
        
        doc = DocxTemplate(template)
        doc.render(self.docx_content )
        
        for s in doc.inline_shapes:
            image_name = s._inline.graphic.graphicData.pic.nvPicPr.cNvPr.get('descr', None)
            if image_name:
                doc.replace_pic(image_name, self.chart_images[image_name])
            
        doc.save(f"{generate_path(self.mod.general_config['output_file_location'], [self.docx_content ['filename'], self.mod.general_config['docx_template_name']], extension='')}.docx")

    