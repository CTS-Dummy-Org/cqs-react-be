#!/usr/bin/env bash
#set -x

get_version_tag(){
  tag=$(date +"%g %m" | awk '{q=int($2/4)+1; printf("%s%s\n", $1, q);}')
  month=$(date +%m)
  month=$((10#$month))
  version=$1
  mq=$((10#$month % 3 == 0 ? 3 : 10#$month % 3))
  tag+="$mq"."$version"
  VERSION_TAG=$tag
}

generate_tags(){
  get_version_tag $GITHUB_RUN_ID

  SHORT_COMMIT_HASH=$(echo $GITHUB_SHA | cut -c1-7)
  RELEASE_TAG=$(echo $GITHUB_RUN_NUMBER | cut -c1-7)
  RELEASE_BRANCH=$(echo "$GITHUB_REF" | sed -r 's/[//\]+/-/g')

  PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)

  echo "tags generated: version=$VERSION_TAG, Short commit=$SHORT_COMMIT_HASH, \
        release tag=$RELEASE_TAG,branch=$RELEASE_BRANCH,package ver=$PACKAGE_VERSION"
}

main(){
  echo "Build project with $1"

  if [ -z $1 ]; then
    echo "Build requires build script command "; exit 1;
  fi

  npm run "$1"

  if [ $? -eq 1 ]; then
    echo "Error building with $1"; exit 1;
  fi

  generate_tags
  # write build info
  echo "v=$VERSION_TAG,c=$SHORT_COMMIT_HASH, \
        r=$RELEASE_TAG,b=$RELEASE_BRANCH,pv=$PACKAGE_VERSION" | tr -d ' ' > build/build.txt

  mkdir -p workspace
  # export the vars for use in the subsequent jobss
  echo "export STUDIO_CI_SHORT_COMMIT_HASH="$SHORT_COMMIT_HASH"" > workspace/env_exports
  echo "export STUDIO_CI_VERSION_TAG="$VERSION_TAG"" >> workspace/env_exports
  echo "export STUDIO_CI_RELEASE_TAG="$RELEASE_TAG"" >> workspace/env_exports
  echo "export STUDIO_CI_RELEASE_BRANCH="$RELEASE_BRANCH"" >> workspace/env_exports
  echo "export STUDIO_CI_PACKAGE_VERSION="$PACKAGE_VERSION"" >> workspace/env_exports

  echo $(cat workspace/env_exports)
}

main "$@"
