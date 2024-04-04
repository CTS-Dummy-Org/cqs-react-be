#!/usr/bin/env bash
#set -x
main(){
  echo "Cloud Type from deploy:$CLOUD_TYPE"
  if [ $CLOUD_TYPE == "AWS" ]; then
    echo "Cloud Type AWS"
    if [ $DEPLOY_TO_ECS == false ]; then
      echo "No need to deploy into S3"; exit 0;
    fi

    echo "Deploy build artifacts to S3"

    AWS_S3_BUCKET_NAME=$AWS_S3_DEPLOY_BUCKET_NAME
  
    echo "Sync to s3://$AWS_S3_BUCKET_NAME with build:${GITHUB_SHA}"
    aws s3 sync $GITHUB_WORKSPACE/build/ s3://$AWS_S3_BUCKET_NAME --delete
    if [ $? -eq 1 ]; then
      echo "Error pushing build to $AWS_S3_BUCKET_NAME"; exit 1; 
    fi
  elif [ $CLOUD_TYPE == "AZURE" ]; then
    echo "Cloud Type AZURE"

    if [ $DEPLOY_TO_AKS == true ]; then
      echo "Sync to asset folder in web container  with $STUDIO_CI_SHORT_COMMIT_HASH"
      az storage blob sync -c '$web' --account-name $AZURE_CDN_STORAGE_ACCOUNT -s $GITHUB_WORKSPACE/build  -d "$AZURE_BLOB_CONTAINER_NAME/" --connection-string $AZURE_CDN_CONNECT_STRING --delete-destination true 
      if [ $? -eq 1 ]; then
        echo "Error in copy build to $AZURE_BLOB_CONTAINER_NAME"; exit 1; 
      fi 
    fi

    if [ $DEPLOY_TO_AKS == false ]; then
      if [ $DEPLOY_AKS_TEARDOWN == true ]; then
        echo "Delete asset blob"
        az storage blob delete-batch --account-name $AZURE_CDN_STORAGE_ACCOUNT --source '$web' --pattern "$AZURE_BLOB_CONTAINER_NAME/*" --connection-string $AZURE_CDN_CONNECT_STRING 
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
