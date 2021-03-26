###
 # @Author: yuszhou
 # @Date: 2021-03-24 12:03:30
 # @LastEditTime: 2021-03-26 19:32:25
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \rise\env.sh
### 
set -x
set -e
publicPath="/etc/nginx/nginx.conf"
mv ${publicPath} ${publicPath}.old
# cat ${publicPath}.old | sed s#URLPATH#${URLPATH}#g | sed s#BASE_URL#${BASE_URL}#g > ${publicPath}
cat ${publicPath}.old | sed s#URLPATH#http://rise-gateway-runtime.apps.vmocp-test.csvw.com#g  > ${publicPath}
