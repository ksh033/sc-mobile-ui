import { View, Text } from '@tarojs/components'
import React, { Fragment, PropsWithChildren, useMemo } from 'react'
import ComStepper from '@/components/ComStepper'
import ScImage from '@/components/ScImage'
import classnames from 'classnames'
import { Color } from '@/constants/Enum'
import ScIcon from '@/components/ScIcon'
import { ComBaseGoodsProps } from '../../type'
import { rootPrefixCls } from '../../index'
import { BizSceneMap, GoodsStyleClassEnum } from '../../constants'
import './index.scss'

const ComHorizontalGoodsItem: React.FC<
  PropsWithChildren<Omit<ComBaseGoodsProps, 'layout'> & { prefixCls: string }>
> = props => {
  const {
    goodsStyle = 'NO_BORDER_WHITEBG',
    borderRadiusType = 'round',
    goodsTagNode,
    size = 'normal',
    displayScale = '1',
    nameLine = 1,
    descLine = 1,
    imageFillStyle = 'cover',
    textStyleType = 'normal',
    showGoodsName = true,
    showGoodsDesc = true,
    showDiscount = true,
    showGoodsPrice = true,
    showMarkPrice = true,
    showFullReduction = true,
    showLimit = true,
    showBizScene = true,
    showValidReason = false,
    validReasonLocation = 'center',
    goodsPricePosition = 'center',
    buyBtn = true,
    showQuantity = false,
    showUnitPrice = false,
    showImageMark = false,
    buyBtnExpress = {
      btnType: 'default',
      btnShape: 'circle'
    },
    showCornerMark = 'none',
    goods,
    prefixCls,
    toDetail
  } = props

  const fontWeightStyles = useMemo(() => {
    return {
      fontWeight: textStyleType === 'normal' ? 400 : 600
    }
  }, [textStyleType])

  return (
    <View
      className={classnames(
        rootPrefixCls,
        prefixCls,
        `${rootPrefixCls}-${GoodsStyleClassEnum[goodsStyle]}`,
        {
          [`${prefixCls}-circle`]: borderRadiusType === 'round',
          [`${prefixCls}-small`]: size === 'small'
        }
      )}
      onClick={toDetail}
    >
      <View className={`${prefixCls}__image`}>
        {/** 商品图片  */}
        <ScImage
          src={goods?.goodsThumb || ''}
          fit={imageFillStyle}
          imageClass={`${prefixCls}__image`}
          radius={borderRadiusType === 'round' ? 12 : 0}
        />
        {showCornerMark != 'none' &&
          goods?.bizScene &&
          goods?.leftCornerText != null && (
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
          className={classnames(`${prefixCls}-content_name`, [
            nameLine === 1
              ? `${rootPrefixCls}_ellipsis-one`
              : `${rootPrefixCls}_ellipsis-two`
          ])}
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
        {showGoodsDesc &&
          goods?.goodsDesc != null &&
          goods?.goodsDesc !== '' && (
            <View
              className={classnames(`${prefixCls}-content_desc`, [
                descLine === 1
                  ? `${rootPrefixCls}_ellipsis-one`
                  : `${rootPrefixCls}_ellipsis-two`
              ])}
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

        {/** 单价 */}
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
        {/* 价格 划线价*/}
        <View className={`${prefixCls}_bar`}>
          <View className={`${prefixCls}_bar-left`}>
            {/** 价格  */}
            {showGoodsPrice && goodsPricePosition === 'center' && (
              <Text className={`${prefixCls}_price`} style={fontWeightStyles}>
                <Text className={`${prefixCls}_price__unit`}>¥</Text>
                {goods?.goodsPromotion
                  ? goods?.goodsPromotion.discountPrice
                  : goods?.goodsPrice}
              </Text>
            )}
            {/** 划线价格  */}
            {showMarkPrice && goodsPricePosition === 'center' && (
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

        {/** 活动警告 */}
        {goods?.cartPromotionWarning != null && (
          <View className={classnames(`${rootPrefixCls}-waring`)}>
            <ScIcon
              value='info-circle-outlined'
              size={22}
              color={Color.red}
            ></ScIcon>
            <Text className={classnames(`${rootPrefixCls}-waring__text`)}>
              {goods?.cartPromotionWarning}
            </Text>
          </View>
        )}
        {/** 自定义内容 */}
        {props.children}
      </View>
      <View className={`${prefixCls}-right`}>
        {showGoodsPrice && goodsPricePosition === 'right' && (
          <Text className={`${prefixCls}_price`} style={fontWeightStyles}>
            <Text className={`${prefixCls}_price__unit`}>¥</Text>
            {goods?.goodsPromotion
              ? goods?.goodsPromotion.discountPrice
              : goods?.goodsPrice}
          </Text>
        )}
        {showQuantity && (
          <Text className={`${prefixCls}-quantity`}>×{goods?.quantity}</Text>
        )}
      </View>
    </View>
  )
}

export default React.memo(ComHorizontalGoodsItem)
