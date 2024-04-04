#!/usr/bin/env bash

set -x

configure_cloud_cli() {
  if [ -z $CLOUD_TYPE ]; then
      echo "export CLOUD_TYPE=AWS" >> $BASH_ENV
      source $BASH_ENV
      echo "Making default CLOUD_TYPE as AWS"
  fi

  if [ $CLOUD_TYPE == "AWS" ]; then
    echo "Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo chmod +x /usr/local/*
    sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin
    aws --version
    echo "Configuring AWS CLI..."
    if [ $1 == "dev" ] || [ $1 == "qa" ]; then
      aws configure set default.aws_access_key_id   $AWS_ACCESS_KEY_ID_DEV_n_QA
      aws configure set default.aws_secret_access_key  $AWS_SECRET_ACCESS_KEY_DEV_n_QA
    elif [ $1 == "stage" ] || [ $1 == "prod" ]; then
      aws configure set default.aws_access_key_id   $AWS_ACCESS_KEY_ID_STAGE_n_PROD
      aws configure set default.aws_secret_access_key  $AWS_SECRET_ACCESS_KEY_STAGE_n_PROD
    fi
  elif [ $CLOUD_TYPE == "AZURE" ]; then
    echo "Installing Azure CLI..."
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    az --version
    echo "Logging in to Azure...$1"
    if [ $1 == "dev" ] || [ $1 == "qa" ]; then
      echo "dev or qa"
      az login --service-principal -t $QUICKSTART_PROTOTYPE_SECRETS_AZURE_TENANT_ID_DEV_QA -u $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_ID_DEV_QA -p $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_SECRET_DEV_QA
      az account set -s $QUICKSTART_PROTOTYPE_SECRETS_AZURE_SUBSCRIPTION_ID_DEV_QA
    elif [ $1 == "stage" ] || [ $1 == "prod" ]; then
      echo "stage or prod"
      az login --service-principal -t $QUICKSTARTPROTYPESECRETS_AZURE_TENANT_ID_STAGE_PROD -u $QUICKSTARTPROTYPESECRETS_AZURE_CLIENT_ID_STAGE_PROD -p $QUICKSTARTPROTYPESECRETS_AZURE_CLIENT_SECRET_STAGE_PROD
      az account set -s $QUICKSTARTPROTYPESECRETS_AZURE_SUBSCRIPTION_ID_STAGE_PROD
    fi
  else
    echo "Invalid cloud type. Please specify either AWS or AZURE."
  fi
}
configure_cloud_cli "$@"
