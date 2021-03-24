set -x
###
 # @Author: yuszhou
 # @Date: 2021-03-24 12:03:30
 # @LastEditTime: 2021-03-24 12:14:21
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \rise\env.sh
### 
set -e
publicPath="/etc/nginx/nginx.conf"
echo ${publicPath}
mv ${publicPath} ${publicPath}.old
echo "-------------URLPATH----------------"
echo ${URLPATH}
# cat ${publicPath}.old | sed s#URLPATH#${URLPATH}#g | sed s#BASE_URL#${BASE_URL}#g > ${publicPath}
cat ${publicPath}.old | sed s#URLPATH#${URLPATH}#g  > ${publicPath}
