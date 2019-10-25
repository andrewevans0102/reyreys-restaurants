#!/bin/sh
# setup_local.sh

mkdir 'setup_local'
cd 'setup_local'

curl -H "Authorization:token $RR_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $RR_DEPLOYED'environment.ts'
curl -H "Authorization:token $RR_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $RR_DEPLOYED'environment.prod.ts'

rm -rf src/environments/environment.ts
rm -rf src/environments/environment.prod.ts

cp environment.ts ../src/environments/environment.ts
cp environment.prod.ts ../src/environments/environment.prod.ts

cd ..
rm -rf 'setup_local'
