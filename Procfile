api: PYTHONUNBUFFERED=1 PYTHONPATH=.:./api/:$PYTHONPATH gunicorn -b localhost:8000 api.wsgi
ui: npm --prefix ui run start
