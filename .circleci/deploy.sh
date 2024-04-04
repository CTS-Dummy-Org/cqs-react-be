#!/usr/bin/env bash
#set -x
main(){
  echo "Cloud Type from deploy:$CLOUD_TYPE"
  if [ $CLOUD_TYPE == "AWS" ]; then
      if [ $DEPLOY_TO_ECS == false ]; then
      echo "No need to deploy into S3"; exit 0;
      fi

      echo "Deploy build artifacts to S3"
      if [ -z $1 ]; then
        echo "Deploy requires environment name (dev,qa,stage)"; exit 1;
      fi

      if [ $1 == "dev" ] || [ $1 == "qa" ] || [ $1 == "stage" ] || [ $1 == "prod" ]; then
        AWS_S3_BUCKET_NAME=$AWS_S3_DEPLOY_BUCKET_NAME
      else
        echo "Undefined environment:$1"; exit 1; 
    fi
      
    echo "Sync to s3://$AWS_S3_BUCKET_NAME with build:${STUDIO_CI_SHORT_COMMIT_HASH}"
    aws s3 sync ~/app/build/build s3://$AWS_S3_BUCKET_NAME --delete
    if [ $? -eq 1 ]; then
      echo "Error pushing build to $AWS_S3_BUCKET_NAME"; exit 1; 
    fi    

  elif [ $CLOUD_TYPE == "AZURE" ]; then
    echo "Cloud Type AZURE"
    if [ $1 == "dev" ]; then
      AZURE_CDN_CONNECT_STRING=$QUICKSTART_AZURE_CDN_CONNECT_STRING_DEV
    elif [ $1 == "qa" ]; then
      AZURE_CDN_CONNECT_STRING=$QUICKSTART_AZURE_CDN_CONNECT_STRING_QA
    elif [ $1 == "stage" ]; then
      AZURE_CDN_CONNECT_STRING=$QUICKSTART_AZURE_CDN_CONNECT_STRING_STAGE
    elif [ $1 == "prod" ]; then
      AZURE_CDN_CONNECT_STRING=$QUICKSTART_AZURE_CDN_CONNECT_STRING_PROD
    fi
    
    if [ $DEPLOY_TO_AKS == true ]; then
      echo "Sync to asset folder in web container  with $STUDIO_CI_SHORT_COMMIT_HASH"
      az storage blob sync -c '$web' --account-name $AZURE_STORAGE_ACCOUNT_NAME -s '/home/circleci/app/build/build' -d "$AZURE_BLOB_CONTAINER_NAME/" --connection-string $AZURE_CDN_CONNECT_STRING --delete-destination true 
      if [ $? -eq 1 ]; then
        echo "Error in copy build to $AZURE_BLOB_CONTAINER_NAME"; exit 1; 
      fi 
    fi

    if [ $DEPLOY_TO_AKS == false ]; then
      if [ $DEPLOY_AKS_TEARDOWN == true ]; then
        echo "Delete asset blob"
        az storage blob delete-batch --account-name $AZURE_STORAGE_ACCOUNT_NAME --source '$web' --pattern "$AZURE_BLOB_CONTAINER_NAME/*" --connection-string $AZURE_CDN_CONNECT_STRING
        if [ $? -eq 1 ]; then
          echo "Error in asset blob delete $AZURE_BLOB_CONTAINER_NAME"; exit 1; 
        fi 
      fi
    fi

    echo "deploy AZURE block completed"

  else
    echo "Invalid cloud type. Please specify either AWS or AZURE."
  fi
}

main "$@"
