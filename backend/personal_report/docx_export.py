import os
import pathlib
import re
import json
import logging
import importlib
from abc import ABC, abstractmethod
from docxtpl import DocxTemplate

from etc.config.config_map import template_conf, chart_conf
from .utils import generate_path
from etc.config.get_data import *


logger = logging.getLogger(__name__)




class ReportConfig:
    
    def __init__(self, config):
        
        self.rpt_data = rpt_settings['data'][config['data_type']][config['data_strategy']]
        self.rpt_chart_type = rpt_settings['chart_type'][config['chart_type']]
        self.rpt_chart_output = rpt_settings['chart_output'][config['chart_output']]
        
        
        self.lookup_values = config['lookup_values']
        self.chart_config_id = config['chart_config_id']
        self.template = config['template']
        
        self.template_full_path = generate_path(
            template_conf[config['template']]['path'], 
            [template_conf[config['template']]['name']]
        )
        
    
# Chart Abstraction
class ReportChart(ABC):
    @abstractmethod
    def prepare_charts(self, data: dict):
        """ Adds data to charts settings """                                                                     
        
    @abstractmethod
    def generate_charts(self, settings: dict):
        """ Generetes charts """


# Chart types
class GenereteHighchart(ReportChart):
    '''Returns ready to use chart setting (poopulated with data) 
        -->> dicit(apth to chart settings (json), path to dependensies '''
    def prepare_charts(data: dict):
        return {'path to chart settings': f'GenereteHighchart: {data}'}    
    
    
class GenereteBokehChart(ReportChart):
    '''Returns ready to use chart setting (poopulated with data) 
        -->> dicit(apth to chart settings (json), path to dependensies '''
    def prepare_charts(data: dict):
        return {'path to chart settings': f'GenereteBokehChart: {data}'}    
    

# Chart output types    
class GenerateChartJSONType(ReportChart):
    ''' Returns chart settings in json format '''
    def generate_charts(settings: dict):
        return {'path to chart settings': f'img with data GenerateChartJSONType: {settings}'}  


class GenerateChartImage(ReportChart):
    ''' Returns dict with path to images '''
    def generate_charts(settings: dict):
        return {'path to chart images': f'img with data GenerateChartImage: {settings}'} 
    

# Strategy Abstraction
class Strategy(ABC):
    @abstractmethod
    def generate_data(self, **kwargs):
        '''Abstract method to generate data'''
        
        
class GenerateQueryCohortReport(Strategy):
    
    def generate_data(self, **kwargs):
        '''Gets full data for cohort report'''
        return {'GenerateQueryCohortReport': f'{kwargs["cohort"]}', 'TABLE_NAME': {'VARIABLE1': 'value', 'VARIABLE2': 'value', 'TEMPLATE': {'TEMPLATE_VARIABLE': 'value'}}}
    
    
class GenerateQueryPersonalReport(Strategy):
    
    def generate_data(self, **kwargs):
        # ideally need to create query which will 
        # contain 1/2 big tables with all needed entries 
        # i just use already written functions
        data = {
            'charts_data': {
                'module_scores_data': get_module_scores_data(kwargs['cohort'], kwargs['learner']),
                'subject_scores_data': get_subject_scores_data(kwargs['cohort'], kwargs['learner']),
                'gap_data': get_gap_data(kwargs['cohort'], kwargs['learner']),
                'c1_global_score': get_perf_data(kwargs['cohort'], kwargs['learner']),
                'cert': get_learner_certificate(),
            },
            'template_data': {
                # needs to be improved
                'CERT': get_learner_certificate(),
                
            }
        }
        '''Gets full data for personal report'''
        return data


class GetXLSDataCohortReport(Strategy):
    
    def generate_data(self, **kwargs):
        '''Gets full data for cohort report from exel'''
        return {'GetXLSDataCohortReport': f'{kwargs["cohort"]}', 'TABLE_NAME': {'VARIABLE1': 'value', 'VARIABLE2': 'value', 'TEMPLATE': {'TEMPLATE_VARIABLE': 'value'}}}
    
    
class GetXLSDataPersonalReport(Strategy):
    def generate_data(self, **kwargs):
        '''Gets full data for cohort report from exel'''
        return {'GetXLSDataPersonalReport': f'{kwargs["cohort"]}', 'TABLE_NAME': {'VARIABLE1': 'value', 'VARIABLE2': 'value', 'TEMPLATE': {'TEMPLATE_VARIABLE': 'value'}}}
    

# Data Abstraction
class ReportData(ABC):   
    data: dict
    
    @abstractmethod
    def get_initial_data(self, strategy: Strategy = None, **kwargs):
        """ Returns full data for report as dict"""
    
    def update_data(self, data: dict):
        self.data.update(data)
        return self.data
    

class GenerateReportingData(ReportData):
    ''' create get_data_for_chart with some strategies: personal_rpt, cohort_rpt_V1, cohort_rpt_V2 which take **kwargs (lookup parametrs)
    all of strategies has the same rule of how to return the dict
    cohort_rpt_V2 -->> dict: {'TABLE_NAME': 'value/s', 'TEMPLATE': value/s}
    In a chart settings we need to spesify a data keyword wich is <TABLE_NAME>
    data['TABLE_NAME'] will return dict with KEYWORD/S to be replaced in chart's settings.json '''
    
    def get_initial_data(self, strategy: Strategy = None, **kwargs):
        self.data = strategy.generate_data(**kwargs)
        return self.data
    
    
    
class ReportTemplateClass:
    data: dict
    template: str
    
    def __init__(self, data, template):
        self.data = data
        self.template = template
    
    def generate_docx(self):
        ''' render template '''
        pass
    
class ReportGenerate:
    # main func will be here
   pass
    





# Factory settings
rpt_settings = {
    'data': {
        'db': {
            'cohort_report': GenerateQueryCohortReport(),
            'personal_report': GenerateQueryPersonalReport()
        },
        'exel': {
            'cohort_report': GetXLSDataCohortReport(),
            'personal_report': GetXLSDataPersonalReport()
        },
    },
    'chart_type': {
        'highchart': GenereteHighchart,   # >> will take data: ready to use: dict()
        'bokeh': GenereteBokehChart       # >> will take data: ready to use: dict()
    },
    'chart_output': {
        'json': GenerateChartJSONType,  # takes ready to use chart settings in json format. Returns dict with path to json files
        'img': GenerateChartImage       # takes ready to use chart settings in json format. Returns dict with path to img
    }
}





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

    