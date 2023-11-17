import { BaseEventOrig, Editor, EditorProps } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { forwardRef, useImperativeHandle, useRef } from 'react'

type ScEditorProps = EditorProps

/** 富文本框 */
const ScEditor = forwardRef((props: ScEditorProps, ref) => {
  const {
    onStatusChange,
    onReady,
    onInput,
    onFocus,
    placeholder = '请输入',
    className,
    id = 'editor'
  } = props

  const editorCtxRef = useRef<{
    editorCtx?: TaroGeneral.IAnyObject
  }>({})

  useImperativeHandle(ref, () => {
    return editorCtxRef.current
  })

  // 编辑内容
  const onEditorReady = (event: BaseEventOrig<any>) => {
    Taro.createSelectorQuery()
      .select('#editor')
      .context(res => {
        console.log('res.context)', res.context)
        editorCtxRef.current.editorCtx = res.context
      })
      .exec()
    onReady?.(event)
  }

  return (
    <Editor
      id={id}
      className={className}
      placeholder={placeholder}
      onStatusChange={onStatusChange}
      onReady={onEditorReady}
      onInput={onInput}
      onFocus={onFocus}
    ></Editor>
  )
})

export default ScEditor
