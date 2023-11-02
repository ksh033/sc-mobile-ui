// import useStepper from '@/actions/useStepper';
import React from 'react'
import ScStepper from '../ScStepper'
import { ScStepperProps } from '../ScStepper/type'

export type ComStepperProps = ScStepperProps & {
  /** 商品数据 */
  goods?: any
}

/** 通用累加器事件 */
const ComStepper: React.FC<ComStepperProps> = props => {
  const { goods, ...resProps } = props

  console.log('ComStepper', props)
  // const defalutProps = useStepper({
  //   pageType: type,
  //   goods: goods,
  // });
  return <ScStepper {...resProps}></ScStepper>
}

export default React.memo(ComStepper)
