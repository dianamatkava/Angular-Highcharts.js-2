from .get_data import *


general_config = {
    'docx_template_name': 'PersonalReportTemplate_V1',
    
    'temp_files_location': {
        'settings': 'etc/temp/learner_chart_settings/',
        'images': 'etc/temp/chart_images/'
    },
    
    'output_file_location': 'media/docx',
    'extra_images_location': 'media/img'
}

hc_config = {
    'extra_images_to_replace': {
        'cert': {
            'name': 'cert',
            'data': get_learner_certificate
        }
    },
    
    'charts': {
        'c1_global_score': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings/gbs',
                    'template_name': 'chart4SettingsGeneral.json',
                    'data': get_perf_data 
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'chart4RenderSettings.js',
                    'data': get_perf_data
                },
            },
            'image_to_replace': 'global_score'
        },
        
        'c2_module_scores': {
            'settings_files': {
                'hc_render_file': {                                             
                    'template_path': 'etc/highchart_render_settings/gbs',           
                    'template_name': 'chart1SettingsGeneral.json',
                    'data': get_module_scores_data
                },
                'hc_callback_file': None 
            },
            'image_to_replace': 'module_scores'
        },
        
        'c3_subject_scores': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings/gbs',
                    'template_name': 'chart2SettingsGeneral.json',
                    'data': get_subject_scores_data
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'grouped-categories.js',
                    'data': None
                },
            },
            'image_to_replace': 'subject_scores'
        },
        
        'c4_gap_to_goal': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings/gbs',
                    'template_name': 'chart3SettingsGeneral.json',
                    'data': get_gap_data
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'grouped-categories.js',
                    'data': None
                },
            },
            'image_to_replace': 'gap_to_goal'
        },
        
        
        
    },
}