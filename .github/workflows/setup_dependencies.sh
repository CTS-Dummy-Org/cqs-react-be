#!/usr/bin/env bash

set -x
configure_cloud_cli() {
  if [ -z $CLOUD_TYPE ]; then
      echo "CLOUD_TYPE=AWS" >> $GITHUB_ENV
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
      aws configure set default.aws_access_key_id $QUICKSTARTPROTYPESECRETS_AWS_ACCESS_KEY_ID_DEV_QA
      aws configure set default.aws_secret_access_key $QUICKSTARTPROTYPESECRETS_AWS_SECRET_ACCESS_KEY_DEV_QA
    elif [ $1 == "stage" ] || [ $1 == "prod" ]; then
      aws configure set default.aws_access_key_id $QUICKSTARTPROTYPESECRETS_AWS_ACCESS_KEY_ID_STAGE_PROD
      aws configure set default.aws_secret_access_key $QUICKSTARTPROTYPESECRETS_AWS_SECRET_ACCESS_KEY_STAGE_PROD
    fi
  elif [ $CLOUD_TYPE == "AZURE" ]; then
    echo "Installing Azure CLI..."
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    az --version
    echo "Logging in to Azure..."
    echo "dev or qa"
    if [ $1 == "dev" ] || [ $1 == "qa" ]; then
      echo "dev or qa"

      if [ $1 == "dev" ];then
        echo "dev"
        echo "AZURE_CDN_CONNECT_STRING=$AZURE_CDN_CONNECT_STRING_DEV" >> $GITHUB_ENV
      fi
      if [ $1 == "qa" ];then
        echo "qa"
        echo "AZURE_CDN_CONNECT_STRING=$AZURE_CDN_CONNECT_STRING_QA" >> $GITHUB_ENV
      fi

      az login --service-principal -t $QUICKSTART_PROTOTYPE_SECRETS_AZURE_TENANT_ID_DEV_QA -u $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_ID_DEV_QA -p $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_SECRET_DEV_QA
      az account set -s $QUICKSTART_PROTOTYPE_SECRETS_AZURE_SUBSCRIPTION_ID_DEV_QA
    elif [ $1 == "stage" ] || [ $1 == "prod" ]; then
      echo "stage or prod"
      if [ $1 == "stage" ]; then
        echo "stage"
        echo "AZURE_CDN_CONNECT_STRING=$AZURE_CDN_CONNECT_STRING_STAGE" >> $GITHUB_ENV
      elif [ $1 == "prod" ];then
        echo "prod"
        echo "AZURE_CDN_CONNECT_STRING=$AZURE_CDN_CONNECT_STRING_PROD" >> $GITHUB_ENV
      fi
      az login --service-principal -t $QUICKSTART_PROTOTYPE_SECRETS_AZURE_TENANT_ID_STAGE_PROD -u $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_ID_STAGE_PROD -p $QUICKSTART_PROTOTYPE_SECRETS_AZURE_CLIENT_SECRET_STAGE_PROD
      az account set -s $QUICKSTART_PROTOTYPE_SECRETS_AZURE_SUBSCRIPTION_ID_STAGE_PROD
    fi
  else
    echo "Invalid cloud type. Please specify either AWS or AZURE."
  fi
}
configure_cloud_cli "$@"
