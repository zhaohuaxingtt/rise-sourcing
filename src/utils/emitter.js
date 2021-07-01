/*
 * @Author: your name
 * @Date: 2021-07-01 17:19:43
 * @LastEditTime: 2021-07-01 18:12:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\utils\emitter.js
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options.componentName;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    }); 
  }
  export default {
    methods: {
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };