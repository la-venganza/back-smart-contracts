#!/bin/bash
# IMPORTANT: before running this script ensure to run heroku login!!!!

APP_NAME=ubademy-smart-contract-handler

heroku container:push web --app $APP_NAME
heroku container:release web --app $APP_NAME