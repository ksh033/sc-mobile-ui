import classNames from 'classnames';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import { View } from '@tarojs/components';
import { ScTabsPaneProps } from './type';

export default class ScTabsPane extends React.Component<ScTabsPaneProps> {
  public static defaultProps: ScTabsPaneProps;
  public static propTypes: InferProps<ScTabsPaneProps>;

  public render(): JSX.Element {
    const { customStyle, className, tabDirection, index, current } = this.props;

    return (
      <View
        className={classNames(
          {
            'sc-tabs-pane': true,
            'sc-tabs-pane--vertical': tabDirection === 'vertical',
            'sc-tabs-pane--active': index === current,
            'sc-tabs-pane--inactive': index !== current,
          },
          className
        )}
        style={customStyle}
      >
        {this.props.children}
      </View>
    );
  }
}

ScTabsPane.defaultProps = {
  customStyle: '',
  className: '',
  tabDirection: 'horizontal',
  index: 0,
  current: 0,
};

ScTabsPane.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  tabDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  index: PropTypes.number,
  current: PropTypes.number,
};
