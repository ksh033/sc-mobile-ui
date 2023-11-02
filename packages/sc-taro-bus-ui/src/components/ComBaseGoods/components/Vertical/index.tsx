import React, { Fragment, PropsWithChildren, useMemo, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import ComStepper from '@/components/ComStepper'
import ScImage from '@/components/ScImage'
import classnames from 'classnames'
import { rootPrefixCls } from '../../index'
import { BizSceneMap, GoodsStyleClassEnum, heightScale } from '../../constants'
import { ComBaseGoodsProps } from '../../type'

import './index.scss'

const ComVerticalGoodsItem: React.FC<
  PropsWithChildren<Omit<ComBaseGoodsProps, 'layout'> & { prefixCls: string }>
> = props => {
  const {
    goodsStyle = 'NO_BORDER_WHITEBG',
    borderRadiusType = 'round',
    goodsTagNode,
    size = 'normal',
    displayScale = '1',
    nameLine = 2,
    descLine = 1,
    imageFillStyle = 'cover',
    textStyleType = 'normal',
    textAlignType = 'left',
    showGoodsName = true,
    showGoodsDesc = true,
    showDiscount = true,
    showGoodsPrice = true,
    showMarkPrice = true,
    showFullReduction = true,
    showLimit = true,
    showBizScene = true,
    showValidReason = false,
    showImageMark = false,
    showUnitPrice = false,
    validReasonLocation = 'center',
    buyBtn = true,
    buyBtnExpress = {
      btnType: 'fill',
      btnShape: 'circle'
    },
    showCornerMark = 'none',
    goods,
    prefixCls,
    priceLayout = 'horizontal',
    toDetail
  } = props

  const ref = useRef<React.MutableRefObject<React.LegacyRef<any>>>(null)

  const fontWeightStyles = useMemo(() => {
    return {
      fontWeight: textStyleType === 'normal' ? 400 : 600
    }
  }, [textStyleType])

  /** 名称高度 */
  const nameHeight = useMemo(() => {
    if (size === 'small') {
      return nameLine === 1 ? 14 : 26
    }
    return nameLine === 1 ? 16 : 32
  }, [size, nameLine])

  const descHeight = useMemo(() => {
    return descLine === 1 ? 12 : 24
  }, [descLine])

  return (
    <View
      ref={ref}
      onClick={toDetail}
      className={classnames({
        [`${rootPrefixCls}`]: true,
        [`${prefixCls}`]: true,
        [`${rootPrefixCls}-${GoodsStyleClassEnum[goodsStyle]}`]: true,
        [`${prefixCls}-circle`]: borderRadiusType === 'round',
        [`${prefixCls}-small`]: size === 'small'
      })}
    >
      <View
        className={`${prefixCls}__image`}
        style={{ paddingTop: heightScale(displayScale) + '%' }}
      >
        <View className={`${prefixCls}__image-container`}>
          {/** 商品图片  */}
          <ScImage
            src={goods?.goodsThumb || ''}
            fit={imageFillStyle}
            imageClass={`${prefixCls}__image-container`}
            radius={borderRadiusType === 'round' ? 10 : 0}
          />
        </View>

        {showCornerMark != 'none' &&
          goods?.bizScene &&
          goods?.leftCornerText != null &&
          goods?.leftCornerText !== '' && (
            <View className={`${rootPrefixCls}_subtitle`}>
              <Text className={`${rootPrefixCls}_subtitle__text`}>
                {goods?.leftCornerText}
              </Text>
            </View>
          )}
        {showValidReason && goods?.validIcon != null && (
          <View className={`${rootPrefixCls}-invalid`}>
            <Text className={`${rootPrefixCls}-invalid__text`}>
              {goods?.validIconReason}
            </Text>
          </View>
        )}
        {showImageMark && <View className={`${rootPrefixCls}-invalid`}></View>}
      </View>
      <View className={`${prefixCls}-content`}>
        {/** 商品标题 */}
        <View
          className={classnames(`${prefixCls}-content_name`)}
          style={{
            height: nameHeight
          }}
        >
          <Text
            className={classnames(`${prefixCls}-content_name__text`, [
              nameLine === 1
                ? `${rootPrefixCls}_ellipsis-one`
                : `${rootPrefixCls}_ellipsis-two`
            ])}
            style={fontWeightStyles}
          >
            {goodsTagNode || null}
            {/** 限时折扣标签*/}
            {showDiscount &&
              goods?.goodsPromotion &&
              goods?.goodsPromotion?.displayName && (
                <Text className={`${rootPrefixCls}_promot`}>
                  {goods?.goodsPromotion?.displayName}
                </Text>
              )}
            {/** 商品标题 */}
            {showGoodsName && (
              <Text style={{ verticalAlign: 'middle' }}>
                {goods?.goodsName || '暂无名称'}
              </Text>
            )}
          </Text>
        </View>

        {/** 商品描述 */}
        {showGoodsDesc && (
          <View
            className={classnames(`${prefixCls}-content_desc`, [
              descLine === 1
                ? `${rootPrefixCls}_ellipsis-one`
                : `${rootPrefixCls}_ellipsis-two`
            ])}
            style={{
              height: descHeight
            }}
          >
            <Text
              className={classnames(`${prefixCls}-content_desc__text`, [
                descLine === 1
                  ? `${rootPrefixCls}_ellipsis-one`
                  : `${rootPrefixCls}_ellipsis-two`
              ])}
            >
              {goods?.goodsDesc}
            </Text>
          </View>
        )}

        {/** 商品状态提示 || 满减标识 || 折扣 || 次日达标识  */}
        {(showFullReduction ||
          showLimit ||
          showBizScene ||
          showValidReason) && (
          <View className={classnames(`${prefixCls}-content_label`)}>
            {/** 满减 */}
            {!showValidReason &&
              showFullReduction &&
              goods?.goodsPromotion?.promotionType === 'PRICE_BREAK' &&
              goods?.goodsPromotion?.pagePromotionDesc != '' && (
                <View
                  className={classnames(
                    `${rootPrefixCls}-label`,
                    `${rootPrefixCls}-discount`
                  )}
                >
                  <View className={`${rootPrefixCls}-discount_left`}>
                    <Text className={`${rootPrefixCls}-discount_left__text`}>
                      减
                    </Text>
                  </View>
                  <View className={`${rootPrefixCls}-discount_right`}>
                    <Text className={`${rootPrefixCls}-discount_right__text`}>
                      {goods?.goodsPromotion?.pagePromotionDesc}
                    </Text>
                  </View>
                </View>
              )}

            {/** 折扣信息 */}
            {!showValidReason &&
              showLimit &&
              goods?.goodsPromotion?.promotionType === 'GOODS_DISCOUNT' &&
              goods?.goodsPromotion?.pagePromotionDesc != '' && (
                <View
                  className={classnames(
                    `${rootPrefixCls}-label`,
                    `${rootPrefixCls}-limit_label`
                  )}
                >
                  <Text className={`${rootPrefixCls}-limit_label__text`}>
                    {goods?.goodsPromotion?.pagePromotionDesc}
                  </Text>
                </View>
              )}

            {/** 次日达标识 */}
            {!showValidReason &&
              showBizScene &&
              goods?.bizScene &&
              BizSceneMap[goods?.bizScene] && (
                <View
                  className={classnames(
                    `${rootPrefixCls}-label`,
                    `${rootPrefixCls}-bizscenne`
                  )}
                >
                  <Text className={`${rootPrefixCls}-bizscenne__text`}>
                    {BizSceneMap[goods?.bizScene]}
                  </Text>
                </View>
              )}

            {/** 商品失效状态 */}
            {showValidReason &&
              goods?.validStatus != null &&
              validReasonLocation === 'center' && (
                <Text className={`${rootPrefixCls}-nouse`}>
                  {goods?.validReason}
                </Text>
              )}
          </View>
        )}

        {showUnitPrice && Number(goods?.quantity || 0) > 0 && (
          <Fragment>
            <View className={`${prefixCls}_unit-price`}>
              <Text className={`${prefixCls}_unit-price__text`}>单价: ￥</Text>
              <Text className={`${prefixCls}_unit-price__text`}>
                {goods?.goodsPromotion
                  ? goods?.goodsPromotion.discountPrice
                  : goods?.goodsPrice}
                /{goods?.saleUnit}
              </Text>
            </View>
            <View className={`${prefixCls}_unit-price`}>
              <Text className={`${prefixCls}_unit-price__text`}>
                数量: {goods?.quantity}
                {goods?.saleUnit}
              </Text>
            </View>
          </Fragment>
        )}

        <View className={`${prefixCls}_bar`}>
          <View
            className={classnames(`${prefixCls}_bar-left`, {
              [`${prefixCls}_bar-vertical`]: priceLayout === 'vertical'
            })}
          >
            {/** 价格  */}
            {showGoodsPrice && (
              <Text className={`${prefixCls}_price`} style={fontWeightStyles}>
                <Text className={`${prefixCls}_price__unit`}>¥</Text>
                {goods?.goodsPromotion
                  ? goods?.goodsPromotion.discountPrice
                  : goods?.goodsPrice}
              </Text>
            )}

            {/** 划线价格  */}
            {showMarkPrice && (
              <Text className={`${prefixCls}_mark-price`}>
                ¥{goods?.goodsPromotion ? goods?.goodsPrice : goods?.markPrice}
              </Text>
            )}
          </View>

          {showValidReason &&
          goods?.validStatus != null &&
          validReasonLocation === 'rightBottom' ? (
            <Text className={`${prefixCls}_bar-valid`}>
              {goods?.validReason}
            </Text>
          ) : (
            buyBtn && (
              <ComStepper
                {...buyBtnExpress}
                size={size}
                goods={goods}
              ></ComStepper>
            )
          )}
        </View>

        {/** 自定义内容 */}
        {props.children}
      </View>
    </View>
  )
}

export default React.memo(ComVerticalGoodsItem)
