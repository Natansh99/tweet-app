from flask import Flask, request, jsonify


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


application = Flask(__name__)
application.config['SECRET_KEY'] = '4YrzfpQ4kGXjuP6w'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =False
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://myrootuser:password123@twitter.c3ximrw7wjxs.ap-south-1.rds.amazonaws.com:3306/twitter'
db = SQLAlchemy(application)
CORS(application, allow_headers="http://127.0.0.1:5000")

import socket

# IMPLEMENTING PROMETHEUS
import time

from prometheus_client import Counter, Histogram
from prometheus_client import start_http_server
from flask import request
from prometheus_flask_exporter import PrometheusMetrics
from prometheus_client import CollectorRegistry
metrics = PrometheusMetrics(application, registry=CollectorRegistry(auto_describe=False),export_defaults=False)

FLASK_REQUEST_LATENCY = Histogram('flask_request_latency_seconds', 'Flask Request Latency',	['method', 'endpoint'])
FLASK_REQUEST_COUNT = Counter('flask_request_count', 'Flask Request Count',	['method', 'endpoint', 'http_status'])

from prometheus_client import REGISTRY, PROCESS_COLLECTOR, PLATFORM_COLLECTOR




if __name__ == '__main__':
    # monitor(application, port=8000)
    db = SQLAlchemy(application)

    def before_request():
        request.start_time = time.time()


    def after_request(response):
        request_latency = time.time() - request.start_time
        FLASK_REQUEST_LATENCY.labels(request.method, request.path).observe(request_latency)
        FLASK_REQUEST_COUNT.labels(request.method, request.path, response.status_code).inc()

        return response


    def monitor(application, port=8000, addr=''):
        application.before_request(before_request)
        application.after_request(after_request)
        start_http_server(port, addr) 


    from flask_prom import monitor


    application.config.update({
    'OIDC_CLIENT_SECRETS': './../../../../client_secrets.json',
    'OIDC_RESOURCE_SERVER_ONLY': True
    })
    # oidc = OpenIDConnect(application)
    
    monitor(application, path="/metrics", http_server=True, port=9090, addr="127.0.0.1")
    import routes
    import modals
    try:
        print("Creating DB.. if not exiisting",db)
        # db.drop_all()
        db.create_all()
    except Exception as e:
        print("DB is not created!", e)
    application.run(debug = True, host="127.0.0.1",port=5000)