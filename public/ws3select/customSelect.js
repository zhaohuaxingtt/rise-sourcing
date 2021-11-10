;(function (context, definition) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define(['Vue', 'VueUtil'], definition)
  } else {
    context.VueSelect = definition(context.Vue, context.VueUtil)
    delete context.VueSelect
  }
})(this, function (Vue, VueUtil) {
  var getOuterSizes = function (element) {
    var _display = element.style.display
    var _visibility = element.style.visibility
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    var calcWidthToForceRepaint = element.offsetWidth
    var styles = getComputedStyle(element)
    var x =
      element.offsetHeight +
      parseFloat(styles.marginTop) +
      parseFloat(styles.marginBottom)
    var y =
      element.offsetWidth +
      parseFloat(styles.marginLeft) +
      parseFloat(styles.marginRight)
    var result = {
      width: y,
      height: x
    }
    element.style.display = _display
    element.style.visibility = _visibility
    return result
  }
  var getPopperClientRect = function (popperOffsets) {
    var offsets = VueUtil.merge({}, popperOffsets)
    offsets.right = offsets.left + offsets.width
    offsets.bottom = offsets.top + offsets.height
    return offsets
  }
  var getArrayKeyIndex = function (arr, keyToFind) {
    var i = arr.length
    while (i--) {
      if (arr[i] === keyToFind) {
        return i
      }
    }
    return null
  }
  var getOffsetParent = function (element) {
    var offsetParent = element.offsetParent
    return offsetParent === document.body || !offsetParent
      ? document.documentElement
      : offsetParent
  }
  var setStyle = function (element, styles) {
    function is_numeric(n) {
      return n !== '' && !isNaN(parseFloat(n)) && isFinite(n)
    }
    VueUtil.ownPropertyLoop(styles, function (prop) {
      var unit = ''
      if (
        ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==
          -1 &&
        is_numeric(styles[prop])
      ) {
        unit = 'px'
      }
      element.style[prop] = styles[prop] + unit
    })
  }
  var Popper = function (reference, popper, options) {
    var DEFAULTS = {
      placement: 'bottom',
      gpuAcceleration: true,
      offset: 0,
      boundariesElement: 'viewport',
      boundariesPadding: 5,
      preventOverflowOrder: ['left', 'right', 'top', 'bottom'],
      flipBehavior: 'flip',
      arrowElement: '[x-arrow]',
      modifiers: [
        'shift',
        'offset',
        'preventOverflow',
        'keepTogether',
        'arrow',
        'flip',
        'applyStyle'
      ],
      modifiersIgnored: [],
      forceAbsolute: false,
      removeOnDestroy: true
    }
    this._reference = reference.jquery ? reference[0] : reference
    this.state = {}
    var isNotDefined = !VueUtil.isDef(popper)
    var isConfig = VueUtil.isObject(popper)
    if (isNotDefined || isConfig) {
      this._popper = this.parse(isConfig ? popper : {})
    } else {
      this._popper = popper.jquery ? popper[0] : popper
    }
    this._options = VueUtil.merge({}, DEFAULTS, options)
    this._options.modifiers = VueUtil.map(
      this._options.modifiers,
      function (modifier) {
        if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return
        if (modifier === 'applyStyle') {
          this._popper.setAttribute('x-placement', this._options.placement)
        }
        return this.modifiers[modifier] || modifier
      }.bind(this)
    )
    this.state.position = this._getPosition(this._popper, this._reference)
    setStyle(this._popper, {
      position: this.state.position,
      top: 0
    })
    this._setupEventListeners()
    return this
  }
  Popper.prototype.destroy = function () {
    this._popper.removeAttribute('x-placement')
    this._popper.style.left = ''
    this._popper.style.position = ''
    this._popper.style.top = ''
    this._popper.style.transform = ''
    this._removeEventListeners()
    if (this._options.removeOnDestroy) {
      VueUtil.removeNode(this._popper)
    }
    return this
  }
  Popper.prototype.update = function () {
    var data = {
      instance: this,
      styles: {}
    }
    data.placement = this._options.placement
    data._originalPlacement = this._options.placement
    this._options.autoWidth &&
      setStyle(this._popper, { width: this._reference.offsetWidth })
    data.offsets = this._getOffsets(
      this._popper,
      this._reference,
      data.placement
    )
    data.boundaries = this._getBoundaries(
      data,
      this._options.boundariesPadding,
      this._options.boundariesElement
    )
    data = this.runModifiers(data, this._options.modifiers)
    if (VueUtil.isFunction(this.state.updateCallback)) {
      this.state.updateCallback(data)
    }
  }
  Popper.prototype.onCreate = function (callback) {
    callback(this)
    return this
  }
  Popper.prototype.onUpdate = function (callback) {
    this.state.updateCallback = callback
    return this
  }
  Popper.prototype.parse = function (config) {
    var defaultConfig = {
      tagName: 'div',
      classNames: ['popper'],
      attributes: [],
      parent: document.body,
      content: '',
      contentType: 'text',
      arrowTagName: 'div',
      arrowClassNames: ['popper__arrow'],
      arrowAttributes: ['x-arrow']
    }
    config = VueUtil.merge({}, defaultConfig, config)
    var d = document
    var popper = d.createElement(config.tagName)
    addClassNames(popper, config.classNames)
    addAttributes(popper, config.attributes)
    if (config.contentType === 'node') {
      popper.appendChild(
        config.content.jquery ? config.content[0] : config.content
      )
    } else if (config.contentType === 'html') {
      popper.innerHTML = config.content
    } else {
      popper.textContent = config.content
    }
    if (config.arrowTagName) {
      var arrow = d.createElement(config.arrowTagName)
      addClassNames(arrow, config.arrowClassNames)
      addAttributes(arrow, config.arrowAttributes)
      popper.appendChild(arrow)
    }
    var parent = config.parent.jquery ? config.parent[0] : config.parent
    if (VueUtil.isString(parent)) {
      parent = d.querySelector(config.parent)
      if (!VueUtil.isDef(parent)) {
        throw "ERROR: the given 'parent' doesn't exists!"
      }
    }
    if (VueUtil.isNodeList(parent)) {
      parent = parent[0]
    }
    parent.appendChild(popper)
    return popper
    function addClassNames(element, classNames) {
      VueUtil.loop(classNames, function (className) {
        element.classList.add(className)
      })
    }
    function addAttributes(element, attributes) {
      VueUtil.loop(attributes, function (attribute) {
        element.setAttribute(
          attribute.split(':')[0],
          attribute.split(':')[1] || ''
        )
      })
    }
  }
  Popper.prototype._getPosition = function (popper, reference) {
    if (this._options.forceAbsolute) {
      return 'absolute'
    }
    var isFixed = function (element) {
      if (element === document.body) return false
      var elementPosition = VueUtil.getStyle(element, 'position')
      if (elementPosition === 'fixed' || elementPosition === 'relative')
        return true
      return element.parentNode ? isFixed(element.parentNode) : element
    }
    var isParentFixed = isFixed(reference)
    return isParentFixed ? 'fixed' : 'absolute'
  }
  Popper.prototype._getOffsets = function (popper, reference, placement) {
    placement = placement.split('-')[0]
    var popperOffsets = {}
    popperOffsets.position = this.state.position
    var getBoundingClientRect = function (element) {
      var rect = element.getBoundingClientRect()
      var isIE = navigator.userAgent.indexOf('MSIE') != -1
      var rectTop =
        isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top
      return {
        left: rect.left,
        top: rectTop,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rectTop
      }
    }
    var getOffsetRectRelativeToCustomParent = function (
      element,
      parent,
      fixed
    ) {
      var elementRect = getBoundingClientRect(element)
      var parentRect = getBoundingClientRect(parent)
      if (fixed) {
        var scrollParent = VueUtil.component.getScrollParent(parent)
        parentRect.top += scrollParent.scrollTop
        parentRect.bottom += scrollParent.scrollTop
        parentRect.left += scrollParent.scrollLeft
        parentRect.right += scrollParent.scrollLeft
      }
      var rect = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.top - parentRect.top + elementRect.height,
        right: elementRect.left - parentRect.left + elementRect.width,
        width: elementRect.width,
        height: elementRect.height
      }
      return rect
    }
    var isParentFixed = popperOffsets.position === 'fixed'
    var referenceOffsets = getOffsetRectRelativeToCustomParent(
      reference,
      getOffsetParent(popper),
      isParentFixed
    )
    var popperRect = getOuterSizes(popper)
    if (['right', 'left'].indexOf(placement) !== -1) {
      popperOffsets.top =
        referenceOffsets.top +
        referenceOffsets.height / 2 -
        popperRect.height / 2
      if (placement === 'left') {
        popperOffsets.left = referenceOffsets.left - popperRect.width
      } else {
        popperOffsets.left = referenceOffsets.right
      }
    } else {
      popperOffsets.left =
        referenceOffsets.left +
        referenceOffsets.width / 2 -
        popperRect.width / 2
      if (placement === 'top') {
        popperOffsets.top = referenceOffsets.top - popperRect.height
      } else {
        popperOffsets.top = referenceOffsets.bottom
      }
    }
    popperOffsets.width = popperRect.width
    popperOffsets.height = popperRect.height
    return {
      popper: popperOffsets,
      reference: referenceOffsets
    }
  }
  Popper.prototype._setupEventListeners = function () {
    this.state.updateBound = this.update.bind(this)
    VueUtil.addResizeListener(this.state.updateBound)
    if (this._options.boundariesElement !== 'window') {
      var target = VueUtil.component.getScrollParent(this._reference)
      if (target === document.body || target === document.documentElement) {
        target = document
      }
      VueUtil.on(target, 'scroll', this.state.updateBound)
    }
  }
  Popper.prototype._removeEventListeners = function () {
    VueUtil.removeResizeListener(this.state.updateBound)
    if (this._options.boundariesElement !== 'window') {
      var target = VueUtil.component.getScrollParent(this._reference)
      if (target === document.body || target === document.documentElement) {
        target = document
      }
      VueUtil.off(target, 'scroll', this.state.updateBound)
    }
    this.state.updateBound = null
  }
  Popper.prototype._getBoundaries = function (
    data,
    padding,
    boundariesElement
  ) {
    var getOffsetRect = function (element) {
      var elementRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        top: element.offsetTop
      }
      elementRect.right = elementRect.left + elementRect.width
      elementRect.bottom = elementRect.top + elementRect.height
      return elementRect
    }
    var boundaries = {}
    var width, height
    if (boundariesElement === 'window') {
      var body = document.body
      var html = document.documentElement
      height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      )
      boundaries = {
        top: 0,
        right: width,
        bottom: height,
        left: 0
      }
    } else if (boundariesElement === 'viewport') {
      var offsetParent = getOffsetParent(this._popper)
      var scrollParent = VueUtil.component.getScrollParent(this._popper)
      var offsetParentRect = getOffsetRect(offsetParent)
      var getScrollTopValue = function (element) {
        return element == document.body
          ? Math.max(
              document.documentElement.scrollTop,
              document.body.scrollTop
            )
          : element.scrollTop
      }
      var getScrollLeftValue = function (element) {
        return element == document.body
          ? Math.max(
              document.documentElement.scrollLeft,
              document.body.scrollLeft
            )
          : element.scrollLeft
      }
      var scrollTop =
        data.offsets.popper.position === 'fixed'
          ? 0
          : getScrollTopValue(scrollParent)
      var scrollLeft =
        data.offsets.popper.position === 'fixed'
          ? 0
          : getScrollLeftValue(scrollParent)
      boundaries = {
        top: 0 - (offsetParentRect.top - scrollTop),
        right:
          document.documentElement.clientWidth -
          (offsetParentRect.left - scrollLeft),
        bottom:
          document.documentElement.clientHeight -
          (offsetParentRect.top - scrollTop),
        left: 0 - (offsetParentRect.left - scrollLeft)
      }
    } else {
      if (getOffsetParent(this._popper) === boundariesElement) {
        boundaries = {
          top: 0,
          left: 0,
          right: boundariesElement.clientWidth,
          bottom: boundariesElement.clientHeight
        }
      } else {
        boundaries = getOffsetRect(boundariesElement)
      }
    }
    boundaries.left += padding
    boundaries.right -= padding
    boundaries.top = boundaries.top + padding
    boundaries.bottom = boundaries.bottom - padding
    return boundaries
  }
  Popper.prototype.runModifiers = function (data, modifiers, ends) {
    var modifiersToRun = VueUtil.mergeArray([], modifiers)
    if (VueUtil.isDef(ends)) {
      modifiersToRun = this._options.modifiers.slice(
        0,
        getArrayKeyIndex(this._options.modifiers, ends)
      )
    }
    VueUtil.loop(
      modifiersToRun,
      function (modifier) {
        if (VueUtil.isFunction(modifier)) {
          data = modifier.call(this, data)
        }
      }.bind(this)
    )
    return data
  }
  Popper.prototype.isModifierRequired = function (requesting, requested) {
    var index = getArrayKeyIndex(this._options.modifiers, requesting)
    return !!VueUtil.filter(
      this._options.modifiers.slice(0, index),
      function (modifier) {
        return modifier === requested
      }
    ).length
  }
  Popper.prototype.modifiers = {}
  Popper.prototype.modifiers.applyStyle = function (data) {
    var styles = {
      position: data.offsets.popper.position
    }
    var left = Math.round(data.offsets.popper.left)
    var top = Math.round(data.offsets.popper.top)
    var prefixedProperty
    if (this._options.gpuAcceleration && (prefixedProperty = 'transform')) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)'
      styles.top = 0
      styles.left = 0
    } else {
      styles.left = left
      styles.top = top
    }
    VueUtil.merge(styles, data.styles)
    setStyle(this._popper, styles)
    this._popper.setAttribute('x-placement', data.placement)
    if (
      this.isModifierRequired(
        this.modifiers.applyStyle,
        this.modifiers.arrow
      ) &&
      data.offsets.arrow
    ) {
      setStyle(data.arrowElement, data.offsets.arrow)
    }
    return data
  }
  Popper.prototype.modifiers.shift = function (data) {
    var placement = data.placement
    var basePlacement = placement.split('-')[0]
    var shiftVariation = placement.split('-')[1]
    if (shiftVariation) {
      var reference = data.offsets.reference
      var popper = getPopperClientRect(data.offsets.popper)
      var shiftOffsets = {
        y: {
          start: {
            top: reference.top
          },
          end: {
            top: reference.top + reference.height - popper.height
          }
        },
        x: {
          start: {
            left: reference.left
          },
          end: {
            left: reference.left + reference.width - popper.width
          }
        }
      }
      var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y'
      data.offsets.popper = VueUtil.merge(
        popper,
        shiftOffsets[axis][shiftVariation]
      )
    }
    return data
  }
  Popper.prototype.modifiers.preventOverflow = function (data) {
    var order = this._options.preventOverflowOrder
    var popper = getPopperClientRect(data.offsets.popper)
    var check = {
      left: function () {
        var left = popper.left
        if (popper.left < data.boundaries.left) {
          left = Math.max(popper.left, data.boundaries.left)
        }
        return {
          left: left
        }
      },
      right: function () {
        var left = popper.left
        if (popper.right > data.boundaries.right) {
          left = Math.min(popper.left, data.boundaries.right - popper.width)
        }
        return {
          left: left
        }
      },
      top: function () {
        var top = popper.top
        if (popper.top < data.boundaries.top) {
          top = Math.max(popper.top, data.boundaries.top)
        }
        return {
          top: top
        }
      },
      bottom: function () {
        var top = popper.top
        if (popper.bottom > data.boundaries.bottom) {
          top = Math.min(popper.top, data.boundaries.bottom - popper.height)
        }
        return {
          top: top
        }
      }
    }
    VueUtil.loop(order, function (direction) {
      data.offsets.popper = VueUtil.merge(popper, check[direction]())
    })
    return data
  }
  Popper.prototype.modifiers.keepTogether = function (data) {
    var popper = getPopperClientRect(data.offsets.popper)
    var reference = data.offsets.reference
    var f = Math.floor
    if (popper.right < f(reference.left)) {
      data.offsets.popper.left = f(reference.left) - popper.width
    }
    if (popper.left > f(reference.right)) {
      data.offsets.popper.left = f(reference.right)
    }
    if (popper.bottom < f(reference.top)) {
      data.offsets.popper.top = f(reference.top) - popper.height
    }
    if (popper.top > f(reference.bottom)) {
      data.offsets.popper.top = f(reference.bottom)
    }
    return data
  }
  Popper.prototype.modifiers.flip = function (data) {
    if (
      !this.isModifierRequired(
        this.modifiers.flip,
        this.modifiers.preventOverflow
      )
    ) {
      return data
    }
    if (data.flipped && data.placement === data._originalPlacement) {
      return data
    }
    var getOppositePlacement = function (placement) {
      var hash = {
        left: 'right',
        right: 'left',
        bottom: 'top',
        top: 'bottom'
      }
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched]
      })
    }
    var placement = data.placement.split('-')[0]
    var placementOpposite = getOppositePlacement(placement)
    var variation = data.placement.split('-')[1] || ''
    var flipOrder = []
    if (this._options.flipBehavior === 'flip') {
      flipOrder = [placement, placementOpposite]
    } else {
      flipOrder = this._options.flipBehavior
    }
    VueUtil.loop(
      flipOrder,
      function (step, index) {
        if (placement !== step || flipOrder.length === index + 1) {
          return
        }
        placement = data.placement.split('-')[0]
        placementOpposite = getOppositePlacement(placement)
        var popperOffsets = getPopperClientRect(data.offsets.popper)
        var a = ['right', 'bottom'].indexOf(placement) !== -1
        if (
          (a &&
            Math.floor(data.offsets.reference[placement]) >
              Math.floor(popperOffsets[placementOpposite])) ||
          (!a &&
            Math.floor(data.offsets.reference[placement]) <
              Math.floor(popperOffsets[placementOpposite]))
        ) {
          data.flipped = true
          data.placement = flipOrder[index + 1]
          if (variation) {
            data.placement += '-' + variation
          }
          data.offsets.popper = this._getOffsets(
            this._popper,
            this._reference,
            data.placement
          ).popper
          data = this.runModifiers(data, this._options.modifiers, this._flip)
        }
      }.bind(this)
    )
    return data
  }
  Popper.prototype.modifiers.offset = function (data) {
    var offset = this._options.offset
    var popper = data.offsets.popper
    if (data.placement.indexOf('left') !== -1) {
      popper.top -= offset
    } else if (data.placement.indexOf('right') !== -1) {
      popper.top += offset
    } else if (data.placement.indexOf('top') !== -1) {
      popper.left -= offset
    } else if (data.placement.indexOf('bottom') !== -1) {
      popper.left += offset
    }
    return data
  }
  Popper.prototype.modifiers.arrow = function (data) {
    var arrow = this._options.arrowElement
    if (VueUtil.isString(arrow)) {
      arrow = this._popper.querySelector(arrow)
    }
    if (
      !arrow ||
      !this._popper.contains(arrow) ||
      !this.isModifierRequired(
        this.modifiers.arrow,
        this.modifiers.keepTogether
      )
    ) {
      return data
    }
    var arrowStyle = {}
    var placement = data.placement.split('-')[0]
    var popper = getPopperClientRect(data.offsets.popper)
    var reference = data.offsets.reference
    var isVertical = ['left', 'right'].indexOf(placement) !== -1
    var len = isVertical ? 'height' : 'width'
    var side = isVertical ? 'top' : 'left'
    var altSide = isVertical ? 'left' : 'top'
    var opSide = isVertical ? 'bottom' : 'right'
    var arrowSize = getOuterSizes(arrow)[len]
    if (reference[opSide] - arrowSize < popper[side]) {
      data.offsets.popper[side] -=
        popper[side] - (reference[opSide] - arrowSize)
    }
    if (reference[side] + arrowSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide]
    }
    var center = reference[side] + reference[len] / 2 - arrowSize / 2
    var sideValue = center - popper[side]
    sideValue = Math.max(Math.min(popper[len] - arrowSize - 3, sideValue), 0)
    arrowStyle[side] = sideValue
    arrowStyle[altSide] = ''
    data.offsets.arrow = arrowStyle
    data.arrowElement = arrow
    return data
  }
  var IPopper = {
    props: {
      placement: {
        type: String,
        default: 'bottom'
      },
      reference: {},
      popper: {},
      offset: {
        default: 0
      },
      value: Boolean,
      visibleArrow: Boolean,
      autoWidth: Boolean,
      transition: String,
      append: {},
      popperOptions: {
        type: Object,
        default: function () {
          return {
            boundariesPadding: 5,
            gpuAcceleration: false
          }
        }
      },
      appendToDirectParent: Boolean //append to referenceElm's direct parentNode
    },
    data: function () {
      return {
        showPopper: false
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function (val) {
          this.showPopper = val
        }
      },
      showPopper: function (val) {
        if (val) this.$nextTick(this.updatePopper)
        this.$emit('input', val)
      }
    },
    methods: {
      stop: function (e) {
        e.stopPropagation()
      },
      findeAbsoluteParent: function (element) {
        if (element === document.body) return
        var elementPosition = VueUtil.getStyle(element, 'position')
        if (elementPosition === 'absolute' && element.parentNode)
          this.appendElement = element.parentNode
        this.findeAbsoluteParent(element.parentNode)
      },
      createPopper: function () {
        var self = this
        self.currentPlacement = self.currentPlacement || self.placement
        if (
          !/^(top|bottom|left|right)(-start|-end)?$/g.test(
            self.currentPlacement
          )
        )
          return
        var options = self.popperOptions || {}
        var popper = (self.popperElm =
          self.popperElm || self.popper || self.$refs.popper)
        var reference = (self.referenceElm =
          self.referenceElm || self.reference || self.$refs.reference)
        if (!reference && self.$slots.reference && self.$slots.reference[0])
          reference = self.referenceElm = self.$slots.reference[0].elm
        if (!popper || !reference) return
        if (self.visibleArrow) self.appendArrow(popper)
        if (VueUtil.isElement(self.append)) {
          self.appendElement = self.append
        } else if (self.appendToDirectParent) {
          self.appendElement = self.referenceElm.parentNode
        } else {
          self.appendElement = self.referenceElm.parentNode
          self.findeAbsoluteParent(self.referenceElm)
        }
        if (self.appendElement && self.appendElement.appendChild) {
          self.appendElement.appendChild(self.popperElm)
        }
        self.popperElm.style.visibility = 'hidden'
        if (self.popperJS && self.popperJS.destroy) self.popperJS.destroy()
        options.placement = self.currentPlacement
        options.offset = self.offset
        options.autoWidth = self.autoWidth
        self.popperJS = new Popper(reference, popper, options)
        self.popperJS.onCreate(function () {
          self.$emit('created', self)
          self.resetTransformOrigin()
          self.$nextTick(function () {
            self.updatePopper()
            self.popperElm.style.visibility = ''
          })
        })
        if (VueUtil.isFunction(options.onUpdate)) {
          self.popperJS.onUpdate(options.onUpdate)
        }
        self.popperJS._popper.style.zIndex = VueUtil.nextZIndex()
        !VueUtil.isIE && VueUtil.on(self.popperElm, 'click', self.stop)
        self.popperJS._popper.editor = self
      },
      updatePopper: function () {
        this.popperJS ? this.popperJS.update() : this.createPopper()
      },
      destroyPopper: function () {
        if (this.showPopper || !this.popperJS) return
        this.popperJS.destroy()
        this.popperJS = null
      },
      resetTransformOrigin: function () {
        var placementMap = {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left'
        }
        var placement = this.popperJS._popper
          .getAttribute('x-placement')
          .split('-')[0]
        var origin = placementMap[placement]
        this.popperJS._popper.style.transformOrigin =
          ['top', 'bottom'].indexOf(placement) !== -1
            ? 'center ' + origin
            : origin + ' center'
      },
      appendArrow: function (element) {
        if (this.appended) return
        this.appended = true
        var arrow = document.createElement('div')
        arrow.setAttribute('x-arrow', '')
        arrow.className = 'popper__arrow'
        element.appendChild(arrow)
      }
    },
    beforeDestroy: function () {
      !VueUtil.isIE && VueUtil.off(this.popperElm, 'click', this.stop)
      this.destroyPopper()
    }
  }

  var formatedLabelCache = []
  var getValueByPath = function (object, prop) {
    prop = prop || ''
    var paths = prop.split('.')
    var current = object
    var result = null
    VueUtil.loop(paths, function (path, i) {
      if (!current) return false
      if (i === paths.length - 1) {
        result = current[path]
        return false
      }
      current = current[path]
    })
    return result
  }

  var VueSelect = {
    template:
      '<div :class="[\'vue-select el-select\', {\'filter-vue-select\': isMobile && visible && filterable}]" v-clickoutside="handleClose" v-scrolling="handleClose"> \
      <div :class="[\'vue-select__tags\', {\'no-reset-height\': !autoHeight}]" v-if="multiple" @click.stop="toggleMenu" \
        ref="tags" :style="{\'max-width\': \'calc(100% - 32px)\'}"> \
        <template v-if="!autoHeight && selected.length > 0">\
          <i-tag :closable="!disabled" hit :type="disabled ? \'\' : \'info\'" v-for="s in selected.slice(0, maxDisplayTags)" :key="getValueKey(s)" class="vue-select__tags_item"\
            @close="deleteTag($event, s)"><span class="vue-select__tags-text">{{getFormatedLabel(s)}}</span></i-tag>\
            <i-tooltip ref="tooltip" v-if="showTooltip && selected.length > maxDisplayTags" :placement="tooltipPlacement" :effect="tooltipEffect" :enterable="true">\
              <div slot="content" class="vue-select-tooltip-content" ><i-tag v-for="(item, index) in selected.slice(maxDisplayTags)" :key="getValueKey(item)" :closable="!disabled" hit :type="disabled ? \'\' : \'info\'" \
              @close="deleteTag($event, item)"><span class="vue-select__tags-text">{{getFormatedLabel(item)}}</span></i-tag></div>\
              <i-tag :closable="false" hit :type="disabled ? \'\' : \'info\'" class="vue-select__tags_more"> \
              <span class="vue-select__tags-text">+ {{ selected.length - maxDisplayTags }}</span></i-tag>\
            </i-tooltip>\
            \
            <i-tag v-if="!showTooltip && selected.length > maxDisplayTags" :closable="false" hit :type="disabled ? \'\' : \'info\'" class="vue-select__tags_more"> \
              <span class="vue-select__tags-text">+ {{ selected.length - maxDisplayTags }}</span></i-tag>\
        </template>\
        <transition-group v-if="autoHeight" @after-leave="resetInputHeight"> \
          <i-tag v-for="(item, index) in selected" :key="getValueKey(item)" :closable="!disabled" hit :type="disabled ? \'\' : \'info\'" \
            @close="deleteTag($event, item)"><span class="vue-select__tags-text">{{getFormatedLabel(item)}}</span></i-tag> \
        </transition-group>\
        <input type="text" :class="[\'vue-select__input\', {\'is-mini\': size===\'mini\'}]" @focus="visible == true" \
          :disabled="disabled" @keyup="managePlaceholder" @keydown="resetInputState" @keydown.down.prevent="navigateOptions(\'next\')" \
          @keydown.up.prevent="navigateOptions(\'prev\')" @keydown.enter.prevent="selectOption" @keydown.esc.prevent="visible = false" \
          @keydown.delete="deletePrevTag" v-model="query" v-if="filterable" :readonly="isMobile || !filterable || multiple" :style="{width: multipleInputLength + \'px\', \'max-width\': inputWidth - 42 + \'px\'}" \
          ref="input" />\
      </div>\
      <vue-input ref="reference" v-model="selectedLabel" type="text" :text-align="textAlign" @focus="handleSelectFocus"\
        :placeholder="placeholderLang" :autofocus="autofocus" :tabindex="tabindex" :name="name" :size="size" \
        :disabled="disabled" :readonly="isMobile || !filterable || multiple" :validate-event="false" @click="handleIconClick" \
        @mousedown.native="handleMouseDown" @keyup.native="debouncedOnInputChange" @input="keepMenu" @keydown.native.down.prevent="navigateOptions(\'next\')" \
        @keydown.native.up.prevent="navigateOptions(\'prev\')" @keydown.native.enter.prevent="selectOption" \
        @keydown.native.esc.prevent="visible = false" @keydown.native.tab="visible = false" @paste.native="debouncedOnInputChange" \
        @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false" :icon="iconClass"></vue-input> \
      <transition @after-leave="destroyPopper" @after-enter="handleMenuEnter"> \
        <i-select-dropdown ref="popper" v-show="visible && emptyText !== false"  :append="append" > \
        <div :class="{\'vue-select-dropdown_main\':isMobile}">\
          <div @touchmove.prevent v-if="isMobile && visible && emptyText !== false" class="vue-aside__wrapper" @click="handleClose"></div> \
            <div :class="{\'vue-aside vue-aside-bottom\':isMobile && visible && emptyText !== false}">\
              <div class="tag_view" v-if="isMobile && visible && emptyText !== false && filterable && multiple && selected.length>0" @click.stop="toggleMenu">\
                <transition-group   @after-leave="resetInputHeight" > \
                  <i-tag v-for="(item, index) in selected" :key="getValueKey(item)" :closable="!disabled" hit :type="disabled ? \'\' : \'info\'" \
                  @close="deleteTag($event, item)"><span class="vue-select__tags-text">{{getFormatedLabel(item)}}</span></i-tag> \
                </transition-group>\
              </div>\
              <vue-input ref="filterInputRef" v-if="isMobile && visible && emptyText !== false && filterable" v-model="selectedLabel" type="text"\
              :placeholder="placeholderLang" @input="debouncedOnInputChange"\
              :icon="iconClass" @click="handleIconClick"></vue-input>\
              <div v-show="filterable && multiple && options.length > 0" style="width: 100%; padding: 5px;" class="vue-select-filter">\
                <vue-input v-model="filterInputText" :placeholder="$t(selectFilterText)" ref="filterInputRefOnvisible" \
                  icon="el-icon-search" @input="handleFilter" :on-icon-click="handleFilter">\
                </vue-input>\
                <slot name="searcharea"></slot>\
              </div>\
              <div :class="{\'vue-select-dropdown_list_main\':isMobile && visible && emptyText !== false}">\
                <ul :class="[\'vue-select-dropdown__list\', {\'is-empty\': !allowCreate && filteredOptionsCount === 0}]" \
                  v-show="options.length > 0 && !loading"> \
                  <i-select-option :value="query" created v-if="showNewOption"></i-select-option> \
                  <vue-recycle-scroller \
                  ref="scroller" \
                  class="recycle-scroller" \
                  :items="lazyData" \
                  :item-size="itemSize" \
                  :key-field="valueMember" \
                  v-slot="ref" \
                  v-if="lazyload"> \
                    <slot :item="ref.item"></slot> \
                  </vue-recycle-scroller> \
                  <slot v-else></slot> \
                </ul> \
                <p class="vue-select-dropdown__empty" v-if="emptyText && !allowCreate">{{emptyText}}</p> \
              </div>\
          </div>\
          </div>\
        </i-select-dropdown> \
      </transition> \
    </div>',
    mixins: [VueUtil.component.emitter],
    name: 'VueSelect',
    computed: {
      iconClass: function () {
        var criteria
        var resultCss
        if (this.multiple) {
          if (this.visible) {
            criteria = this.clearable && !this.disabled && this.inputHovering
            resultCss =
              criteria && !this.multipleLimit && !this.lazyload
                ? 'el-icon-check is-show-check'
                : this.remote && this.filterable
                ? ''
                : 'el-icon-arrow-up is-reverse'
            if (this.isMobile) {
              criteria = this.clearable && !this.disabled
              resultCss =
                criteria && !this.multipleLimit && !this.lazyload
                  ? this.filterAllSelectedStatus
                    ? 'el-icon-check is-show-check is-all-select'
                    : 'el-icon-check is-show-check'
                  : this.remote && this.filterable
                  ? ''
                  : 'el-icon-arrow-up is-reverse'
            }
            return resultCss
          } else {
            criteria =
              this.clearable &&
              !this.disabled &&
              this.inputHovering &&
              VueUtil.isDef(this.value) &&
              this.value.length > 0
            if (this.isMobile)
              criteria =
                this.clearable &&
                !this.disabled &&
                VueUtil.isDef(this.value) &&
                this.value.length > 0
            return criteria
              ? 'el-icon-close is-show-close'
              : this.remote && this.filterable
              ? ''
              : 'el-icon-arrow-down'
          }
        } else {
          criteria =
            this.clearable &&
            !this.disabled &&
            this.inputHovering &&
            VueUtil.isDef(this.value) &&
            this.value !== ''
          resultCss = criteria
            ? 'el-icon-close is-show-close'
            : this.remote && this.filterable
            ? ''
            : 'el-icon-arrow-down'
          if (this.isMobile) {
            criteria =
              this.clearable &&
              !this.disabled &&
              VueUtil.isDef(this.value) &&
              this.value !== '' &&
              !this.visible
            resultCss = criteria
              ? 'el-icon-close is-show-close'
              : (this.remote || this.filterable) && this.visible
              ? ''
              : 'el-icon-arrow-down'
          }
          return resultCss
        }
      },
      emptyText: function () {
        if (this.loading) {
          return this.loadingText || this.$t('vue.select.loading')
        } else if (this.lazyload) {
          if (this.remote && this.query === '' && this.options.length === 0) {
            if (
              this.isMobile &&
              this.filterable &&
              this.visible &&
              this.selectedLabel.length >= 0
            ) {
              return null
            }
            return false
          }
          if (
            this.filterable &&
            this.data.length > 0 &&
            this.lazyData.length === 0
          ) {
            return this.noMatchText || this.$t('vue.select.noMatch')
          }
          if (this.data.length === 0) {
            return this.noDataText || this.$t('vue.select.noData')
          }
        } else {
          if (this.remote && this.query === '' && this.options.length === 0) {
            if (
              this.isMobile &&
              this.filterable &&
              this.visible &&
              this.selectedLabel.length >= 0
            ) {
              return null
            }
            return false
          }
          if (
            this.filterable &&
            this.options.length > 0 &&
            this.filteredOptionsCount === 0
          ) {
            return this.noMatchText || this.$t('vue.select.noMatch')
          }
          if (this.options.length === 0) {
            return this.noDataText || this.$t('vue.select.noData')
          }
        }
        return null
      },
      showNewOption: function () {
        var self = this
        var hasExistingOption = VueUtil.filter(self.options, function (option) {
          return !option.created
        }).some(function (option) {
          return option.currentLabel === self.query
        })
        return (
          self.filterable &&
          self.allowCreate &&
          self.query !== '' &&
          !hasExistingOption
        )
      },
      placeholderLang: function () {
        if (this.multiple) {
          if (VueUtil.isArray(this.value) && this.value.length > 0) {
            return ''
          } else if (this.query) {
            return ''
          } else {
            if (!this.currentPlaceholder) {
              return this.$t(this.placehoderText)
            }
            return this.currentPlaceholder
          }
        }
        if (!this.placeholder) return this.$t(this.placehoderText)
        return this.placeholder
      }
    },
    beforeUpdate: function () {
      var self = this
      if (!this.$el || this.autoHeight || this.selected.length == 0) return
      var elWidth = this.$el.clientWidth
      var tags = this.$el.querySelector('.vue-select__tags')
      if (!tags) return

      var max = 9999
      var div = document.createElement('div')
      div.style.position = 'absolute'
      tags.appendChild(div)

      for (var i = 0; i < this.selected.length; i++) {
        var selectedTag = this.selected[i]
        div.innerHTML =
          div.innerHTML +
          '<div class="vue-select__tags_item vue-tag vue-tag--info is-hit"><span style="float: left;"><span class="vue-select__tags-text">' +
          self.getFormatedLabel(selectedTag) +
          '</span></span><i class="vue-tag__close el-icon-close"></i></div>'

        var noPlusBtnOff = this.filterable ? 45 : 35 //需要显示 +n tag时，剩余宽度大小
        var hasPlusBtnOff = this.filterable ? 90 : 80 //不需要显示 +n tag时，剩余宽度大小
        var offset = elWidth - div.clientWidth

        // 当当前所有的tag都能显示，不要出现+n按钮时，只需要剩余宽度大于 35 或45即可
        if (offset > noPlusBtnOff && i + 1 == this.selected.length) {
          max = i + 1
          break
        }

        //否则需要预留+n按钮位置
        if (offset < hasPlusBtnOff) {
          max = i
          break
        }
      }

      div.parentElement.removeChild(div)

      self.$nextTick(function () {
        self.maxDisplayTags = max
      })
    },
    directives: {
      Clickoutside: VueUtil.component.clickoutside(),
      Scrolling: VueUtil.component.scrolling
    },
    props: {
      name: String,
      value: { required: true },
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      filterable: {
        type: Boolean,
        default: true
      },
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: String,
      remote: Boolean,
      loadingText: {
        type: String,
        default: '加载中'
      },
      noMatchText: {
        type: String,
        default: '没有找到数据'
      },
      noDataText: {
        type: String,
        default: '没有数据'
      },
      selectFilterText: {
        type: String,
        default: '请输入筛选'
      },
      autofocus: Boolean,
      textAlign: String,
      tabindex: Number,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: {
        type: Boolean,
        default: false
      },
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: String,
      autoHeight: {
        type: Boolean,
        default: false
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      lazyload: {
        type: Boolean,
        default: false
      },
      itemSize: {
        type: Number,
        default: 24
      },
      displayMember: {
        type: String,
        default: 'label'
      },
      valueMember: {
        type: String,
        default: 'value'
      },
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      labelFormatter: Function,
      appendToSelf: Boolean,
      showTooltip: {
        type: Boolean,
        default: true
      },
      tooltipPlacement: {
        type: String,
        default: 'bottom'
      },
      tooltipEffect: {
        type: String,
        default: 'light'
      },
      placehoderText: {
        type: String,
        default: '请选择'
      }
    },
    data: function () {
      return {
        filterInputText: '',
        options: [],
        cachedOptions: [],
        createdLabel: null,
        createdSelected: false,
        selected: this.multiple ? [] : {},
        isSelect: true,
        multipleInputLength: 20,
        inputWidth: 0,
        cachedPlaceHolder: '',
        optionsCount: 0,
        filteredOptionsCount: 0,
        dropdownUl: null,
        visible: false,
        selectedLabel: '',
        hoverIndex: -1,
        query: '',
        bottomOverflowBeforeHidden: 0,
        topOverflowBeforeHidden: 0,
        optionsAllDisabled: false,
        inputHovering: false,
        currentPlaceholder: '',
        lazyData: [],
        append: null,
        isMobile:
          VueUtil.getSystemInfo().device == 'Mobile' &&
          VueUtil.getSystemInfo().isLoadMobileJs
            ? true
            : false,
        filterAllSelectedStatus: false,
        maxDisplayTags: 9999
      }
    },
    watch: {
      data: {
        immediate: true,
        handler: function (val) {
          formatedLabelCache = []
          this.lazyData = val
        }
      },
      multiple: function (val) {
        var self = this
        if (self.$refs.reference) {
          self.$refs.reference.setCurrentValue('')
        }
        if (val) {
          self.selected = []
          self.$nextTick(function () {
            self.$emit('input', [])
          })
        } else {
          self.selected = {}
          self.$nextTick(function () {
            self.$emit('input', '')
          })
        }
      },
      value: function (val, oldVal) {
        var self = this
        var valueItem

        if (this.multiple) {
          this.resetInputHeight()
          if (
            val != null &&
            (val.length > 0 || (this.$refs.input && this.query !== ''))
          ) {
            this.currentPlaceholder = ''
          } else {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
          var valueMap = {}
          valueItem = []
          if (val.length > 0) {
            if (this.lazyload) {
              for (var i = 0; i < this.data.length; i++) {
                var index = val.indexOf(this.data[i][self.valueMember])
                if (index > -1) {
                  valueMap[index] = this.data[i]
                }
              }
            } else {
              for (var j = 0; j < this.options.length; j++) {
                var optionsIndex = val.indexOf(this.options[j].value)
                if (optionsIndex > -1) {
                  valueMap[optionsIndex] = this.data[j]
                }
              }
            }
          }

          for (var j = 0; j < Object.keys(valueMap).length; j++) {
            valueItem.push(valueMap[j])
          }
        } else {
          if (this.lazyload) {
            valueItem = VueUtil.arrayFind(this.data, function (item) {
              return item[self.valueMember] === val
            })
          } else {
            var optionIndex = VueUtil.arrayFindIndex(
              this.options,
              function (option) {
                return option.value == val
              }
            )
            valueItem = this.data[optionIndex]
          }
        }
        this.setSelected()
        this.$emit('change', val, valueItem, oldVal)
        this.dispatch('ElFormItem', 'el.form.change', val)
      },
      query: function (val) {
        this.filterFunction(val)
      },
      selectedLabel: function (val) {},
      visible: function (val) {
        var self = this
        self.filterInputText = ''
        if (this.lazyload) {
          this.$refs.scroller.scrollToPosition(0)
        }
        if (!val) {
          self.$refs.reference.$refs.input.blur()
          self.handleIconHide()
          self.broadcast('ISelectDropdown', 'destroyPopper')
          if (self.$refs.input) {
            self.$refs.input.blur()
          }
          self.query = ''
          self.selectedLabel = ''
          self.filterInputText = ''
          self.resetHoverIndex()
          self.$nextTick(function () {
            if (
              self.$refs.input &&
              self.$refs.input.value === '' &&
              self.selected.length === 0
            ) {
              self.currentPlaceholder = self.cachedPlaceHolder
            }
          })
          if (!self.multiple) {
            self.getOverflows()
            if (self.selected) {
              if (
                self.filterable &&
                self.allowCreate &&
                self.createdSelected &&
                self.createdOption
              ) {
                self.selectedLabel = self.createdLabel
              } else {
                self.selectedLabel = self.getFormatedLabel(self.selected)
              }
              if (self.filterable) self.query = self.selectedLabel
            }
          }
        } else {
          self.handleIconShow()
          self.broadcast('ISelectDropdown', 'updatePopper')
          if (self.filterable) {
            if (self.multiple) {
              //              if(self.$refs.input && !self.isMobile)
              //                self.$refs.input.focus();
            } else {
              self.query = self.selectedLabel
            }
            if (!self.remote && !self.lazyload) {
              self.filteredOptionsCount = self.optionsCount
              self.broadcast('ISelectOption', 'queryChange', '')
              self.broadcast('ISelectOptionGroup', 'queryChange')
            }
            if (self.isMobile && self.remote) {
              setTimeout(function () {
                self.$refs.filterInputRef.focus()
                self.$refs.reference.focus()
              }, 50)
            }
          }
          setTimeout(function () {
            self.$refs.filterInputRefOnvisible.focus()
          }, 50)
        }
        self.$emit('visible-change', val)
      },
      options: function (val) {
        var self = this
        self.optionsAllDisabled =
          val.length ===
          VueUtil.filter(val, function (item) {
            return item.disabled === true
          }).length
        if (self.multiple) {
          self.resetInputHeight()
        }
        var inputs = self.$el.querySelectorAll('input')
        if ([].indexOf.call(inputs, document.activeElement) === -1) {
          self.setSelected()
        }
      },
      selected: function () {
        this.resetMultipeInput()
      },
      placeholder: function (val) {
        this.cachedPlaceHolder = val
        this.managePlaceholder()
      }
    },
    methods: {
      filterFunction: function (val) {
        var self = this
        self.$nextTick(function () {
          self.visible && self.broadcast('ISelectDropdown', 'updatePopper')
        })
        self.hoverIndex = -1
        //        if (self.multiple && self.filterable) {
        //          self.resetInputHeight();
        //        }
        if (this.lazyload) {
          val = val || ''
          var parsedQuery = String(val).replace(
            /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
            '\\$1'
          )
          var reg = new RegExp(parsedQuery, 'i')
          this.filteredOptionsCount = this.data.length
          var result = this.data.filter(function (option) {
            var currentLabel =
              option[self.displayMember] ||
              (VueUtil.isString(option[self.valueMember]) ||
              VueUtil.isNumber(option[self.valueMember])
                ? option[self.valueMember]
                : '')
            var formatedLabel = self.getFormatedLabel({
              currentLabel: currentLabel,
              value: option[self.valueMember]
            })

            var visible
            if (VueUtil.isFunction(self.filterMethod)) {
              visible = self.filterMethod(val, option, formatedLabel)
            } else {
              visible = reg.test(formatedLabel)
            }

            if (!visible) {
              self.filteredOptionsCount--
            }
            return visible
          })

          this.lazyData = result
          return
        } else if (self.remote && VueUtil.isFunction(self.remoteMethod)) {
          self.hoverIndex = -1
          self.remoteMethod(val)
          self.broadcast('ISelectOption', 'resetIndex')
        } else {
          self.filteredOptionsCount = self.optionsCount
          self.broadcast('ISelectOption', 'queryChange', val)
          self.broadcast('ISelectOptionGroup', 'queryChange')
        }
      },
      handleFilter: function () {
        if (this.filterable) {
          this.filterFunction(this.filterInputText)
        }
      },
      handleSelectFocus: function (ev) {
        if (this.filterable) {
          ev.target.select()
        }
      },
      focus: function () {
        this.$refs.reference && this.$nextTick(this.$refs.reference.focus)
      },
      handleIconHide: function () {
        var icon = this.$refs.reference.$refs.icon
        if (icon) {
          VueUtil.removeClass(icon, 'is-reverse')
        }
      },
      handleIconShow: function () {
        var icon = this.$refs.reference.$refs.icon
        if (icon && !VueUtil.hasClass(icon, 'el-icon-close')) {
          VueUtil.addClass(icon, 'is-reverse')
        }
      },
      handleMenuEnter: function () {
        if (!this.dropdownUl) {
          this.dropdownUl = this.$refs.popper.$el.querySelector(
            '.vue-select-dropdown__list'
          )
          this.getOverflows()
        }
      },
      getOverflows: function () {
        if (this.dropdownUl && this.selected && this.selected.$el) {
          var selectedRect = this.selected.$el.getBoundingClientRect()
          var popperRect = this.$refs.popper.$el.getBoundingClientRect()
          this.bottomOverflowBeforeHidden =
            selectedRect.bottom - popperRect.bottom
          this.topOverflowBeforeHidden = selectedRect.top - popperRect.top
        }
      },
      getOption: function (value) {
        var option
        var self = this

        if (this.lazyload) {
          option = VueUtil.filter(this.data, function (option) {
            return option[self.valueMember] === value
          })[0]
          if (option) {
            option = VueUtil.merge({}, option)
            option.value = option[this.valueMember]
            option.currentLabel =
              option[this.displayMember] ||
              (VueUtil.isString(option[this.valueMember]) ||
              VueUtil.isNumber(option[this.valueMember])
                ? option[this.valueMember]
                : '')
          }
        } else {
          option = VueUtil.filter(this.cachedOptions, function (option) {
            return option.value === value
          })[0]
        }
        if (option) return option
        var label =
          VueUtil.isString(value) || VueUtil.isNumber(value) ? value : ''
        var newOption = {
          value: value,
          currentLabel: label
        }
        return newOption
      },
      setSelected: function () {
        var self = this
        if (!self.multiple) {
          var option = self.getOption(self.value)
          if (option.created) {
            self.createdLabel = option.currentLabel
            self.createdSelected = true
          } else {
            self.createdSelected = false
          }
          //移动端过滤输入框内容回退为空时，不做已选中值对它的重新赋值
          if (
            !(
              this.isMobile &&
              this.visible &&
              (this.remote || this.allowCreate)
            )
          )
            self.selectedLabel = self.getFormatedLabel(option)

          self.selected = option
          if (self.filterable) self.query = self.selectedLabel
          return
        }
        var result = []
        VueUtil.loop(self.value, function (value) {
          result.push(self.getOption(value))
        })
        self.selected = result
        self.$nextTick(function () {
          self.resetInputHeight()
        })
      },
      handleIconClick: function (event) {
        var value = []
        if (this.iconClass.indexOf('el-icon-close') !== -1) {
          this.deleteSelected(event)
        } else if (
          this.isMobile &&
          this.iconClass.indexOf(
            'el-icon-check is-show-check is-all-select'
          ) !== -1
        ) {
          this.$emit('input', value)
          this.filterAllSelectedStatus = false
        } else if (
          this.iconClass.indexOf('el-icon-check is-show-check') !== -1
        ) {
          VueUtil.loop(this.options, function (option) {
            if (!option.disabled) {
              value.push(option.value)
            }
          })
          this.$emit('input', value)
          this.filterAllSelectedStatus = true
        } else {
          this.toggleMenu()
        }
      },
      handleMouseDown: function (event) {
        if (event.target.tagName !== 'INPUT') return
        if (this.visible) {
          this.handleClose()
          this.focus()
          event.preventDefault()
        } else {
          this.toggleMenu()
        }
      },
      destroyPopper: function () {
        if (this.$refs.popper) this.$refs.popper.destroyPopper()
      },
      handleClose: function () {
        this.visible = false
      },
      deletePrevTag: function (e) {
        if (e.target.value.length <= 0) {
          var value = VueUtil.mergeArray([], this.value)
          value.pop()
          this.$emit('input', value)
        }
      },
      managePlaceholder: function () {
        if (this.currentPlaceholder !== '' && this.$refs.input) {
          this.currentPlaceholder = this.$refs.input.value
            ? ''
            : this.cachedPlaceHolder
        }
      },
      resetInputState: function (e) {
        if (e.keyCode !== 8) {
          this.resetInputHeight()
        }
      },
      resetInputHeight: function () {
        var self = this
        if (!this.autoHeight) return
        self.$nextTick(function () {
          var sizeMap = { large: 42, small: 30, mini: 22 }
          var input = self.$refs.reference.$refs.input
          var icon = self.$refs.reference.$refs.icon
          input.style.height = ''
          if (icon) icon.style.lineHeight = ''

          var size = input.offsetHeight || 36
          if (icon) icon.style.lineHeight = size + 'px'
          var elementCount = parseInt(
            self.$refs.tags.children[0].offsetHeight / size,
            10
          )
          if (elementCount <= 0) {
            elementCount = 1
          }
          var newHeight = elementCount * size
          if (
            self.selected.length > 0 &&
            self.multipleInputLength == self.inputWidth - 45
          ) {
            newHeight += size
          }

          newHeight !== size ? (newHeight += 'px') : (newHeight = '')
          input.style.height = newHeight
          if (icon) icon.style.lineHeight = newHeight
          if (self.visible && self.emptyText !== false) {
            self.broadcast('ISelectDropdown', 'updatePopper')
          }
        })
      },
      resetHoverIndex: function () {
        var self = this
        self.$nextTick(function () {
          if (!self.multiple) {
            self.hoverIndex = self.options.indexOf(self.selected)
          } else {
            if (self.selected.length > 0) {
              self.hoverIndex = Math.min.apply(
                null,
                VueUtil.map(self.selected, function (item) {
                  return self.options.indexOf(item)
                })
              )
            } else {
              self.hoverIndex = -1
            }
          }
        })
      },
      handleOptionSelect: function (option) {
        if (this.multiple) {
          var value = VueUtil.mergeArray([], this.value)
          var optionIndex = value.indexOf(option.value)
          if (optionIndex !== -1) {
            value.splice(optionIndex, 1)
          } else if (
            this.multipleLimit <= 0 ||
            value.length < this.multipleLimit
          ) {
            value.push(option.value)
          }
          this.$emit('input', value)
          if (option.created) {
            this.query = ''
          }
          if (this.filterable) {
            this.query = ''
            this.$refs.input.focus()
          } else {
            this.focus()
          }
        } else {
          this.$emit('input', option.value)
          this.visible = false
          this.focus()
        }
      },
      handleOptionSelectAll: function (options) {
        if (this.multiple) {
          var self = this
          var value = VueUtil.mergeArray([], this.value)
          options.forEach(function (option) {
            var optionIndex = value.indexOf(option[self.valueMember])
            if (optionIndex !== -1) {
              value.splice(optionIndex, 1)
            } else if (
              self.multipleLimit <= 0 ||
              value.length < self.multipleLimit
            ) {
              value.push(option[self.valueMember])
            }
            if (option.created) {
              self.query = ''
            }
          })
          if (this.filterable) {
            this.query = ''
            this.$refs.input.focus()
          } else {
            this.focus()
          }
          this.$emit('input', value)
        }
      },
      toggleMenu: function () {
        if (this.filterable && this.query === '' && this.visible) {
          return
        }
        if (!this.disabled) {
          this.visible = !this.visible
        }
      },
      keepMenu: function () {
        if (!this.visible) {
          this.visible = true
        }
      },
      navigateOptions: function (direction) {
        if (!this.visible) {
          this.visible = true
          return
        }
        if (this.options.length === 0 || this.filteredOptionsCount === 0) return
        this.optionsAllDisabled =
          this.options.length ===
          VueUtil.filter(this.options, function (item) {
            return item.disabled === true
          }).length
        if (!this.optionsAllDisabled) {
          if (direction === 'next') {
            if (this.lazyload) {
              this.getHoverIndexLazy(direction)
            } else {
              this.hoverIndex++
              if (this.hoverIndex === this.options.length) {
                this.hoverIndex = 0
              }
            }
            this.resetScrollTop()
            if (
              this.options[this.hoverIndex].disabled === true ||
              this.options[this.hoverIndex].groupDisabled === true ||
              !this.options[this.hoverIndex].visible
            ) {
              this.navigateOptions('next')
            }
          }
          if (direction === 'prev') {
            if (this.lazyload) {
              this.getHoverIndexLazy(direction)
            } else {
              this.hoverIndex--
              if (this.hoverIndex < 0) {
                this.hoverIndex = this.options.length - 1
              }
            }
            this.resetScrollTop()
            if (
              this.options[this.hoverIndex].disabled === true ||
              this.options[this.hoverIndex].groupDisabled === true ||
              !this.options[this.hoverIndex].visible
            ) {
              this.navigateOptions('prev')
            }
          }
        }
      },
      getHoverIndexLazy: function (direction) {
        var self = this
        var currentLazyList = this.lazyData.slice(
          this.$refs.scroller.$_startIndex,
          this.$refs.scroller.$_endIndex
        )
        var hoverIndex = self.hoverIndex
        var hoverValue

        if (hoverIndex > -1) {
          var currentHoverValue = self.options[self.hoverIndex].value
          //当前数据中处于第几个
          hoverIndex = VueUtil.findIndex(currentLazyList, function (option) {
            return option[self.valueMember] == currentHoverValue
          })
        }

        if (direction == 'next') {
          hoverIndex++
          if (hoverIndex == currentLazyList.length) {
            hoverIndex = currentLazyList.length - 1
          }
        } else if (direction == 'prev') {
          hoverIndex--
          if (hoverIndex < 0) {
            hoverIndex = 0
          }
        }
        hoverValue = currentLazyList[hoverIndex][self.valueMember]

        this.hoverIndex = VueUtil.findIndex(
          self.$refs.scroller.pool,
          function (pool) {
            return (
              pool.position > -1 && pool.item[self.valueMember] == hoverValue
            )
          }
        )
      },
      resetScrollTop: function () {
        var scrollPanel = this.lazyload
          ? this.$refs.scroller.$el
          : this.dropdownUl

        var bottomOverflowDistance =
          this.options[this.hoverIndex].$el.getBoundingClientRect().bottom -
          this.$refs.popper.$el.getBoundingClientRect().bottom
        var topOverflowDistance =
          this.options[this.hoverIndex].$el.getBoundingClientRect().top -
          this.$refs.popper.$el.getBoundingClientRect().top
        if (bottomOverflowDistance > 0) {
          scrollPanel.scrollTop += bottomOverflowDistance
        }
        if (topOverflowDistance < 0) {
          scrollPanel.scrollTop += topOverflowDistance
        }
      },
      selectOption: function (event) {
        if (this.visible) {
          event.stopPropagation()
        } else {
          this.visible = true
          return
        }
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex])
        }
      },
      deleteSelected: function (event) {
        event && event.stopPropagation()
        if (this.multiple) {
          this.$emit('input', [])
        } else {
          this.$emit('input', '')
        }
        this.visible = false
      },
      deleteTag: function (event, tag) {
        var index = this.selected.indexOf(tag)
        if (index !== -1 && !this.disabled) {
          var value = VueUtil.mergeArray([], this.value)
          value.splice(index, 1)
          this.$emit('input', value)
          this.$emit('remove-tag', tag)
        }
        var self = this
        this.$nextTick(function () {
          self.$refs.tooltip && self.$refs.tooltip.updatePopper()
        })

        event.stopPropagation()
      },
      onInputChange: function () {
        if (this.filterable) {
          this.query = this.selectedLabel
        }
      },
      onOptionDestroy: function (option) {
        this.optionsCount--
        this.filteredOptionsCount--
        var index = this.options.indexOf(option)
        if (index !== -1) {
          this.options.splice(index, 1)
        }

        var cachedIndex = this.cachedOptions.indexOf(option)
        if (cachedIndex !== -1) {
          this.cachedOptions.splice(cachedIndex, 1)
        }

        var self = this
        VueUtil.throttle(100, function () {
          self.broadcast('ISelectOption', 'resetIndex')
        }).apply(self)
      },
      resetInputWidth: function () {
        var self = this
        self.inputWidth = self.$refs.reference.$el.getBoundingClientRect().width
        this.$nextTick(function () {
          setTimeout(function () {
            if (VueUtil.get(self, '$refs.reference.$el')) {
              self.inputWidth =
                self.$refs.reference.$el.getBoundingClientRect().width
              self.resetMultipeInput()
            }
          }, 500)
        })
      },
      handleResize: function () {
        this.resetInputWidth()
        if (this.multiple) this.resetInputHeight()
      },
      debouncedOnInputChange: VueUtil.debounce(function () {
        this.onInputChange()
      }),
      getValueKey: function (item) {
        if (
          Object.prototype.toString.call(item.value).toLowerCase() !==
          '[object object]'
        ) {
          return item.value
        } else {
          return getValueByPath(item.value, this.valueKey)
        }
      },
      getFormatedLabel: function (option) {
        if (!VueUtil.isFunction(this.labelFormatter)) {
          return option.currentLabel
        }

        var keySpliter = '|'
        var key = option.currentLabel + keySpliter + option.value
        var label = formatedLabelCache[key]
        if (label === undefined) {
          formatedLabelCache[key] = this.labelFormatter(
            option.currentLabel,
            option.value
          )
        }
        return formatedLabelCache[key]
      },

      resetMultipeInput: function () {
        var self = this
        if (this.multiple && this.filterable) {
          self.multipleInputLength = 1
          self.$nextTick(function () {
            setTimeout(function () {
              var totalLength = self.inputWidth
              var inputReactTop = self.$refs.input
                ? self.$refs.input.getBoundingClientRect().top
                : 0
              var totalTag = self.$refs.tags
                ? self.$refs.tags.querySelectorAll('.vue-tag')
                : null
              var sameLineTagCount = 0
              for (var i = 0; i < self.selected.length; i++) {
                if (totalTag[i]) {
                  var tagReact = totalTag[i].getBoundingClientRect()
                  if (Math.abs(inputReactTop - tagReact.top) < 10) {
                    sameLineTagCount++
                    totalLength -= tagReact.width + 6 //6px是tag的margin-left
                  }
                }
              }
              self.multipleInputLength = totalLength - 45

              if (sameLineTagCount === 0) {
                self.resetInputHeight()
              }
            }, 100)
          })
        }
      }
    },
    created: function () {
      this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
      if (this.multiple && !VueUtil.isArray(this.value)) this.$emit('input', [])
      if (!this.multiple && VueUtil.isArray(this.value)) this.$emit('input', '')
      this.setSelected()
      this.$on('handleOptionClick', this.handleOptionSelect)
      this.$on('onOptionDestroy', this.onOptionDestroy)
      this.$on('setSelected', this.setSelected)
    },
    mounted: function () {
      this.appendToSelf && (this.append = this.$el)
      VueUtil.addResizeListener(this.$el, this.handleResize)
      if (this.remote && this.multiple) {
        this.resetInputHeight()
      }
      this.$nextTick(function () {
        this.setSelected()
        if (this.$refs.reference && this.$refs.reference.$el) {
          this.inputWidth =
            this.$refs.reference.$el.getBoundingClientRect().width
        }
      })
    },
    beforeDestroy: function () {
      VueUtil.removeResizeListener(this.$el, this.handleResize)
    }
  }
  Vue.component(VueSelect.name, VueSelect)
  ;(function (context, definition) {
    'use strict'
    if (typeof define === 'function' && define.amd) {
      define(['Vue', 'VueUtil', 'Cleave'], definition)
    } else {
      context.VueInput = definition(
        context.Vue,
        context.VueUtil,
        context.Cleave
      )
      delete context.VueInput
      delete context.Cleave
    }
  })(this, function (Vue, VueUtil, Cleave) {
    'use strict'

    var hiddenTextarea
    var HIDDEN_STYLE =
      '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n'
    var CONTEXT_STYLE = [
      'letter-spacing',
      'line-height',
      'padding-top',
      'padding-bottom',
      'font-family',
      'font-weight',
      'font-size',
      'text-rendering',
      'text-transform',
      'width',
      'text-indent',
      'padding-left',
      'padding-right',
      'border-width',
      'box-sizing'
    ]

    function calculateNodeStyling(targetElement) {
      var style = window.getComputedStyle(targetElement)
      var boxSizing = style.getPropertyValue('box-sizing')
      var paddingSize =
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
      var borderSize =
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
      var contextStyle = CONTEXT_STYLE.map(function (name) {
        return ''.concat(name, ':').concat(style.getPropertyValue(name))
      }).join(';')
      return {
        contextStyle: contextStyle,
        paddingSize: paddingSize,
        borderSize: borderSize,
        boxSizing: boxSizing
      }
    }

    function calcTextareaHeight(targetElement) {
      var minRows =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1
      var maxRows =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null

      if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea')
        document.body.appendChild(hiddenTextarea)
      }

      var _calculateNodeStyling = calculateNodeStyling(targetElement),
        paddingSize = _calculateNodeStyling.paddingSize,
        borderSize = _calculateNodeStyling.borderSize,
        boxSizing = _calculateNodeStyling.boxSizing,
        contextStyle = _calculateNodeStyling.contextStyle

      hiddenTextarea.setAttribute(
        'style',
        ''.concat(contextStyle, ';').concat(HIDDEN_STYLE)
      )
      hiddenTextarea.value =
        targetElement.value || targetElement.placeholder || ''
      var height = hiddenTextarea.scrollHeight
      var result = {}

      if (boxSizing === 'border-box') {
        height = height + borderSize
      } else if (boxSizing === 'content-box') {
        height = height - paddingSize
      }

      hiddenTextarea.value = ''
      var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

      if (minRows !== null) {
        var minHeight = singleRowHeight * minRows

        if (boxSizing === 'border-box') {
          minHeight = minHeight + paddingSize + borderSize
        }

        height = Math.max(minHeight, height)
        result.minHeight = ''.concat(minHeight, 'px')
      }

      if (maxRows !== null) {
        var maxHeight = singleRowHeight * maxRows

        if (boxSizing === 'border-box') {
          maxHeight = maxHeight + paddingSize + borderSize
        }

        height = Math.min(maxHeight, height)
      }

      result.height = ''.concat(height, 'px')
      hiddenTextarea.parentNode &&
        hiddenTextarea.parentNode.removeChild(hiddenTextarea)
      hiddenTextarea = null
      return result
    }

    var VueInput = {
      template:
        "<div :class=\"[type === 'textarea' ? 'vue-textarea' : 'vue-input', size ? 'vue-input--' + size : '', {'is-disabled': disabled, " +
        "     'vue-input-group': $slots.prepend || $slots.append, 'vue-input-group--append': $slots.append, 'vue-input-group--prepend': $slots.prepend," +
        "     'is-readonly': readonly, 'vue-input--prefix': $slots.prefix || prefixIcon" +
        "     }, size&& ($slots.prefix || prefixIcon) ? 'vue-input--prefix--' + size : '']\" >" +
        '    <template v-if="type !== \'textarea\'">' +
        '        <div class="vue-input-group__prepend" v-if="$slots.prepend">' +
        '            <slot name="prepend"></slot>' +
        '        </div>' +
        '        <slot name="icon">' +
        '            <i :class="[\'vue-input__icon el-icon-close is-clickable clearable-input\', size ? \'el-icon--\' + size : \'\']" v-if="showRemoveIcon" @click="clearValue" :style="zIndex"></i>' +
        "            <i :class=\"['vue-input__icon', icon, size ? 'el-icon--' + size : '', onIconClick ? 'is-clickable' : '']\" v-if=\"icon && !showRemoveIcon\" @click=\"handleIconClick\" ref=\"icon\"></i>" +
        '        </slot>' +
        "        <input :style=\"inputStyle\" v-if=\"type !== 'textarea'\" class=\"vue-input__inner\" :pattern=\"isMobile && keyBoardType=='onlynumber' ? '[0-9]*' : null\" :type=\"isMobile && keyBoardType ? keyBoardType=='onlynumber'?'number':keyBoardType : type=='number' ? 'input' : type\" :name=\"name\" " +
        '               :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength" ' +
        '               :minlength="minlength" :autocomplete="autoComplete" :autofocus="autofocus" :tabindex="tabindex" ' +
        '               :min="min" :max="max" :form="form" :value="currentValue" ref="input" @input="handleInput" ' +
        '               @focus="handleFocus" @blur="handleBlur" @mouseenter="handleMouseEnter" @change="handleChange" @compositionstart="handleComposition" ' +
        '               @compositionupdate="handleComposition" @compositionend="handleComposition" @keyup.enter="keyupEnter">' +
        '        <span class="vue-input__prefix" v-if="$slots.prefix || prefixIcon"> ' +
        '          <slot name="prefix"></slot> ' +
        '          <i class="vue-input__icon" ' +
        '             v-if="prefixIcon" ' +
        "             :class=\"[prefixIcon,size ? 'el-icon--' + size : '']\"> " +
        '          </i> ' +
        '        </span> ' +
        '        <i class="vue-input__icon el-icon-loading" v-if="validating"></i>' +
        '        <div class="vue-input-group__append" v-if="$slots.append">' +
        '            <slot name="append"></slot>' +
        '        </div>' +
        '    </template>' +
        '    <textarea v-else class="vue-textarea__inner" :value="currentValue" @input="handleInput" ref="textarea" ' +
        '             :name="name" :placeholder="placeholder" :disabled="disabled" :style="textareaStyle" :readonly="readonly" ' +
        '             :rows="rows" :form="form" :autofocus="autofocus" :tabindex="tabindex" :maxlength="maxlength" :minlength="minlength" ' +
        '             @focus="handleFocus" @blur="handleBlur" @mouseenter="handleMouseEnter" @change="handleChange" @compositionstart="handleComposition" @compositionupdate="handleComposition" ' +
        '             @compositionend="handleComposition" @keyup.enter="keyupEnter"></textarea>' +
        '</div>',
      name: 'VueInput',
      mixins: [VueUtil.component.emitter],
      data: function () {
        return {
          currentValue: this.value,
          textareaCalcStyle: {},
          isMobile:
            VueUtil.getSystemInfo().device == 'Mobile' &&
            VueUtil.getSystemInfo().isLoadMobileJs
              ? true
              : false,
          showRemoveIcon: false
        }
      },
      props: {
        type: {
          type: String,
          default: 'text'
        },
        value: [String, Number],
        maxlength: Number,
        minlength: Number,
        placeholder: String,
        disabled: Boolean,
        size: String,
        prefixIcon: String,
        icon: String,
        rows: {
          type: Number,
          default: 2
        },
        cleave: {
          type: Object,
          default: function () {
            return null
          }
        },
        autosize: {
          type: [Boolean, Object],
          default: false
        },
        autoComplete: {
          type: String,
          default: 'off'
        },
        name: String,
        readonly: Boolean,
        max: {},
        min: {},
        resize: String,
        autofocus: Boolean,
        textAlign: String,
        form: String,
        onIconClick: Function,
        tabindex: Number, //tabindex 的最大值不应超过 32767。如果没有指定，它的默认值为 0。
        noime: Boolean,
        validateEvent: {
          type: Boolean,
          default: true
        },
        keyBoardType: String,
        clearable: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        textareaStyle: function () {
          return VueUtil.merge({}, this.textareaCalcStyle, {
            resize: this.resize
          })
        },
        validating: function () {
          return this.$parent.validateState === 'validating'
        },
        inputStyle: function () {
          var style = {}
          if (['center', 'right'].indexOf(this.textAlign) !== -1) {
            style.textAlign = this.textAlign
          }
          return style
        }
      },
      watch: {
        value: function (val) {
          this.setCurrentValue(val, true)
        }
      },
      methods: {
        zIndex: function () {
          return "{'z-index': " + VueUtil.nextZIndex() + '}'
        },
        keyupEnter: function () {
          this.$emit('keyupEnter')
        },
        focus: function () {
          if (this.type !== 'textarea') {
            this.$refs.input.focus()
          } else {
            this.$refs.textarea.focus()
          }
        },
        handleChange: function (event) {
          this.$emit('change', event.target.value)
        },
        handleBlur: function (event) {
          this.showRemoveIcon = false
          this.$emit('blur', event)
          if (this.validateEvent) {
            this.dispatch('VueFormItem', 'vue.form.blur', [this.currentValue])
          }
        },
        inputSelect: function () {
          this.$refs.input.select()
        },
        resizeTextarea: function () {
          var autosize = this.autosize,
            type = this.type
          if (type !== 'textarea') return

          if (!autosize) {
            this.textareaCalcStyle = {
              minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
            }
            return
          }

          var minRows = autosize.minRows
          var maxRows = autosize.maxRows
          this.textareaCalcStyle = calcTextareaHeight(
            this.$refs.textarea,
            minRows,
            maxRows
          )
        },
        handleMouseEnter: function (event) {
          if (this.clearable && this.currentValue != '') {
            this.showRemoveIcon = true
          }
        },
        handleMouseLeave: function (event) {
          this.showRemoveIcon = false
        },
        handleFocus: function (event) {
          if (this.clearable && this.currentValue != '') {
            this.showRemoveIcon = true
          }
          this.$emit('focus', event)
        },
        handleComposition: function (event) {
          if (event.type === 'compositionend') {
            this.handleInput(event)
          }
        },
        handleInput: function (event) {
          if (this.noime) {
            if (!event.isComposing) {
              this.setCurrentValue(event.target.value)
            } else {
              this.setCurrentValue(this.currentValue, true)
            }
          } else {
            this.setCurrentValue(event.target.value)
          }
        },
        handleIconClick: function (event) {
          if (this.onIconClick) {
            this.onIconClick(event)
          }
          this.$emit('click', event)
        },
        setCurrentValue: function (value, watchFlg) {
          if (!VueUtil.isDef(value)) value = ''
          var self = this
          if (value === self.currentValue && !watchFlg) return
          self.$nextTick(function () {
            self.resizeTextarea()
          })
          if (self.type !== 'textarea' && self.cleave !== null) {
            var endPos = self.$refs.input.selectionEnd

            if (
              watchFlg &&
              self.cleave.numeral &&
              self.cleave.numeralDecimalMark &&
              self.cleave.numeralDecimalMark != '.'
            ) {
              if (typeof value === 'number') value = value + ''
              value = value.replace('.', self.cleave.numeralDecimalMark)
            }
            self.$refs.input.value = value
            var cleaveObj = new Cleave(self.$refs.input, self.cleave)
            self.currentValue = cleaveObj.getFormattedValue()
            if (
              cleaveObj.getFormattedValue().length >= value.length &&
              !watchFlg
            ) {
              self.currentValue = value
            }
            value = cleaveObj.getRawValue()
            cleaveObj.destroy && cleaveObj.destroy()

            var pos = Cleave.Util.getNextCursorPosition(
              endPos,
              self.currentValue,
              cleaveObj.properties.result,
              cleaveObj.properties.delimiter,
              cleaveObj.properties.delimiters
            )
            if (document.activeElement == self.$refs.input) {
              self.$refs.input.setSelectionRange(pos, pos)
            }
          } else {
            self.currentValue = value
          }
          if (self.type == 'number' && VueUtil.isNumberStr(value)) {
            value = parseFloat(value)
          }
          if (!watchFlg) {
            self.$emit('input', value)
          }
          if (self.validateEvent) {
            self.dispatch('VueFormItem', 'vue.form.change', [value])
          }
        },
        clearValue: function () {
          this.setCurrentValue('')
          this.showRemoveIcon = false
        }
      },
      created: function () {
        this.$on('inputSelect', this.inputSelect)
      },
      mounted: function () {
        this.setCurrentValue(this.currentValue, true)
        this.resizeTextarea()
      }
    }
    Vue.component(VueInput.name, VueInput)
  })
  var ITag = {
    template:
      "<div :class=\"['vue-tag', type ? 'vue-tag--' + type : '', {'is-hit': hit}]\" :style=\"{width: closable ? width+32+'px' : width+13+'px'}\"><span :style=\"{width: width+'px', float: 'left'}\" ref=\"span\"><slot></slot></span><i class=\"vue-tag__close el-icon-close\" v-if=\"closable\" @click=\"handleClose\"></i></div>",
    name: 'ITag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      width: Number
    },
    methods: {
      handleClose: function (event) {
        this.$emit('close', event)
      }
    },
    mounted: function () {
      var el = this.$el
      var spanNode = this.$refs.span
      if (this.width && this.width < spanNode.scrollWidth) {
        el.setAttribute('title', el.innerText)
      }
    }
  }
  Vue.component(ITag.name, ITag)

  var ISelectOption = {
    template:
      '<li @mouseenter="hoverItem" @click.stop="selectOptionClick" v-show="visible" :class="[\'vue-select-dropdown__item\', {\'selected\': itemSelected, \'is-disabled\': disabled || groupDisabled || limitReached, \'hover\': itemHover}]"><slot><span>{{parent.getFormatedLabel(self)}}</span></slot></li>',
    name: 'ISelectOption',
    mixins: [VueUtil.component.emitter],
    props: {
      value: {
        required: true
      },
      label: [String, Number],
      selected: Boolean,
      created: Boolean,
      disabled: Boolean
    },
    data: function () {
      return {
        self: this,
        index: -1,
        groupDisabled: false,
        visible: true,
        hitState: false
      }
    },
    computed: {
      currentLabel: function () {
        return (
          this.label ||
          (VueUtil.isString(this.value) || VueUtil.isNumber(this.value)
            ? this.value
            : '')
        )
      },
      currentValue: function () {
        return this.value || this.label || ''
      },
      parent: function () {
        var result = this.$parent
        while (!result.isSelect) {
          result = result.$parent
        }
        return result
      },
      itemSelected: function () {
        if (!this.parent.multiple) {
          return this.value === this.parent.value
        } else {
          if (this.parent.value == null) {
            return false
          }
          return this.parent.value.indexOf(this.value) !== -1
        }
      },
      itemHover: function () {
        return this.parent.hoverIndex === this.parent.options.indexOf(this)
      },
      limitReached: function () {
        if (this.parent.multiple) {
          return (
            !this.itemSelected &&
            this.parent.value.length >= this.parent.multipleLimit &&
            this.parent.multipleLimit > 0
          )
        } else {
          return false
        }
      }
    },
    watch: {
      currentLabel: function () {
        if (!this.created && !this.parent.remote && !this.parent.lazyload)
          this.dispatch('VueSelect', 'setSelected')
      },
      value: function () {
        if (!this.created && !this.parent.remote && !this.parent.lazyload)
          this.dispatch('VueSelect', 'setSelected')
      }
    },
    methods: {
      handleGroupDisabled: function (val) {
        this.groupDisabled = val
      },
      hoverItem: function () {
        if (!this.disabled && !this.groupDisabled) {
          this.parent.hoverIndex = this.parent.options.indexOf(this)
        }
      },
      selectOptionClick: function () {
        if (this.disabled !== true && this.groupDisabled !== true) {
          this.dispatch('VueSelect', 'handleOptionClick', this)
        }
      },
      queryChange: function (query) {
        if (
          !this.parent.lazyload &&
          VueUtil.isFunction(this.parent.filterMethod)
        ) {
          var item = this.parent.data[this.index] || {
            label: this.label,
            value: this.value
          }
          this.visible = this.parent.filterMethod(
            query,
            item,
            this.parent.getFormatedLabel(this)
          )
        } else {
          var parsedQuery = String(query).replace(
            /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
            '\\$1'
          )
          this.visible =
            new RegExp(parsedQuery, 'i').test(
              this.parent.getFormatedLabel(this)
            ) || this.created
        }
        if (!this.visible) {
          this.parent.filteredOptionsCount--
        }
      },
      resetIndex: function () {
        var self = this
        self.$nextTick(function () {
          self.index = self.parent.options.indexOf(self)
        })
      }
    },
    created: function () {
      this.parent.options.push(this)
      this.parent.cachedOptions.push(this)
      this.parent.optionsCount++
      this.parent.filteredOptionsCount++
      this.index = this.parent.options.indexOf(this)
      this.$on('queryChange', this.queryChange)
      this.$on('handleGroupDisabled', this.handleGroupDisabled)
      this.$on('resetIndex', this.resetIndex)
    },
    beforeDestroy: function () {
      this.dispatch('VueSelect', 'onOptionDestroy', this)
    }
  }
  Vue.component(ISelectOption.name, ISelectOption)

  var ISelectDropdown = {
    template:
      "<div :class=\"['vue-select-dropdown', {'is-multiple': $parent.multiple}, popperClass]\"><slot></slot></div>",
    name: 'ISelectDropdown',
    mixins: [IPopper],
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      autoWidth: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      popperClass: function () {
        return this.$parent.popperClass
      }
    },
    mounted: function () {
      this.referenceElm = this.$parent.$refs.reference.$el
      this.$parent.popperElm = this.popperElm = this.$el
      this.$on('updatePopper', this.updatePopper)
      this.$on('destroyPopper', this.destroyPopper)
    }
  }
  Vue.component(ISelectDropdown.name, ISelectDropdown)

  /**
     *  属性	                 概述	                            参数
        multiple	            是否多选	                        Boolean
        disabled	            是否禁用	                        Boolean
        size	                输入框尺寸	                        String
        clearable	            是否可以清空选项, 多选时可全选        Boolean
        multiple-limit	        多选时用户最多可以选择的项目数, 为0则不限制	Number
        name	                原生属性	                        String
        placeholder	            占位文本	                        String
        filterable	            是否可搜索	                        Boolean
        allow-create	        是否允许用户创建新条目, 需配合filterable使用	Boolean
        filter-method	        自定义搜索方法	                    Function
        remote	                是否为远程搜索	                    Boolean
        remote-method	        远程搜索方法	                    Function
        loading	                是否正在从远程获取数据	             Boolean
        loading-text	        远程加载时显示的文字	             String
        no-match-text	        搜索条件无匹配时显示的文字	          String
        no-data-text	        选项为空时显示的文字	             String
        popper-class	        Select下拉框的类名	                String
        default-first-option	在输入框按下回车, 选择第一个匹配项.需配合filterable或remote使用	Boolean
        autofocus	            控制是否能被用户缩放, 只对 type="textarea" 有效	Boolean
        text-align	            原生属性, 所属的一个或多个表单的id	  String
        auto-height	            输入框自适应高度	                 Boolean

        事件	        概述	                参数	
        change	        选中值发生变化时触发	 目前的选中值	
        visible-change	下拉框出现/隐藏时触发	 出现为 true, 隐藏为 false	
        remove-tag	    多选模式下移除tag时触发	 移除的tag值	

     */
  var CustomSelect = {
    name: 'CustomSelect',
    template:
      '\
        <vue-select v-model="selectedData" ref="vueSelect" @change="handleSelectChange"\
            :display-member="displayMember" :value-member="valueMember" :value-key="valueKey" :auto-height="autoHeight"\
            :size="size" :disabled="disabled" :clearable="clearable" :filterable="filterable" :allowCreate="allowCreate"\
            :loading="loading" :popper-class="popperClass" :remote="remote" :loading-text="loadingText" :no-match-text="noMatchText"\
            :no-data-text="noDataText" :select-filter-text="selectFilterText" :autofocus="autofocus" :text-align="textAlign"\
            :tabindex="tabindex" :remote-method="remoteMethod" :filter-method="filterMethod" :multiple="multiple"\
            :multiple-limit="multipleLimit" :placeholder="placeholder" :auto-height="autoHeight" :lazyload="lazyload"\
            :item-size="itemSize" :label-formatter="labelFormatter" :append-to-self="appendToSelf" :show-tooltip="showTooltip"\
            :tooltip-placement="tooltipPlacement" :tooltip-effect="tooltipEffect" :placehoder-text="placehoderText" :data="data"\
            @visible-change="handleVisibleChange" @remove-tag="handleRemoveTag">\
            <template  v-if="multiple">\
              <template slot="searcharea">\
                  <div style="margin: 5px 0;display: flex;flex-flow: row nowrap;">\
                      <span style="width: 50%;"><div class="vue-button" style="width: 100%;" @click.prevent.stop="selectAll">全选</div></span>\
                      <span style="width: 50%;"><div class="vue-button" style="width: 100%;" @click.prevent.stop="unselectAll">全不选</div></span>\
                  </div>\
              </template>\
              <template v-if="selectedOptions.length > 0">\
                  <i-select-option v-for="(item, index) in selectedOptions" :key="item[valueKey]" :label="item[displayMember]" :value="item[valueMember]">\
                    <slot name="selected" :data="item"></slot>\
                    <span v-if="!$scopedSlots.selected" :title="item[displayMember]">{{item[displayMember]}}</span>\
                  </i-select-option>\
                  <slot></slot>\
              </template>\
              <div class="vue-divider">\
                  <legend class="vue-divider__content"></legend>\
              </div>\
              <i-select-option v-for="(item, index) in originOptions" :key="item[valueKey]" :label="item[displayMember]" :value="item[valueMember]">\
                <slot name="unselected" :data="item"></slot>\
                <span v-if="!$scopedSlots.unselected" :title="item[displayMember]">{{item[displayMember]}}</span>\
              </i-select-option>\
            </template>\
            <i-select-option v-else v-for="(item, index) in originOptions" :key="item[valueKey]" :label="item[displayMember]" :value="item[valueMember]">\
              <slot name="unselected" :data="item"></slot>\
              <span v-if="!$scopedSlots.unselected" :title="item[displayMember]">{{item[displayMember]}}</span>\
            </i-select-option>\
        </vue-select>\
        ',
    props: {
      value: { required: true },
      userOptions: {
        type: Array,
        default: function () {
          return []
        }
      },
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      filterable: {
        type: Boolean,
        default: true
      },
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: String,
      remote: Boolean,
      loadingText: {
        type: String,
        default: '加载中'
      },
      noMatchText: {
        type: String,
        default: '没有找到数据'
      },
      noDataText: {
        type: String,
        default: '没有数据'
      },
      selectFilterText: {
        type: String,
        default: '请输入筛选'
      },
      autofocus: Boolean,
      textAlign: String,
      tabindex: Number,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: {
        type: Boolean,
        default: false
      },
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: String,
      autoHeight: {
        type: Boolean,
        default: false
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      lazyload: {
        type: Boolean,
        default: false
      },
      itemSize: {
        type: Number,
        default: 36
      },
      displayMember: {
        type: String,
        default: 'label'
      },
      valueMember: {
        type: String,
        default: 'value'
      },
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      labelFormatter: Function,
      appendToSelf: Boolean,
      showTooltip: {
        type: Boolean,
        default: true
      },
      tooltipPlacement: {
        type: String,
        default: 'bottom'
      },
      tooltipEffect: {
        type: String,
        default: 'light'
      },
      placehoderText: {
        type: String,
        default: '请选择'
      }
    },
    data: function () {
      return {
        selectedData: '',
        selectedOptions: [],
        originOptions: []
      }
    },
    watch: {
      value: {
        handler: function (val, oldVal) {
          this.selectedData = val
        },
        deep: true
      },
      userOptions: {
        handler: function (val) {
          this.originOptions = val
        },
        deep: true
      },
      selectedData: {
        handler: function (val) {
          this.$emit('input', val)
        },
        deep: true
      }
    },
    created: function () {
      VueUtil.merge(this.originOptions, this.userOptions)
    },
    methods: {
      handleVisibleChange: function (val) {
        this.$emit('visible-change', val)
      },
      handleRemoveTag: function (val) {
        this.$emit('remove-tag', val)
      },
      selectAll: function () {
        var self = this
        self.$refs.vueSelect.handleOptionSelectAll(self.originOptions)
        self.selectedData = []
        self.originOptions.forEach(function (option) {
          self.selectedOptions.push(option)
          self.selectedData.push(option[self.valueMember])
        })
        self.originOptions.splice(0, self.originOptions.length)
        // this.$emit('change', this.selectedOptions)
        this.$emit('input', this.selectedData)
      },
      unselectAll: function () {
        var self = this
        self.$refs.vueSelect.handleOptionSelectAll(self.selectedOptions)
        self.selectedOptions.forEach(function (option) {
          self.originOptions.push(option)
        })
        self.selectedOptions.splice(0, self.selectedOptions.length)
        self.selectedData = []
        // this.$emit('change', this.selectedData)
        this.$emit('input', this.selectedData)
      },
      handleSelectChange: function (val) {
        if (!this.multiple) {
          this.$emit('change', val)
          return
        }
        var self = this
        for (var i = self.originOptions.length - 1; i >= 0; i--) {
          if (val.indexOf(self.originOptions[i][self.valueMember]) >= 0) {
            self.selectedOptions.push(self.originOptions[i])
            self.originOptions.splice(i, 1)
          }
        }

        for (var i = self.selectedOptions.length - 1; i >= 0; i--) {
          if (val.indexOf(self.selectedOptions[i][self.valueMember]) < 0) {
            self.originOptions.unshift(self.selectedOptions[i])
            self.selectedOptions.splice(i, 1)
          }
        }
        var changedValues = []
        this.selectedOptions.forEach((item) => {
          changedValues.push(item[this.valueMember])
        })
        this.$emit('change', changedValues)
        // this.$emit('input', changedValues)
      }
    }
  }
  Vue.component(CustomSelect.name, CustomSelect)

  var ITooltip = {
    name: 'ITooltip',
    mixins: [IPopper],
    props: {
      disabled: Boolean,
      effect: String,
      popperClass: String,
      content: String,
      visibleArrow: {
        default: true
      },
      options: {
        default: function () {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
          }
        }
      },
      enterable: Boolean
    },
    beforeCreate: function () {
      var self = this

      var opt = {
        data: { node: '' },
        render: function (createElement) {
          return this.node
        }
      }

      if (Vue.i18n) opt.i18n = Vue.i18n
      self.popperVM = new Vue(opt).$mount()
    },
    beforeDestroy: function () {
      this.$refs.popper &&
        this.$refs.popper.parentElement &&
        this.$refs.popper.parentElement.removeChild(this.$refs.popper)
      this.popperVM.$destroy()
    },
    render: function (createElement) {
      var self = this
      var effect = self.effect === 'light' ? 'light' : 'dark'
      if (self.popperVM) {
        self.popperVM.node = createElement(
          'transition',
          {
            attrs: {
              name: 'tooltip-fade'
            },
            on: {
              afterLeave: self.destroyPopper
            }
          },
          [
            createElement(
              'div',
              {
                on: {
                  mouseleave: function () {
                    self.setExpectedState(false)
                    self.debounceClose()
                  },
                  mouseenter: function () {
                    self.setExpectedState(true)
                  }
                },
                ref: 'popper',
                directives: [
                  {
                    name: 'show',
                    value: !self.disabled && self.showPopper
                  }
                ],
                class: ['vue-tooltip__popper', 'is-' + effect, self.popperClass]
              },
              [self.$slots.content || self.content]
            )
          ]
        )
      }
      if (!self.$slots.default || !self.$slots.default.length)
        return self.$slots.default
      var getFirstComponentChild = function (children) {
        return VueUtil.filter(children, function (c) {
          return c && c.tag
        })[0]
      }
      var vnode = getFirstComponentChild(self.$slots.default)
      if (!vnode) return vnode
      var data = (vnode.data = vnode.data || {})
      var on = (vnode.data.on = vnode.data.on || {})

      if (!data.bindToolTipEvent) {
        data.bindToolTipEvent = 'binded'

        on.mouseover = self.addEventHandle(on.mouseover, function (e) {
          if (e.currentTarget === e.target) {
            self.setExpectedState(true)
            self.handleShowPopper()
          }

          var b = e.currentTarget.getBoundingClientRect()
          var clientX = Math.floor(e.clientX)
          var clientY = Math.floor(e.clientY)

          var offset = 2
          var top = Math.floor(b.top) - offset
          var bottom = Math.floor(b.bottom) + offset
          var left = Math.floor(b.left) - offset
          var right = Math.floor(b.right) + offset

          if (
            top <= clientY &&
            bottom >= clientY &&
            left <= clientX &&
            right >= clientX
          ) {
            self.setExpectedState(true)
            self.handleShowPopper()
          }
        })
        on.mouseleave = self.addEventHandle(on.mouseleave, function (e) {
          self.setExpectedState(false)
          self.debounceClose()
        })
      }

      data.staticClass = self.concatClass(data.staticClass, 'vue-tooltip')
      return vnode
    },
    mounted: function () {
      this.referenceElm = this.$el
    },
    methods: {
      debounceClose: VueUtil.debounce(70, function () {
        this.handleClosePopper()
      }),
      addEventHandle: function (old, fn) {
        return old
          ? VueUtil.isArray(old)
            ? VueUtil.mergeArray(old, fn)
            : [old, fn]
          : fn
      },
      concatClass: function (a, b) {
        if (a && a.indexOf(b) !== -1) return a
        return a ? (b ? a + ' ' + b : a) : b || ''
      },
      handleShowPopper: function () {
        var self = this
        if (!self.expectedState) return
        self.showPopper = true
      },
      handleClosePopper: function () {
        if (this.enterable && this.expectedState) return
        this.showPopper = false
      },
      setExpectedState: function (expectedState) {
        this.expectedState = expectedState
      }
    }
  }
  Vue.component(ITooltip.name, ITooltip)
})
