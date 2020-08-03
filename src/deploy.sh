set -e
set -x

BUNDLE=build.tgz

npm ci && npm run build
tar cvf $BUNDLE build/ && scp -i ssh.key -o "StrictHostKeyChecking=no" $BUNDLE root@oddle-challenge.elemti.com:
ssh -i ssh.key -o "StrictHostKeyChecking=no" root@oddle-challenge.elemti.com "\
  pm2 -s delete oddle-challenge && \
  rm -rf oddle-challenge && \
  mkdir -p oddle-challenge  && \
  tar xvf $BUNDLE -C oddle-challenge"
