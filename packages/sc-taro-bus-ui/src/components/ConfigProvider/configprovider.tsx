import React, { FunctionComponent, createContext, useContext, ReactNode } from 'react'



import isequal from 'lodash.isequal'
import useMemo from '@/hooks/useMemo'

export interface ConfigProviderProps {

  baseApiUrl: string
  theme?: Record<string, string>,
  version:string
}


export const defaultConfigRef: {
  current: ConfigProviderProps
} = {
  current: {
    baseApiUrl: '',
    version:"1,0"
  },
}

export const setDefaultConfig = (config: ConfigProviderProps) => {
  defaultConfigRef.current = config
}

export const getDefaultConfig = () => {
  return defaultConfigRef.current
}

// 创建一个 Context 对象
const ConfigContext = createContext<ConfigProviderProps | null>(null)

export const useConfig = () => {
  return useContext(ConfigContext) ?? getDefaultConfig()
}

// function convertThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
//   const cssVars: Record<string, string | number> = {}
//   Object.keys(themeVars).forEach((key) => {
//     cssVars[`--${kebabCase(key)}`] = themeVars[key]
//   })
//   return cssVars
// }

export const ConfigProvider: FunctionComponent<
  Partial<ConfigProviderProps> & { children?: ReactNode }
> = (props) => {
  const { children, ...config } = props

  const mergedConfig = useMemo(
    () => {
      return {
        ...getDefaultConfig(),
        ...config,
      }
    },
    [config],
    (prev, next: any) =>
      prev.some((prevTheme: any, index: string | number) => {
        const nextTheme = next[index]

        return !isequal(prevTheme, nextTheme)
      })
  ) as ConfigProviderProps

  // const cssVarStyle = React.useMemo(() => {
  //   return convertThemeVarsToCSSVars(mergedConfig.theme || {})
  // }, [mergedConfig.theme])

  return (
    <ConfigContext.Provider value={mergedConfig}>

      {children}

    </ConfigContext.Provider>
  )
}

ConfigProvider.displayName = 'NutConfigProvider'
