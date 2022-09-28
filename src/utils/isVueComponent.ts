function isVueComponent (target: any) {
  return target &&
    (
      typeof target.setup === 'function' ||
      typeof target.render === 'function' ||
      typeof target.template === 'string'
    )
}

export default isVueComponent
