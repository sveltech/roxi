/**
 * @typedef {'svelte'|'rollup'|'vite'} wrapperTypes
 */


/**
 * merge a base config with user and plugin wrappers
 * @param {wrapperTypes} configName
 * @param {Object.<String, *>} options
 * @param {import("./userConfigs").UserConfig} userConfig
 */
function mergeConfigs(configName, options, userConfig, ctx = {}) {
  const { roxi, wrappers } = userConfig
  let config = { ...options }
  const wrapper = wrappers[configName]

  // user wrapper
  if (wrapper)
    config = wrapper(config, ctx) || config

  // plugin wrappers
  roxi.plugins.forEach(({ fields, wrappers }) => {
    const wrapper = wrappers[configName]
    const pluginCtx = { ...ctx, options: fields || {} }
    if (wrapper)
      config = wrapper(config, pluginCtx) || config
  })

  return config
}


module.exports = {
  mergeConfigs
}