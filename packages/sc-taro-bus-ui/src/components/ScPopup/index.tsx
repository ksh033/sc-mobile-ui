import React from 'react'
import { Popup } from '@sc-mobile/sc-taro-ui'
import type { PopupProps } from '@sc-mobile/sc-taro-ui'

const ScPopup: React.FC<Partial<PopupProps>> = props => {
  return (
    <Popup round={props.position === 'bottom'} {...props}>
      {props.children}
    </Popup>
  )
}
export default React.memo(ScPopup)
